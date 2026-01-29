"use client"

import { Message } from "@/lib/message-context"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface MessageBubbleProps {
  message: Message
  showSender?: boolean
}

export function MessageBubble({ message, showSender = false }: MessageBubbleProps) {
  const isOwn = message.isFromChild

  return (
    <div className={cn("flex gap-2", isOwn ? "justify-end" : "justify-start")}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className={cn("max-w-[75%] flex flex-col gap-1", isOwn && "items-end")}>
        {showSender && !isOwn && (
          <span className="text-xs text-muted-foreground ml-1">{message.senderName}</span>
        )}

        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card border border-border text-foreground rounded-bl-md"
          )}
        >
          {message.type === "symbol" && message.symbolUrl ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={message.symbolUrl}
                alt={message.content}
                className="w-16 h-16 object-contain"
              />
              <span className="text-sm font-medium">{message.content}</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>

        <span className="text-xs text-muted-foreground px-1">
          {format(new Date(message.timestamp), "h:mm a")}
        </span>
      </div>

      {isOwn && (
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary flex-shrink-0">
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}
