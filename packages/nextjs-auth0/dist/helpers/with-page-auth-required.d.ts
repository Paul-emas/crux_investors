import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { Claims, GetSession } from '../session';
import React, { ComponentType } from 'react';
import { WithPageAuthRequiredOptions as WithPageAuthRequiredCSROptions } from '../frontend/with-page-auth-required';
/**
 * If you wrap your `getServerSideProps` with {@link WithPageAuthRequired} your props object will be augmented with
 * the user property, which will be the user's {@link Claims}
 *
 * ```js
 * // pages/profile.js
 * import { withPageAuthRequired } from '@auth0/nextjs-auth0';
 *
 * export default function Profile({ user }) {
 *   return <div>Hello {user.name}</div>;
 * }
 *
 * export const getServerSideProps = withPageAuthRequired();
 * ```
 *
 * @category Server
 */
export declare type GetServerSidePropsResultWithSession = GetServerSidePropsResult<{
    user?: Claims | null;
    [key: string]: any;
}>;
/**
 * A page route that has been augmented with {@link WithPageAuthRequired}
 *
 * @category Server
 */
export declare type PageRoute = (cts: GetServerSidePropsContext) => Promise<GetServerSidePropsResultWithSession>;
/**
 * If you have a custom returnTo url you should specify it in `returnTo`.
 *
 * You can pass in your own `getServerSideProps` method, the props returned from this will be merged with the
 * user props, eg:
 *
 * ```js
 * // pages/protected-page.js
 * import { withPageAuthRequired } from '@auth0/nextjs-auth0';
 *
 * export default function ProtectedPage({ user, customProp }) {
 *   return <div>Protected content</div>;
 * }
 *
 * export const getServerSideProps = withPageAuthRequired({
 *   returnTo: '/foo',
 *   async getServerSideProps(ctx) {
 *     return { props: { customProp: 'bar' } };
 *   }
 * });
 * ```
 *
 * @category Server
 */
export declare type WithPageAuthRequiredOptions = {
    getServerSideProps?: GetServerSideProps;
    returnTo?: string;
};
/**
 * Wrap your `getServerSideProps` with this method to make sure the user is authenticated before visiting the page.
 *
 * ```js
 * // pages/protected-page.js
 * import { withPageAuthRequired } from '@auth0/nextjs-auth0';
 *
 * export default function ProtectedPage() {
 *   return <div>Protected content</div>;
 * }
 *
 * export const getServerSideProps = withPageAuthRequired();
 * ```
 *
 * If the user visits `/protected-page` without a valid session, it will redirect the user to the login page.
 * Then they will be returned to `/protected-page` after login.
 *
 * @category Server
 */
export declare type WithPageAuthRequired = {
    (opts?: WithPageAuthRequiredOptions): PageRoute;
    <P extends {
        [key: string]: any;
    }>(Component: ComponentType<P>, options?: WithPageAuthRequiredCSROptions): React.FC<P>;
};
/**
 * @ignore
 */
export default function withPageAuthRequiredFactory(loginUrl: string, getSession: GetSession): WithPageAuthRequired;
//# sourceMappingURL=with-page-auth-required.d.ts.map