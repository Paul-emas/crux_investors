import { HandleLogin } from './login';
import { HandleLogout } from './logout';
import { HandleCallback } from './callback';
import { HandleProfile } from './profile';
import { NextApiHandler } from 'next';
/**
 * If you want to add some custom behavior to the default auth handlers, you can pass in custom handlers for
 * `login`, `logout`, `callback` and `profile` eg
 *
 * ```js
 * // pages/api/auth/[...auth0].js
 * import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
 * import { errorReporter, logger } from '../../../utils';
 *
 * export default handleAuth({
 *   async login(req, res) {
 *     try {
 *        // Pass in custom params to your handler
 *       await handleLogin(req, res, { authorizationParams: { customParam: 'foo' } });
 *       // Add your own custom logging.
 *       logger('Redirecting to login');
 *     } catch (error) {
 *       // Add you own custom error logging.
 *       errorReporter(error);
 *       res.status(error.status || 500).end(error.message);
 *     }
 *   }
 * });
 * ```
 *
 * @category Server
 */
export interface Handlers {
    login: HandleLogin;
    logout: HandleLogout;
    callback: HandleCallback;
    profile: HandleProfile;
}
/**
 * The main way to use the server SDK.
 *
 * Simply set the environment variables per {@link Config} then create the file `pages/api/auth/[...auth0].js`, eg
 *
 * ```js
 * // pages/api/auth/[...auth0].js
 * import { handleAuth } from '@auth0/nextjs-auth0';
 *
 * export default handleAuth();
 * ```
 *
 * This will create 4 handlers for the following urls:
 *
 * - `/api/auth/login`: log the user in to your app by redirecting them to your Identity Provider.
 * - `/api/auth/callback`: The page that your Identity Provider will redirect the user back to on login.
 * - `/api/auth/logout`: log the user out of your app.
 * - `/api/auth/me`: View the user profile JSON (used by the {@link UseUser} hook)
 *
 * @category Server
 */
export declare type HandleAuth = (userHandlers?: Partial<Handlers>) => NextApiHandler;
/**
 * @ignore
 */
export default function handlerFactory({ handleLogin, handleLogout, handleCallback, handleProfile }: {
    handleLogin: HandleLogin;
    handleLogout: HandleLogout;
    handleCallback: HandleCallback;
    handleProfile: HandleProfile;
}): HandleAuth;
//# sourceMappingURL=auth.d.ts.map