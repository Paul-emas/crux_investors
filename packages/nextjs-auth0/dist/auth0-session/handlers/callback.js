"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const url_join_1 = tslib_1.__importDefault(require("url-join"));
const get_login_state_1 = require("../hooks/get-login-state");
function getRedirectUri(config) {
    return url_join_1.default(config.baseURL, config.routes.callback);
}
function callbackHandlerFactory(config, getClient, sessionCache, transientCookieHandler) {
    return (req, res, options) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a;
        const client = yield getClient();
        const redirectUri = (options === null || options === void 0 ? void 0 : options.redirectUri) || getRedirectUri(config);
        let expectedState;
        let tokenSet;
        try {
            const callbackParams = client.callbackParams(req);
            if ((_a = callbackParams.code) === null || _a === void 0 ? void 0 : _a.startsWith('token:')) {
                const token = callbackParams.code.split('token:')[1];
                let session = sessionCache.fromTokenSet({
                    access_token: token,
                    claims: () => ({}),
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
            tokenSet = yield client.callback(redirectUri, callbackParams, {
                max_age: max_age !== undefined ? +max_age : undefined,
                code_verifier,
                nonce,
                state: expectedState
            });
        }
        catch (err) {
            res.writeHead(302, {
                Location: `${config.baseURL}/error?e=${encodeURIComponent(err.message)}&source=login_callback`
            });
            res.end();
            console.error(err.message);
            return;
        }
        const openidState = get_login_state_1.decodeState(expectedState);
        let session = sessionCache.fromTokenSet(tokenSet);
        if (options === null || options === void 0 ? void 0 : options.afterCallback) {
            session = yield options.afterCallback(req, res, session, openidState);
        }
        sessionCache.create(req, res, session);
        res.writeHead(302, {
            Location: openidState.returnTo || config.baseURL
        });
        res.end();
    });
}
exports.default = callbackHandlerFactory;
//# sourceMappingURL=callback.js.map