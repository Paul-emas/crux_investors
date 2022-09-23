import { getAccessToken, withApiAuthRequired } from '@crux/nextjs-auth0'

export default withApiAuthRequired(async function products(req, res) {
  const { accessToken } = await getAccessToken(req, res, {})
  const path = (req.query.url as string[]).join('/')
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/${path}`)

  Object.keys(req.query)
    .filter((k) => k !== 'url')
    .forEach((k) => {
      if (Array.isArray(req.query[k])) {
        ;(req.query[k] as string[]).forEach((q) => {
          url.searchParams.append(k, q)
        })
      } else {
        url.searchParams.append(k, req.query[k] as string)
      }
    })

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    ...(req.body ? { body: req.body } : null),
    method: req.method,
  })
  //   const products = await response.json()
  // res.status(200).json({ rs: response.json(), q: req.query })
  res.status(response.status).send(response.body)
})
