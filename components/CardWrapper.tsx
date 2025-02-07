"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface CardWrapperProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function CardWrapper({ title, children, className = "" }: CardWrapperProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
} 