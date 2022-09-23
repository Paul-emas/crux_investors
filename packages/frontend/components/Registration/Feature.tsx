import Check from '@components/Svgs/Check'
import React from 'react'

const Feature: React.FC = ({ children }) => (
  <div className="text-left text-lg pb-6 flex items-center">
    <Check />
    <span className="ml-3">{children}</span>
  </div>
)

export default Feature
