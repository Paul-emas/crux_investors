import React from 'react'

type ChevronLinkProps = {
  dir?: 'up' | 'down' | 'left' | 'right'
}

const ChevronLink: React.FC<ChevronLinkProps> = ({ dir = 'right' }) => {
  const rotations = {
    up: 'rotate(-90deg)',
    down: 'rotate(90deg)',
    left: 'rotate(180deg)',
    right: 'rotate(0deg)',
  }
  return (
    <svg
      style={{ transform: rotations[dir] }}
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 4L12 9L6.5 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default ChevronLink
