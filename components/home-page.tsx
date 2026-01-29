"use client"

import { AppHeader } from "@/components/app-header"
import { useUser } from "@/lib/user-context"
import { MessageSquare, BookOpen, Trophy, Settings } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    href: "/messages",
    icon: MessageSquare,
    label: "Messages",
    description: "Talk to your family",
    color: "bg-primary/20",
  },
  {
    href: "/symbols",
    icon: BookOpen,
    label: "Symbols",
    description: "Use picture symbols",
    color: "bg-secondary",
  },
  {
    href: "/rewards",
    icon: Trophy,
    label: "Rewards",
    description: "Check your stars",
    color: "bg-secondary",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    description: "App preferences",
    color: "bg-secondary",
  },
]

export function HomePage() {
  const { currentChild } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Home" />
      
      <div className="flex-1 p-4 space-y-6">
        <section className="text-center py-6">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary mb-4">
            <img
              src={currentChild.avatar}
              alt={currentChild.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Hi, {currentChild.name}!
          </h2>
          <p className="text-muted-foreground mt-1">What would you like to do today?</p>
        </section>

        <section className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${action.color} p-4 rounded-xl border border-border hover:border-primary transition-colors flex flex-col items-center gap-3 text-center`}
            >
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
                <action.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{action.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-3">Your Caregivers</h3>
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {currentChild.caregivers.map((caregiver) => (
              <Link
                key={caregiver.id}
                href={`/messages/${caregiver.id}`}
                className="flex flex-col items-center gap-2 min-w-fit"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-border">
                    <img
                      src={caregiver.avatar}
                      alt={caregiver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {caregiver.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{caregiver.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
