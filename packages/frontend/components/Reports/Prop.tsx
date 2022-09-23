import React from 'react'

export const Prop: React.FC<{ name: string; value: string }> = ({ name, value }) => (
  <div className="">
    <div className="text-xs text-neutral-600">{name}</div>
    <div className="text-xl text-neutral-800">{value}</div>
  </div>
)
