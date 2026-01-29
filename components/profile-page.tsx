"use client"

import { AppHeader } from "@/components/app-header"
import { useUser } from "@/lib/user-context"
import { Star, Users, MessageSquare, Trophy } from "lucide-react"

export function ProfilePage() {
  const { currentChild } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Profile" />

      <div className="flex-1 p-4 space-y-6">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center py-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary mb-4">
            <img
              src={currentChild.avatar}
              alt={currentChild.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{currentChild.name}</h2>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-lg font-semibold text-primary">{currentChild.points} Stars</span>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{currentChild.points}</p>
            <p className="text-xs text-muted-foreground">Total Stars</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{currentChild.caregivers.length}</p>
            <p className="text-xs text-muted-foreground">Caregivers</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground">Messages</p>
          </div>
        </section>

        {/* Caregivers List */}
        <section className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-4">My Caregivers</h3>
          <div className="space-y-3">
            {currentChild.caregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <img
                      src={caregiver.avatar}
                      alt={caregiver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {caregiver.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{caregiver.name}</h4>
                  <p className="text-sm text-muted-foreground">{caregiver.relationship}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    caregiver.isOnline
                      ? "bg-green-500/20 text-green-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {caregiver.isOnline ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
