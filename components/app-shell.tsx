"use client"

import { UserProvider } from "@/lib/user-context"
import { MessageProvider } from "@/lib/message-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ReactNode } from "react"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <UserProvider>
      <MessageProvider>
        <div className="min-h-screen bg-background flex flex-col">
          <main className="flex-1 pb-20">{children}</main>
          <BottomNavigation />
        </div>
      </MessageProvider>
    </UserProvider>
  )
}
