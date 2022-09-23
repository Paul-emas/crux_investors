/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

type PlayerProps = {
  url: string

  autoPlay?: boolean
  controls?: boolean
  initialTime?: number
  loop?: boolean
  muted?: boolean
  onPause?: React.ReactEventHandler<HTMLVideoElement>
  onPlay?: React.ReactEventHandler<HTMLVideoElement>
  onTimeUpdate?: React.ReactEventHandler<HTMLVideoElement>
  onVolumeChange?: React.ReactEventHandler<HTMLVideoElement>
  poster?: string
}

const Player = React.forwardRef<HTMLVideoElement, PlayerProps>(
  (
    {
      url,

      autoPlay = false,
      controls = false,
      initialTime = 0,
      loop = false,
      muted = false,
      onPause = null,
      onPlay = null,
      onTimeUpdate = null,
      onVolumeChange = null,
      poster = null,
    },
    ref
  ) => {
    const [retryId, setRetryId] = useState(0)
    const [playerRef, setPlayerRef] = useState<HTMLVideoElement>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const plyr = useRef<any>(null)
    const hls = useRef<any>(null)

    useEffect(() => {
      if (!(window as any).Plyr) {
        console.warn('No Plyr yet, waiting')
        setTimeout(() => {
          setRetryId(retryId + 1)
        }, 200)
        return
      }

      if (!(window as any).Hls) {
        console.warn('No Hls yet, waiting')
        setTimeout(() => {
          setRetryId(retryId + 1)
        }, 200)
        return
      }

      setTimeout(() => {
        setLoaded(true)
      }, 1500)
      if (playerRef) {
        plyr.current = new (window as any).Plyr(playerRef, {
          autoplay: autoPlay,
          muted: muted,
          settings: controls ? ['quality', 'speed'] : [],
          controls: controls
            ? [
                'play',
                'duration',
                'progress',
                'current-time',
                'mute',
                'volume',
                'settings',
                'airplay',
                'fullscreen',
              ]
            : [],
          captions: { active: true, update: true, language: 'en' },
        })

        if (!(window as any).Hls.isSupported()) {
          playerRef.src = url
        } else {
          hls.current = new (window as any).Hls()
          hls.current.loadSource(url)
          hls.current.attachMedia(playerRef)

          plyr.current.on('languagechange', () => {
            setTimeout(() => (hls.current.subtitleTrack = plyr.current.currentTrack), 50)
          })

          plyr.current.on('loadedmetadata', function () {
            if (initialTime) {
              setTimeout(() => {
                playerRef.currentTime = Math.floor(initialTime)
              }, 500)
            }
          })
        }
      }
      setLoaded(true)
      return () => {
        plyr?.current?.destroy()
        hls?.current?.destroy()
        plyr.current = null
        hls.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerRef, url, controls, autoPlay, muted, setLoaded, setRetryId, retryId])

    return (
      <div className="w-full h-full">
        <video
          className={classNames({
            hidden: !loaded,
          })}
          ref={(r) => {
            setPlayerRef(r)
            if (ref) {
              ;(ref as any).current = r
            }
          }}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls}
          muted={muted}
          loop={loop}
          onPause={onPause}
          onPlay={onPlay}
          onVolumeChange={onVolumeChange}
          playsInline
          onTimeUpdate={onTimeUpdate}
        ></video>
      </div>
    )
  }
)

export default Player
