import { IncomingMessage, ServerResponse } from 'http';
import urlJoin from 'url-join';
import { Config } from '../config';
import { ClientFactory } from '../client';
import TransientStore from '../transient-store';
import { decodeState } from '../hooks/get-login-state';
import { SessionCache } from '../session-cache';

function getRedirectUri(config: Config): string {
  return urlJoin(config.baseURL, config.routes.callback);
}

export type AfterCallback = (req: any, res: any, session: any, state: Record<string, any>) => Promise<any> | any;

export type CallbackOptions = {
  afterCallback?: AfterCallback;

  redirectUri?: string;
};

export type HandleCallback = (req: IncomingMessage, res: ServerResponse, options?: CallbackOptions) => Promise<void>;

export default function callbackHandlerFactory(
  config: Config,
  getClient: ClientFactory,
  sessionCache: SessionCache,
  transientCookieHandler: TransientStore
): HandleCallback {
  return async (req, res, options) => {
    const client = await getClient();
    const redirectUri = options?.redirectUri || getRedirectUri(config);

    let expectedState;
    let tokenSet;
    try {
      const callbackParams = client.callbackParams(req);
      if (callbackParams.code?.startsWith('token:')) {
        const token = callbackParams.code.split('token:')[1];
        let session = sessionCache.fromTokenSet({
          access_token: token,
          claims: () => ({} as any),
          expires_at: Date.now() + 24 * 60 * 60 * 1000,
          scope: 'openid profile email',
          token_type: 'Bearer',
          expired: () => false
        });

        sessionCache.create(req, res, session);

        res.writeHead(302, {
          Location: config.baseURL
        });
        res.end();
        return;
      }
      expectedState = transientCookieHandler.read('state', req, res);
      const max_age = transientCookieHandler.read('max_age', req, res);
      const code_verifier = transientCookieHandler.read('code_verifier', req, res);
      const nonce = transientCookieHandler.read('nonce', req, res);

      tokenSet = await client.callback(redirectUri, callbackParams, {
        max_age: max_age !== undefined ? +max_age : undefined,
        code_verifier,
        nonce,
        state: expectedState
      });
    } catch (err) {
      res.writeHead(302, {
        Location: `${config.baseURL}/error?e=${encodeURIComponent(err.message)}&source=login_callback`
      });
      res.end();
      console.error(err.message);
      return;
    }

    const openidState: { returnTo?: string } = decodeState(expectedState as string);
    let session = sessionCache.fromTokenSet(tokenSet);

    if (options?.afterCallback) {
      session = await options.afterCallback(req as any, res as any, session, openidState);
    }

    sessionCache.create(req, res, session);

    res.writeHead(302, {
      Location: openidState.returnTo || config.baseURL
    });
    res.end();
  };
}
