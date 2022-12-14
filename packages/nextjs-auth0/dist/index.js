"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.SessionCache = exports.useUser = exports.UserContext = exports.UserProvider = exports.handleAuth = exports.handleProfile = exports.handleCallback = exports.handleLogout = exports.handleLogin = exports.withPageAuthRequired = exports.withApiAuthRequired = exports.getAccessToken = exports.getSession = exports.initAuth0 = void 0;
const tslib_1 = require("tslib");
const auth0_session_1 = require("./auth0-session");
const handlers_1 = require("./handlers");
const session_1 = require("./session/");
Object.defineProperty(exports, "SessionCache", { enumerable: true, get: function () { return session_1.SessionCache; } });
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.Session; } });
const helpers_1 = require("./helpers");
const version_1 = tslib_1.__importDefault(require("./version"));
const config_1 = require("./config");
let instance;
function getInstance() {
    if (instance) {
        return instance;
    }
    instance = exports.initAuth0();
    return instance;
}
const initAuth0 = (params) => {
    const { baseConfig, nextConfig } = config_1.getConfig(params);
    // Init base layer (with base config)
    const getClient = auth0_session_1.clientFactory(baseConfig, { name: 'nextjs-auth0', version: version_1.default });
    const transientStore = new auth0_session_1.TransientStore(baseConfig);
    const cookieStore = new auth0_session_1.CookieStore(baseConfig);
    const sessionCache = new session_1.SessionCache(baseConfig, cookieStore);
    const baseHandleLogin = auth0_session_1.loginHandler(baseConfig, getClient, transientStore);
    const baseHandleLogout = auth0_session_1.logoutHandler(baseConfig, getClient, sessionCache);
    const baseHandleCallback = auth0_session_1.callbackHandler(baseConfig, getClient, sessionCache, transientStore);
    // Init Next layer (with next config)
    const getSession = session_1.sessionFactory(sessionCache);
    const getAccessToken = session_1.accessTokenFactory(nextConfig, getClient, sessionCache);
    const withApiAuthRequired = helpers_1.withApiAuthRequiredFactory(sessionCache);
    const withPageAuthRequired = helpers_1.withPageAuthRequiredFactory(nextConfig.routes.login, getSession);
    const handleLogin = handlers_1.loginHandler(baseHandleLogin, nextConfig);
    const handleLogout = handlers_1.logoutHandler(baseHandleLogout);
    const handleCallback = handlers_1.callbackHandler(baseHandleCallback, nextConfig);
    const handleProfile = handlers_1.profileHandler(getClient, getAccessToken, sessionCache);
    const handleAuth = handlers_1.handlerFactory({ handleLogin, handleLogout, handleCallback, handleProfile });
    return {
        getSession,
        getAccessToken,
        withApiAuthRequired,
        withPageAuthRequired,
        handleLogin,
        handleLogout,
        handleCallback,
        handleProfile,
        handleAuth
    };
};
exports.initAuth0 = initAuth0;
const getSession = (...args) => getInstance().getSession(...args);
exports.getSession = getSession;
const getAccessToken = (...args) => getInstance().getAccessToken(...args);
exports.getAccessToken = getAccessToken;
const withApiAuthRequired = (...args) => getInstance().withApiAuthRequired(...args);
exports.withApiAuthRequired = withApiAuthRequired;
const withPageAuthRequired = (...args) => helpers_1.withPageAuthRequiredFactory(config_1.getLoginUrl(), exports.getSession)(...args);
exports.withPageAuthRequired = withPageAuthRequired;
const handleLogin = (...args) => getInstance().handleLogin(...args);
exports.handleLogin = handleLogin;
const handleLogout = (...args) => getInstance().handleLogout(...args);
exports.handleLogout = handleLogout;
const handleCallback = (...args) => getInstance().handleCallback(...args);
exports.handleCallback = handleCallback;
const handleProfile = (...args) => getInstance().handleProfile(...args);
exports.handleProfile = handleProfile;
const handleAuth = (...args) => getInstance().handleAuth(...args);
exports.handleAuth = handleAuth;
var frontend_1 = require("./frontend");
Object.defineProperty(exports, "UserProvider", { enumerable: true, get: function () { return frontend_1.UserProvider; } });
Object.defineProperty(exports, "UserContext", { enumerable: true, get: function () { return frontend_1.UserContext; } });
Object.defineProperty(exports, "useUser", { enumerable: true, get: function () { return frontend_1.useUser; } });
//# sourceMappingURL=index.js.map