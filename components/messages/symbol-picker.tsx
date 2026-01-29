"use client"

import { X } from "lucide-react"

// AAC symbols for common communication needs
const symbols = [
  {
    category: "Feelings",
    items: [
      { name: "Happy", url: "https://img.icons8.com/color/96/happy.png" },
      { name: "Sad", url: "https://img.icons8.com/color/96/sad.png" },
      { name: "Tired", url: "https://img.icons8.com/color/96/sleeping.png" },
      { name: "Hungry", url: "https://img.icons8.com/color/96/hamburger.png" },
      { name: "Thirsty", url: "https://img.icons8.com/color/96/water.png" },
      { name: "Sick", url: "https://img.icons8.com/color/96/vomiting.png" },
    ],
  },
  {
    category: "Needs",
    items: [
      { name: "Help", url: "https://img.icons8.com/color/96/helping-hand.png" },
      { name: "Bathroom", url: "https://img.icons8.com/color/96/toilet-bowl.png" },
      { name: "Break", url: "https://img.icons8.com/color/96/pause.png" },
      { name: "More", url: "https://img.icons8.com/color/96/plus.png" },
      { name: "All Done", url: "https://img.icons8.com/color/96/checkmark.png" },
      { name: "Stop", url: "https://img.icons8.com/color/96/cancel.png" },
    ],
  },
  {
    category: "Activities",
    items: [
      { name: "Play", url: "https://img.icons8.com/color/96/playground.png" },
      { name: "Read", url: "https://img.icons8.com/color/96/book.png" },
      { name: "Watch TV", url: "https://img.icons8.com/color/96/tv.png" },
      { name: "Music", url: "https://img.icons8.com/color/96/music.png" },
      { name: "Go Outside", url: "https://img.icons8.com/color/96/sun.png" },
      { name: "Sleep", url: "https://img.icons8.com/color/96/sleeping-in-bed.png" },
    ],
  },
  {
    category: "Responses",
    items: [
      { name: "Yes", url: "https://img.icons8.com/color/96/thumb-up.png" },
      { name: "No", url: "https://img.icons8.com/color/96/thumb-down.png" },
      { name: "I Love You", url: "https://img.icons8.com/color/96/hearts.png" },
      { name: "Thank You", url: "https://img.icons8.com/color/96/trust.png" },
      { name: "Please", url: "https://img.icons8.com/color/96/praying.png" },
      { name: "Sorry", url: "https://img.icons8.com/color/96/sad-cloud.png" },
    ],
  },
]

interface SymbolPickerProps {
  onSelect: (symbol: { name: string; url: string }) => void
  onClose: () => void
}

export function SymbolPicker({ onSelect, onClose }: SymbolPickerProps) {
  return (
    <div className="fixed bottom-28 left-0 right-0 bg-card border-t border-border max-h-[50vh] overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-3 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Choose a Symbol</h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-secondary transition-colors"
          aria-label="Close symbol picker"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {symbols.map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              {category.category}
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {category.items.map((symbol) => (
                <button
                  key={symbol.name}
                  onClick={() => onSelect(symbol)}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-secondary hover:bg-primary/20 hover:border-primary border border-transparent transition-colors"
                >
                  <img
                    src={symbol.url}
                    alt={symbol.name}
                    className="w-10 h-10 object-contain"
                  />
                  <span className="text-xs text-foreground text-center leading-tight">
                    {symbol.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
