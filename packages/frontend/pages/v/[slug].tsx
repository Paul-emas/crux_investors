/* eslint-disable jsx-a11y/media-has-caption */
import Alert from '@/components/Alert'
import Bookmark from '@/components/Svgs/Bookmark'
import TimesCircle from '@/components/Svgs/TimesCircle'
import Description from '@/components/Video/Description'
import Player from '@/components/Video/Player'
import { genCardsHor, guest } from '@/utils/gen'
import { withErrorHandler } from '@/utils/withErrorHandler'
import Button from '@components/Button'
import Layout from '@components/Layout'
import { useStore } from '@components/StoreProvider'
import PlayIcon from '@components/Svgs/SummaryPlay'
import { UserProfile, withPageAuthRequired } from '@crux/nextjs-auth0'
import { contentListings, getVideo } from '@utils/api'
import { MappedVideo, Video } from '@utils/mappedTypings'
import classNames from 'classnames'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { observer } from 'mobx-react-lite'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

import RelatedListSkeleton from '../../components/Skeletons/RelatedListSkeleton'
import VideoPageSkeleton from '../../components/Skeletons/VideoPageSkeleton'
import { contentVideosListingMap, videoMap } from '../../utils/acl'
import { ContentSingleVideoResponse, ContentVideosListingResponse } from '../../utils/typings'

dayjs.extend(LocalizedFormat)

// const TEST_VIDEO = 'https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'
// const TEST_VIDEO = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'

type VideoPageProps = {
  user: UserProfile
  data: MappedVideo
  related: Video[]
}

const getAspectRatio = (str: string): string => {
  const [x, y] = (str || '').split(':')
  const w = parseInt(x)
  const h = parseInt(y)
  if (h && w) {
    return `${(h / w) * 100}%`
  }
  return '56%'
}

