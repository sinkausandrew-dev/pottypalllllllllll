"use client"

import { Home, Star, ArrowLeft } from "lucide-react"
import { useUser } from "@/lib/user-context"
import Link from "next/link"

interface AppHeaderProps {
  title: string
  showBack?: boolean
  onBack?: () => void
}

export function AppHeader({ title, showBack = false, onBack }: AppHeaderProps) {
  const { currentChild } = useUser()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        ) : (
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Go to home"
          >
            <Home className="w-5 h-5 text-foreground" />
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <span className="text-sm text-muted-foreground">{currentChild.name}</span>
      </div>

      <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full">
        <Star className="w-4 h-4 text-primary fill-primary" />
        <span className="text-sm font-medium text-primary">{currentChild.points}</span>
      </div>
    </header>
  )
}
