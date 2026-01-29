"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/lib/user-context"
import { useMessages, Message } from "@/lib/message-context"
import { useRouter } from "next/navigation"
import { MessageBubble } from "@/components/messages/message-bubble"
import { MessageInput } from "@/components/messages/message-input"
import { SymbolPicker } from "@/components/messages/symbol-picker"
import { Users } from "lucide-react"

export function GroupConversationView() {
  const router = useRouter()
  const { currentChild } = useUser()
  const { getGroupConversation, sendMessage } = useMessages()
  const [showSymbols, setShowSymbols] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const conversation = getGroupConversation()

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [conversation])

  const handleSendMessage = (content: string, type: "text" | "symbol" | "voice", symbolUrl?: string) => {
    if (conversation) {
      sendMessage(conversation.id, content, type, symbolUrl)
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentChild.id,
        senderName: currentChild.name,
        senderAvatar: currentChild.avatar,
        recipientId: "group",
        content,
        timestamp: new Date(),
        isFromChild: true,
        type,
        symbolUrl,
      }
      setMessages((prev) => [...prev, newMessage])
    }
    setShowSymbols(false)
  }

  const handleSymbolSelect = (symbol: { name: string; url: string }) => {
    handleSendMessage(symbol.name, "symbol", symbol.url)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Family Group</h2>
            <p className="text-xs text-muted-foreground">
              {currentChild.caregivers.length} members
            </p>
          </div>
        </div>

        <div className="flex items-center -space-x-1">
          {currentChild.caregivers.slice(0, 3).map((caregiver) => (
            <div
              key={caregiver.id}
              className="w-6 h-6 rounded-full overflow-hidden border-2 border-background"
            >
              <img src={caregiver.avatar} alt={caregiver.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Family Group Chat</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Send a message to everyone
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} showSender />
          ))
        )}
      </div>

      {showSymbols && (
        <SymbolPicker onSelect={handleSymbolSelect} onClose={() => setShowSymbols(false)} />
      )}

      <MessageInput
        onSend={(content) => handleSendMessage(content, "text")}
        onSymbolClick={() => setShowSymbols(!showSymbols)}
        showSymbols={showSymbols}
      />
    </div>
  )
}
