import React from 'react'

type ChevronProps = {
  dir?: 'up' | 'down' | 'left' | 'right'
}

const Chevron: React.FC<ChevronProps> = ({ dir = 'right' }) => {
  const rotations = {
    up: 'rotate(-90)',
    down: 'rotate(90)',
    left: 'rotate(180)',
    right: 'rotate(0)',
  }
  return (
    <svg
      transform={rotations[dir]}
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 4L12 9L6.5 14" stroke="#EEEEEE" strokeWidth="1.5" />
    </svg>
  )
}

export default Chevron
