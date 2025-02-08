'use client'

import { Select } from "@/components/ui/select"

interface SelectWrapperProps {
  onValueChangeAction: (value: string) => Promise<void>;
  [key: string]: any;
}

export function SelectWrapper({ onValueChangeAction, ...props }: SelectWrapperProps) {
  return (
    <Select onValueChange={onValueChangeAction} {...props} />
  )
} 