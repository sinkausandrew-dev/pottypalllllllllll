"use client"

import { AppHeader } from "@/components/app-header"
import { Volume2, Moon, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react"

const settingsGroups = [
  {
    title: "Communication",
    items: [
      { icon: Volume2, label: "Voice Settings", description: "Speech rate and volume" },
      { icon: Bell, label: "Notifications", description: "Message alerts" },
    ],
  },
  {
    title: "Appearance",
    items: [
      { icon: Moon, label: "Theme", description: "Dark mode settings" },
    ],
  },
  {
    title: "Safety",
    items: [
      { icon: Shield, label: "Parental Controls", description: "Manage restrictions" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help & FAQ", description: "Get assistance" },
    ],
  },
]

export function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Settings" />

      <div className="flex-1 p-4 space-y-6">
        {settingsGroups.map((group) => (
          <section key={group.title}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">
              {group.title}
            </h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors ${
                    index !== group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-foreground">{item.label}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </section>
        ))}

        <p className="text-center text-xs text-muted-foreground pt-4">
          PottyPal AAC v1.0.0
        </p>
      </div>
    </div>
  )
}
