import { enterOrSpace } from '@/utils/accessibility'
import classNames from 'classnames'
import React from 'react'

import Speaker from '../Svgs/Speaker'

type VolumeSliderProps = {
  volume?: number
  onClick?: (unmute?: boolean) => void
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ volume = 1, onClick = () => null }) => {
  return (
    <div className="group relative">
      <div
        tabIndex={-1}
        onKeyDown={enterOrSpace(() => onClick())}
        onClick={() => onClick()}
        role="button"
        className={classNames(
          'flex justify-center items-center w-13 h-13 bg-black hover:bg-neutral-100 rounded-full cursor-pointer transition-all text-neutral-1000 focus:outline-none'
        )}
      >
        <Speaker noCross={!!volume} />
      </div>
    </div>
  )
}

export default VolumeSlider
