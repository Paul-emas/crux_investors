import { NextApiResponse, NextApiRequest } from 'next';
import { AuthorizationParameters, HandleLogin as BaseHandleLogin } from '../auth0-session';
import { NextConfig } from '../config';
/**
 * Use this to store additional state for the user before they visit the Identity Provider to login.
 *
 * ```js
 * // pages/api/auth/[...auth0].js
 * import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
 *
 * const getLoginState = (req, loginOptions) => {
 *   return { basket_id: getBasketId(req) };
 * };
 *
 * export default handleAuth({
 *   async login(req, res) {
 *     try {
 *       await handleLogin(req, res, { getLoginState });
 *     } catch (error) {
 *       res.status(error.status || 500).end(error.message);
 *     }
 *   }
 * });
 * ```
 *
 * @category Server
 */
export declare type GetLoginState = (req: NextApiRequest, options: LoginOptions) => {
    [key: string]: any;
};
/**
 * Authorization params to pass to the login handler.
 *
 * @category Server
 */
export interface AuthorizationParams extends Partial<AuthorizationParameters> {
    /**
     * The invitation id to join an organization.
     *
     * To create a link for your user's to accept an organization invite, read the `invitation` and `organization`
     * query params and pass them to the authorization server to log the user in:
     *
     * ```js
     * // pages/api/invite.js
     * import { handleLogin } from '@auth0/nextjs-auth0';
     *
     * export default async function invite(req, res) {
     *   try {
     *     const { invitation, organization } = req.query;
     *     if (!invitation) {
     *       res.status(400).end('Missing "invitation" parameter');
     *     }
     *     await handleLogin(req, res, {
     *       authorizationParams: {
     *         invitation,
     *         organization
     *       }
     *     });
     *   } catch (error) {
     *     res.status(error.status || 500).end(error.message);
     *   }
     * } ;
     * ```
     *
     * Your invite url can then take the format:
     * `https://example.com/api/invite?invitation=invitation_id&organization=org_id`
     */
    invitation?: string;
    /**
     * This is useful to specify instead of {@Link NextConfig.organization} when your app has multiple
     * organizations, it should match {@Link CallbackOptions.organization}.
     */
    organization?: string;
}
/**
 * Custom options to pass to login.
 *
 * @category Server
 */
export interface LoginOptions {
    /**
     * Override the default {@link BaseConfig.authorizationParams authorizationParams}
     */
    authorizationParams?: AuthorizationParams;
    /**
     *  URL to return to after login, overrides the Default is {@link BaseConfig.baseURL}
     */
    returnTo?: string;
    /**
     *  Generate a unique state value for use during login transactions.
     */
    getLoginState?: GetLoginState;
}
/**
 * The handler for the `api/auth/login` route.
 *
 * @category Server
 */
export declare type HandleLogin = (req: NextApiRequest, res: NextApiResponse, options?: LoginOptions) => Promise<void>;
/**
 * @ignore
 */
export default function handleLoginFactory(handler: BaseHandleLogin, nextConfig: NextConfig): HandleLogin;
//# sourceMappingURL=login.d.ts.map