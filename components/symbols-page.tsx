"use client"

import { AppHeader } from "@/components/app-header"
import { useState } from "react"

const symbolCategories = [
  {
    name: "Feelings",
    symbols: [
      { name: "Happy", url: "https://img.icons8.com/color/96/happy.png" },
      { name: "Sad", url: "https://img.icons8.com/color/96/sad.png" },
      { name: "Angry", url: "https://img.icons8.com/color/96/angry.png" },
      { name: "Scared", url: "https://img.icons8.com/color/96/scared.png" },
      { name: "Tired", url: "https://img.icons8.com/color/96/sleeping.png" },
      { name: "Excited", url: "https://img.icons8.com/color/96/smiling.png" },
    ],
  },
  {
    name: "Needs",
    symbols: [
      { name: "Help", url: "https://img.icons8.com/color/96/helping-hand.png" },
      { name: "Bathroom", url: "https://img.icons8.com/color/96/toilet-bowl.png" },
      { name: "Hungry", url: "https://img.icons8.com/color/96/hamburger.png" },
      { name: "Thirsty", url: "https://img.icons8.com/color/96/water.png" },
      { name: "Break", url: "https://img.icons8.com/color/96/pause.png" },
      { name: "More", url: "https://img.icons8.com/color/96/plus.png" },
    ],
  },
  {
    name: "Actions",
    symbols: [
      { name: "Play", url: "https://img.icons8.com/color/96/playground.png" },
      { name: "Eat", url: "https://img.icons8.com/color/96/cutlery.png" },
      { name: "Drink", url: "https://img.icons8.com/color/96/drink.png" },
      { name: "Read", url: "https://img.icons8.com/color/96/book.png" },
      { name: "Watch", url: "https://img.icons8.com/color/96/tv.png" },
      { name: "Sleep", url: "https://img.icons8.com/color/96/sleeping-in-bed.png" },
    ],
  },
  {
    name: "People",
    symbols: [
      { name: "Mom", url: "https://img.icons8.com/color/96/mother.png" },
      { name: "Dad", url: "https://img.icons8.com/color/96/father.png" },
      { name: "Teacher", url: "https://img.icons8.com/color/96/teacher.png" },
      { name: "Friend", url: "https://img.icons8.com/color/96/friend.png" },
      { name: "Doctor", url: "https://img.icons8.com/color/96/doctor.png" },
      { name: "Family", url: "https://img.icons8.com/color/96/family.png" },
    ],
  },
]

export function SymbolsPage() {
  const [selectedCategory, setSelectedCategory] = useState(symbolCategories[0].name)

  const currentCategory = symbolCategories.find((c) => c.name === selectedCategory)

  const speakSymbol = (name: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(name)
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title="Symbols" />

      <div className="flex-1 p-4 space-y-4">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {symbolCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Symbol Grid */}
        <div className="grid grid-cols-3 gap-3">
          {currentCategory?.symbols.map((symbol) => (
            <button
              key={symbol.name}
              onClick={() => speakSymbol(symbol.name)}
              className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-xl hover:border-primary hover:bg-primary/10 transition-colors"
            >
              <img
                src={symbol.url}
                alt={symbol.name}
                className="w-16 h-16 object-contain"
              />
              <span className="text-sm font-medium text-foreground">{symbol.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
