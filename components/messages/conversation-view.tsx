"use client"

import { useEffect, useState } from "react"
import { AppHeader } from "@/components/app-header"
import { useUser } from "@/lib/user-context"
import { useMessages, Message } from "@/lib/message-context"
import { useRouter } from "next/navigation"
import { MessageBubble } from "@/components/messages/message-bubble"
import { MessageInput } from "@/components/messages/message-input"
import { SymbolPicker } from "@/components/messages/symbol-picker"

interface ConversationViewProps {
  participantId: string
}

export function ConversationView({ participantId }: ConversationViewProps) {
  const router = useRouter()
  const { getCaregiverById, currentChild } = useUser()
  const { getConversationByParticipant, sendMessage } = useMessages()
  const [showSymbols, setShowSymbols] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const caregiver = getCaregiverById(participantId)
  const conversation = getConversationByParticipant(participantId)

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages)
    }
  }, [conversation])

  if (!caregiver) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader title="Messages" showBack onBack={() => router.back()} />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Caregiver not found</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = (content: string, type: "text" | "symbol" | "voice", symbolUrl?: string) => {
    if (conversation) {
      sendMessage(conversation.id, content, type, symbolUrl)
      // Add to local state immediately for optimistic UI
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentChild.id,
        senderName: currentChild.name,
        senderAvatar: currentChild.avatar,
        recipientId: participantId,
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
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
              <img src={caregiver.avatar} alt={caregiver.name} className="w-full h-full object-cover" />
            </div>
            {caregiver.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{caregiver.name}</h2>
            <p className="text-xs text-muted-foreground">{caregiver.relationship}</p>
          </div>
        </div>

        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary mb-4">
              <img src={caregiver.avatar} alt={caregiver.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Start a conversation</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Send a message to {caregiver.name}
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
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
