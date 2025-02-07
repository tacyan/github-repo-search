'use client'

export function SelectWrapper({ onValueChange, ...props }) {
  return (
    <Select onValueChange={onValueChange} {...props} />
  )
} 