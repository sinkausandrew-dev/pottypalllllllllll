"use client"

import { AppHeader } from "@/components/app-header"
import { useUser } from "@/lib/user-context"
import { Star, Gift, Trophy } from "lucide-react"

const rewards = [
  { id: 1, name: "Extra Screen Time", cost: 50, icon: "🎮" },
  { id: 2, name: "Favorite Snack", cost: 30, icon: "🍪" },
  { id: 3, name: "Park Visit", cost: 100, icon: "🏞️" },
  { id: 4, name: "New Toy", cost: 200, icon: "🧸" },
  { id: 5, name: "Movie Night", cost: 75, icon: "🎬" },
  { id: 6, name: "Special Outing", cost: 150, icon: "🎢" },
]

export function RewardsPage() {
  const { currentChild } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Rewards" />

      <div className="flex-1 p-4 space-y-6">
        {/* Points Display */}
        <section className="bg-gradient-to-r from-primary/30 to-primary/10 border border-primary rounded-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">{currentChild.points}</h2>
          <p className="text-muted-foreground">Stars Available</p>
        </section>

        {/* Achievements */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Recent Achievements
          </h3>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                🌟
              </div>
              <div>
                <h4 className="font-medium text-foreground">Communication Star</h4>
                <p className="text-sm text-muted-foreground">Sent 10 messages today!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Rewards */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Rewards Store
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward) => {
              const canAfford = currentChild.points >= reward.cost
              return (
                <button
                  key={reward.id}
                  disabled={!canAfford}
                  className={`p-4 rounded-xl border text-center transition-colors ${
                    canAfford
                      ? "bg-card border-border hover:border-primary"
                      : "bg-muted/50 border-border opacity-60"
                  }`}
                >
                  <span className="text-3xl block mb-2">{reward.icon}</span>
                  <h4 className="font-medium text-foreground text-sm">{reward.name}</h4>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-medium text-primary">{reward.cost}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
