"use client"

import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          GitHub Repo Search
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}

