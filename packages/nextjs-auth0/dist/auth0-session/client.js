"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const openid_client_1 = require("openid-client");
const url_1 = tslib_1.__importDefault(require("url"));
const url_join_1 = tslib_1.__importDefault(require("url-join"));
const debug_1 = tslib_1.__importDefault(require("./utils/debug"));
const debug = debug_1.default('client');
function sortSpaceDelimitedString(str) {
    return str.split(' ').sort().join(' ');
}
// Issuer.discover throws an `AggregateError` in some cases, this error includes the stack trace in the
// message which causes the stack to be exposed when reporting the error in production. Am using the non standard
// `_errors` property to identify the polyfilled `AggregateError`
// See https://github.com/sindresorhus/aggregate-error/issues/4#issuecomment-488356468
function normalizeAggregateError(e) {
    if ('_errors' in e) {
        return e._errors[0];
    }
    return e;
}
function get(config, { name, version }) {
    let client = null;
    return () => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (client) {
            return client;
        }
        const defaultHttpOptions = (options) => (Object.assign(Object.assign({}, options), { headers: Object.assign(Object.assign(Object.assign({}, options.headers), { 'User-Agent': `${name}/${version}` }), (config.enableTelemetry
                ? {
                    'Auth0-Client': Buffer.from(JSON.stringify({
                        name,
                        version,
                        env: {
                            node: process.version
                        }
                    })).toString('base64')
                }
                : undefined)), timeout: config.httpTimeout }));
        const applyHttpOptionsCustom = (entity) => {
            // eslint-disable-next-line no-param-reassign
            entity[openid_client_1.custom.http_options] = defaultHttpOptions;
        };
        applyHttpOptionsCustom(openid_client_1.Issuer);
        let issuer;
        try {
            issuer = yield openid_client_1.Issuer.discover(config.issuerBaseURL);
        }
        catch (e) {
            throw normalizeAggregateError(e);
        }
        applyHttpOptionsCustom(issuer);
        const issuerTokenAlgs = Array.isArray(issuer.id_token_signing_alg_values_supported)
            ? issuer.id_token_signing_alg_values_supported
            : [];
        if (!issuerTokenAlgs.includes(config.idTokenSigningAlg)) {
            debug('ID token algorithm %o is not supported by the issuer. Supported ID token algorithms are: %o.', config.idTokenSigningAlg, issuerTokenAlgs);
        }
        const configRespType = sortSpaceDelimitedString(config.authorizationParams.response_type);
        const issuerRespTypes = Array.isArray(issuer.response_types_supported) ? issuer.response_types_supported : [];
        issuerRespTypes.map(sortSpaceDelimitedString);
        if (!issuerRespTypes.includes(configRespType)) {
            debug('Response type %o is not supported by the issuer. Supported response types are: %o.', configRespType, issuerRespTypes);
        }
        const configRespMode = config.authorizationParams.response_mode;
        const issuerRespModes = Array.isArray(issuer.response_modes_supported) ? issuer.response_modes_supported : [];
        if (configRespMode && !issuerRespModes.includes(configRespMode)) {
            debug('Response mode %o is not supported by the issuer. Supported response modes are %o.', configRespMode, issuerRespModes);
        }
        client = new issuer.Client({
            client_id: config.clientID,
            client_secret: config.clientSecret,
            id_token_signed_response_alg: config.idTokenSigningAlg
        });
        applyHttpOptionsCustom(client);
        client[openid_client_1.custom.clock_tolerance] = config.clockTolerance;
        if (config.idpLogout && !issuer.end_session_endpoint) {
            if (config.auth0Logout || url_1.default.parse(issuer.metadata.issuer).hostname.match('\\.auth0\\.com$')) {
                Object.defineProperty(client, 'endSessionUrl', {
                    value(params) {
                        const parsedUrl = url_1.default.parse(url_join_1.default(issuer.metadata.issuer, '/v2/logout'));
                        parsedUrl.query = {
                            returnTo: params.post_logout_redirect_uri,
                            client_id: config.clientID
                        };
                        return url_1.default.format(parsedUrl);
                    }
                });
            }
            else {
                debug('the issuer does not support RP-Initiated Logout');
            }
        }
        return client;
    });
}
exports.default = get;
//# sourceMappingURL=client.js.map