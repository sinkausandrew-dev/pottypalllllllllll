"use client"

import { useState } from "react"
import { Send, Grid3X3, Mic, MicOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageInputProps {
  onSend: (content: string) => void
  onSymbolClick: () => void
  showSymbols: boolean
}

export function MessageInput({ onSend, onSymbolClick, showSymbols }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 pb-24">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSymbolClick}
          className={cn(
            "p-3 rounded-full transition-colors",
            showSymbols
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          )}
          aria-label="Toggle symbol picker"
        >
          <Grid3X3 className="w-5 h-5" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsRecording(!isRecording)}
          className={cn(
            "p-3 rounded-full transition-colors",
            isRecording
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          )}
          aria-label={isRecording ? "Stop recording" : "Start voice message"}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
