import { handleAuth, handleLogin, handleLogout } from '@crux/nextjs-auth0'
import Cookies from 'cookies'

export default handleAuth({
  async logout(req, res) {
    const cookies = new Cookies(req, res)
    cookies.set('canceled')
    cookies.set('userEmail')
    await handleLogout(req, res)
  },
  async login(req, res) {
    try {
      const cookies = new Cookies(req, res)
      const canceled = cookies.get('canceled') === 'true'
      const userEmail = cookies.get('userEmail')
      const returnTo = req.query?.rto || '/?wel'
      if (canceled && userEmail) {
        await handleLogin(req, res, {
          returnTo: `${process.env.AUTH0_BASE_URL}/signup?cf=1`,
          authorizationParams: {
            ui_locales: `canceled_flow:${decodeURIComponent(userEmail)}`,
            audience: process.env.AUTH0_AUDIENCE || 'https://crux-investor',
            // Add the `offline_access` scope to also get a Refresh Token
            scope: 'openid profile email read:products offline_access', // or AUTH0_SCOPE
          },
        })
      } else {
        await handleLogin(req, res, {
          returnTo: `${process.env.AUTH0_BASE_URL}${returnTo}`,
          authorizationParams: {
            ui_locales: (req.query.ui_locales as string) || '',
            audience: process.env.AUTH0_AUDIENCE || 'https://crux-investor',
            scope: 'openid profile email read:products offline_access',
          },
        })
      }
    } catch (error) {
      res.status(error.status || 400).end(error.message)
    }
  },
})
