"use client"

import { AppHeader } from "@/components/app-header"
import { useUser } from "@/lib/user-context"
import { useMessages } from "@/lib/message-context"
import { Users } from "lucide-react"
import Link from "next/link"

export function MessagesHome() {
  const { currentChild } = useUser()
  const { conversations } = useMessages()

  const groupConversation = conversations.find((c) => c.isGroup)

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Messages" />

      <div className="flex-1 p-4 space-y-4">
        <h2 className="text-center text-lg font-medium text-foreground">
          Who do you want to message?
        </h2>

        {/* Family Group Option */}
        <Link
          href="/messages/group"
          className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl border border-primary"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-card border border-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Family Group</h3>
              <p className="text-sm text-primary">Message everyone</p>
            </div>
          </div>
          <div className="flex items-center -space-x-2">
            {currentChild.caregivers.slice(0, 4).map((caregiver) => (
              <div
                key={caregiver.id}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-background"
              >
                <img
                  src={caregiver.avatar}
                  alt={caregiver.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Link>

        {/* Individual Caregivers Grid */}
        <div className="grid grid-cols-2 gap-4">
          {currentChild.caregivers.map((caregiver) => {
            const conversation = conversations.find(
              (c) => c.participantId === caregiver.id
            )
            const hasUnread = conversation && conversation.unreadCount > 0

            return (
              <Link
                key={caregiver.id}
                href={`/messages/${caregiver.id}`}
                className="relative bg-card rounded-xl border border-border hover:border-primary transition-colors p-6 flex flex-col items-center gap-3"
              >
                {hasUnread && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                    {conversation.unreadCount}
                  </span>
                )}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-border">
                    <img
                      src={caregiver.avatar}
                      alt={caregiver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {caregiver.isOnline && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-foreground">{caregiver.name}</h3>
                  <p className="text-xs text-muted-foreground">{caregiver.relationship}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
