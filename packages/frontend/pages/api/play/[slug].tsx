import { getAccessToken, withApiAuthRequired } from '@crux/nextjs-auth0'

export default withApiAuthRequired(async function videoPlay(req, res) {
  const { accessToken } = await getAccessToken(req, res, {})
  const videoId = req.query.slug as string
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/content/video/play/${videoId}`)

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: 'GET',
  })

  for (const pair of response.headers.entries()) {
    res.setHeader(pair[0], pair[1])
  }

  res.status(response.status).send(response.body)
})
