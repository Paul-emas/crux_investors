import React from 'react'

type ChevronProps = {
  dir?: 'up' | 'down' | 'left' | 'right'
}

const BigChevron: React.FC<ChevronProps> = ({ dir = 'right' }) => {
  const rotations = {
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
    left: 'rotate(180deg)',
    right: 'rotate(0deg)',
  }
  return (
    <svg
      style={{ transform: rotations[dir] }}
      width="18"
      height="48"
      viewBox="0 0 18 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 48H2.19048L18 24.0475L2.19048 0H0L15.619 24.0475L0 48Z" fill="currentColor" />
    </svg>
  )
}

export default BigChevron
