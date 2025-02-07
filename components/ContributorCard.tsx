"use client"

import Image from "next/image"

interface ContributorCardProps {
  login: string
  avatar_url: string
  contributions: number
}

export function ContributorCard({ login, avatar_url, contributions }: ContributorCardProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
      <Image
        src={avatar_url || "/placeholder.svg"}
        alt={login}
        width={32}
        height={32}
        className="rounded-full"
      />
      <span>{login}</span>
      <span className="text-gray-500">({contributions})</span>
    </div>
  )
} 