const VideoPage: React.FC<VideoPageProps> = observer((props) => {
  const router = useRouter()
  const playerRef = useRef<HTMLVideoElement>(null)
  const playerPreviewRef = useRef<HTMLVideoElement>(null)

  const [video, setVideo] = useState(props?.data?.data || null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [related, setRelated] = useState(props?.related || null)
  const [streamStarted, setStreamStarted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertError, setAlertError] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const { data } = useSWR<ContentSingleVideoResponse>(
    props?.data?.data ? null : `/api/crux/content/item/video/${router?.query?.slug}`
  )

  const { data: relatedData } = useSWR<ContentVideosListingResponse>(
    video?.topics?.[0]?.id && !props?.related
      ? `/api/crux/content/videos/topic?limit=16&id=${video?.topics?.[0]?.id}`
      : null
  )

  useEffect(() => {
    if (video?.title && video?.videoId) {
      ;(global as any)?.analytics?.track('Episode Viewed', {
        title: video?.title,
        id: video?.videoId,
      })
    }
  }, [video?.videoId, video?.title])

  useEffect(() => {
    if (video?.videoId !== router?.query?.slug) {
      setVideo(null)
      setRelated(null)
      setStreamStarted(true)
      setCurrentTime(0)
    }
  }, [router?.query?.slug, video?.videoId, setVideo, setRelated, setStreamStarted, setCurrentTime])

  useEffect(() => {
    if (data) {
      setVideo(videoMap(data))
    }
  }, [data, setVideo])

  useEffect(() => {
    if ((data as any)?.code === 1) {
      router.push('/signup?cf=1')
    }
  }, [data, router])

  useEffect(() => {
    if (relatedData) {
      setRelated(contentVideosListingMap(relatedData)?.videos)
    }
  }, [relatedData, setRelated])

  const store = useStore()

  useEffect(() => {
    store.getBookmarks()
  }, [store])

  const handledisplayAlert = (success: boolean, message: string): void => {
    if (success) {
      setAlertMessage(message)
      setAlertError(false)
      setOpenAlert(true)
    } else {
      setAlertMessage('Something went wrong')
      setAlertError(true)
      setOpenAlert(true)
    }
  }

  const addBookmark = useCallback(async () => {
    const saved = await store.addBookmark(video.videoId)
    handledisplayAlert(saved, 'Added to My List')
  }, [store, video?.videoId])

  const removeBookmark = useCallback(async () => {
    const removed = await store.removeBookmark(video.videoId)
    handledisplayAlert(removed, 'Removed from My List')
  }, [store, video?.videoId])

  const videoPreviewUrl = video?.videoPreview?.url || null
  const videoUrl = video?.video?.url || null

  useEffect(() => {
    if (!video) {
      return
    }
    const videoData = {
      id: video.videoId,
      showName: video.showName,
      showId: video.showId,
      title: video.title,
      videoUrl,
      videoPreviewUrl,
    }
    if (streamStarted) {
      ;(global as any)?.analytics?.track('Episode Playback Started', videoData)
    } else {
      ;(global as any)?.analytics?.track('Episode Summary Playback Started', videoData)
    }
  }, [
    streamStarted,
    video?.videoId,
    video?.showName,
    video?.showId,
    video?.title,
    videoPreviewUrl,
    videoUrl,
    video,
  ])

  const onTimeUpdate = useCallback(
    (time) => {
      setCurrentTime(time)
      if (streamStarted && !videoEnded && video?.video?.duration) {
        if (video.video.duration - time <= 10) {
          setVideoEnded(true)
          ;(global as any)?.analytics?.track('Episode Watched', {
            title: video?.title,
            id: video?.videoId,
          })
        }
      }
    },
    [streamStarted, videoEnded, video?.video?.duration, video?.title, video?.videoId]
  )

  const startStream = useCallback(() => {
    setStreamStarted(true)
  }, [setStreamStarted])

  const stopStream = useCallback(() => {
    setStreamStarted(false)
  }, [setStreamStarted])

  if (video && !video?.videoId) {
    return (
      <Layout>
        <Head>
          <title>Not found</title>
        </Head>
        <div className="text-center text-2xl pt-6">Not found</div>
      </Layout>
    )
  } else if (!video) {
    return <VideoPageSkeleton />
  }

  const bookmarked = store.bookmarks.map((v) => v.videoId).includes(video.videoId)
  const relatedVideos = genCardsHor(
    'video',
    (related || []).filter((v) => v?.videoId !== video?.videoId).filter((_, idx) => idx < 12)
  )

  const preview = videoPreviewUrl ? (
    <Player
      key={`preview-${video.videoId}`}
      ref={playerPreviewRef}
      url={videoPreviewUrl}
      poster={video?.heroImageUrl}
      autoPlay
      controls
    />
  ) : (
    <Image
      alt={`Video ${video.title} splash screen`}
      src={video.heroImageUrl || '/1px.png'}
      layout="fill"
      loading="eager"
      className="object-cover opacity-25 bg-blue-900"
    />
  )

  const previewButton = videoPreviewUrl ? (
    <Button
      radius="large"
      size="small"
      customPx
      transition={false}
      secondary={streamStarted}
      onClick={streamStarted ? stopStream : startStream}
      className={classNames('py-3 mr-3.5 mb-1 lg:mb-0', {
        'min-w-36 px-0': !streamStarted,
        'max-w-40 px-4': streamStarted,
      })}
    >
      <div className="flex px-3.75 items-center">
        <span className="pr-2">{streamStarted ? <PlayIcon /> : <TimesCircle />}</span>
        <span className="tracking-button">{streamStarted ? 'Summary' : 'Close Summary'}</span>
      </div>
    </Button>
  ) : null

  // const topics = video?.topics?.length ? (
  //   <div className="flex flex-row pt-2">
  //     {video.topics.map((topic, idx) => (
  //       <Link key={idx} href={`/topic/${topic.id}`}>
  //         <a className="bg-neutral-200 mr-2 px-1 py-0.5 rounded-md text-neutral-600 text-sm tracking-tight transition-all hover:bg-neutral-300 hover:text-neutral-900">
  //           {topic.name}
  //         </a>
  //       </Link>
  //     ))}
  //   </div>
  // ) : null

  return (
    <Layout>
      <Head>
        <title>{video.title}</title>
        <link rel="stylesheet" href="/pl/plyr.css" />
        <script src="/pl/plyr.polyfilled.js"></script>
        <script src="/pl/hls.js"></script>
      </Head>
      <Alert icon error={alertError} open={openAlert} setOpen={setOpenAlert}>
        {alertMessage}
      </Alert>
      <div className="xxs:px-0 xs:px-8 sm:px-9 lg:px-14 4xl:px-0 xs:py-12 grid lg:grid-cols-3 gap-6 4xl:max-w-1400 mx-auto">
        <div className="col-span-2 4xl:max-w-1040">
          <div
            className="w-full bg-neutral-050 relative"
            style={{ paddingBottom: getAspectRatio(video?.video?.aspectRatio) }}
          >
            <div
              className="absolute inset-0 z-0 flex items-center justify-center"
              style={{ backgroundColor: video?.heroColor || '#171717' }}
            >
              {streamStarted ? (
                <Player
                  key={`main-${video.videoId}`}
                  ref={playerRef}
                  url={videoUrl}
                  poster={video?.heroImageUrl}
                  onTimeUpdate={(e) => onTimeUpdate(e?.currentTarget?.currentTime || 0)}
                  autoPlay
                  controls
                  initialTime={currentTime}
                />
              ) : (
                preview
              )}
            </div>
          </div>
          <div className="py-4 pb-4 md:pt-6 px-4 xs:px-0 flex flex-col xxs:flex-row justify-between">
            <div className="flex flex-col xxs:w-9/16 2xl:w-full">
              <div className="text-base md:text-xl font-title leading-6">{video.title}</div>
              <div className="flex items-center text-xsm md:text-sm leading-3.5 text-neutral-600 pt-2">
                <div>
                  {video?.publishedAt ? dayjs(video.publishedAt).format('D MMMM YYYY') : ''}
                </div>
                {video?.publishedAt && (guest(video) || video.companyName) ? (
                  <div className="w-0.5 h-0.5 rounded-full bg-neutral-400 mx-2"></div>
                ) : null}
                {guest(video) ? (
                  video?.guests?.map((g, idx) => (
                    <span key={idx}>
                      {idx > 0 ? ', ' : null}
                      <Link href={`/guest/${g.id}`}>
                        <a className="hover:underline">{g.name}</a>
                      </Link>
                    </span>
                  ))
                ) : (
                  <Link
                    href={`/company/${video.companyId}?t=${encodeURIComponent(video.companyName)}`}
                  >
                    <a className="hover:underline">{video.companyName}</a>
                  </Link>
                )}
              </div>
            </div>
            <div className="flex flex-row lg:flex-row justify-between items-start mt-6 xxs:mt-0">
              <div className="flex flex-row">
                {previewButton}
                <Button
                  radius="large"
                  loading={store.bookmarksLoading}
                  customPx
                  secondary
                  size="small"
                  onClick={bookmarked ? removeBookmark : addBookmark}
                  className="w-full lg:w-auto px-4 min-w-24 py-3"
                >
                  <div className="flex px-3.75 items-center">
                    <span className="pr-2">
                      <Bookmark />
                    </span>
                    <span className="tracking-button">{bookmarked ? 'Saved' : 'Save'}</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4 xs:px-0 border-t border-neutral-100">
            <Description body={video?.description} />
          </div>
        </div>
        {relatedVideos?.length ? (
          <div className="col-span-1 px-4 xs:px-0">{relatedVideos}</div>
        ) : (
          <RelatedListSkeleton />
        )}
      </div>
    </Layout>
  )
})

export default VideoPage

export const getServerSideProps = withErrorHandler(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<VideoPageProps>> => {
    if (context.req.url?.startsWith('/_next')) {
      return { props: {} } as any
    }
    const auth: any = await withPageAuthRequired()(context)
    if (!auth?.props?.user) {
      return {
        redirect: {
          destination: `/api/auth/login?rto=${encodeURIComponent(context.resolvedUrl)}`,

          permanent: false,
        },
      }
    }

    const data = await getVideo(context)

    const topicId = data?.data?.topics?.[0]?.id || null
    let related = []
    if (topicId) {
      const rs = await contentListings(context, 'topic', topicId)
      related = rs?.data?.videos || []
    }
    return { props: { ...auth.props, data, related, topicId } }
  }
)
