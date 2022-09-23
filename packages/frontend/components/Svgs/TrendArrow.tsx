import React from 'react'

type TrendArrowProps = {
  dir?: 'up' | 'down' | 'left' | 'right'
}

const TrendArrow: React.FC<TrendArrowProps> = ({ dir = 'up' }) => {
  const rotations = {
    up: 'rotate(0deg)',
    down: 'rotate(90deg)',
  }
  return (
    <svg
      style={{ transform: rotations[dir] }}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 14L14 6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 6H14V12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default TrendArrow
