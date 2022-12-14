"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.getLoginUrl = void 0;
const tslib_1 = require("tslib");
const auth0_session_1 = require("./auth0-session");
/**
 * @ignore
 */
const FALSEY = ['n', 'no', 'false', '0', 'off'];
/**
 * @ignore
 */
const bool = (param, defaultValue) => {
    if (param === undefined || param === '')
        return defaultValue;
    if (param && typeof param === 'string')
        return !FALSEY.includes(param.toLowerCase().trim());
    return !!param;
};
/**
 * @ignore
 */
const num = (param) => (param === undefined || param === '' ? undefined : +param);
/**
 * @ignore
 */
const getLoginUrl = () => {
    return process.env.NEXT_PUBLIC_AUTH0_LOGIN || '/api/auth/login';
};
exports.getLoginUrl = getLoginUrl;
/**
 * @ignore
 */
const getConfig = (params = {}) => {
    var _a, _b, _c, _d;
    const { AUTH0_SECRET, AUTH0_ISSUER_BASE_URL, AUTH0_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_CLOCK_TOLERANCE, AUTH0_HTTP_TIMEOUT, AUTH0_ENABLE_TELEMETRY, AUTH0_IDP_LOGOUT, AUTH0_ID_TOKEN_SIGNING_ALG, AUTH0_LEGACY_SAME_SITE_COOKIE, AUTH0_CALLBACK, AUTH0_POST_LOGOUT_REDIRECT, AUTH0_AUDIENCE, AUTH0_SCOPE, AUTH0_ORGANIZATION, AUTH0_SESSION_NAME, AUTH0_SESSION_ROLLING, AUTH0_SESSION_ROLLING_DURATION, AUTH0_SESSION_ABSOLUTE_DURATION, AUTH0_COOKIE_DOMAIN, AUTH0_COOKIE_PATH, AUTH0_COOKIE_TRANSIENT, AUTH0_COOKIE_HTTP_ONLY, AUTH0_COOKIE_SECURE, AUTH0_COOKIE_SAME_SITE } = process.env;
    const baseURL = AUTH0_BASE_URL && !/^https?:\/\//.test(AUTH0_BASE_URL) ? `https://${AUTH0_BASE_URL}` : AUTH0_BASE_URL;
    const { organization } = params, baseParams = tslib_1.__rest(params, ["organization"]);
    const baseConfig = auth0_session_1.getConfig(Object.assign(Object.assign({ secret: AUTH0_SECRET, issuerBaseURL: AUTH0_ISSUER_BASE_URL, baseURL: baseURL, clientID: AUTH0_CLIENT_ID, clientSecret: AUTH0_CLIENT_SECRET, clockTolerance: num(AUTH0_CLOCK_TOLERANCE), httpTimeout: num(AUTH0_HTTP_TIMEOUT), enableTelemetry: bool(AUTH0_ENABLE_TELEMETRY), idpLogout: bool(AUTH0_IDP_LOGOUT, true), auth0Logout: bool(AUTH0_IDP_LOGOUT, true), idTokenSigningAlg: AUTH0_ID_TOKEN_SIGNING_ALG, legacySameSiteCookie: bool(AUTH0_LEGACY_SAME_SITE_COOKIE) }, baseParams), { authorizationParams: Object.assign({ response_type: 'code', audience: AUTH0_AUDIENCE, scope: AUTH0_SCOPE }, baseParams.authorizationParams), session: Object.assign(Object.assign({ name: AUTH0_SESSION_NAME, rolling: bool(AUTH0_SESSION_ROLLING), rollingDuration: num(AUTH0_SESSION_ROLLING_DURATION), absoluteDuration: AUTH0_SESSION_ABSOLUTE_DURATION && isNaN(Number(AUTH0_SESSION_ABSOLUTE_DURATION))
                ? bool(AUTH0_SESSION_ABSOLUTE_DURATION)
                : num(AUTH0_SESSION_ABSOLUTE_DURATION) }, baseParams.session), { cookie: Object.assign({ domain: AUTH0_COOKIE_DOMAIN, path: AUTH0_COOKIE_PATH || '/', transient: bool(AUTH0_COOKIE_TRANSIENT), httpOnly: bool(AUTH0_COOKIE_HTTP_ONLY), secure: bool(AUTH0_COOKIE_SECURE), sameSite: AUTH0_COOKIE_SAME_SITE }, (_a = baseParams.session) === null || _a === void 0 ? void 0 : _a.cookie) }), routes: {
            callback: ((_b = baseParams.routes) === null || _b === void 0 ? void 0 : _b.callback) || AUTH0_CALLBACK || '/api/auth/callback',
            postLogoutRedirect: ((_c = baseParams.routes) === null || _c === void 0 ? void 0 : _c.postLogoutRedirect) || AUTH0_POST_LOGOUT_REDIRECT
        } }));
    const nextConfig = {
        routes: Object.assign(Object.assign({}, baseConfig.routes), { login: ((_d = baseParams.routes) === null || _d === void 0 ? void 0 : _d.login) || exports.getLoginUrl() }),
        identityClaimFilter: baseConfig.identityClaimFilter,
        organization: organization || AUTH0_ORGANIZATION
    };
    return { baseConfig, nextConfig };
};
exports.getConfig = getConfig;
//# sourceMappingURL=config.js.map