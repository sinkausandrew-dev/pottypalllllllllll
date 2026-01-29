"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  recipientId: string
  content: string
  timestamp: Date
  isFromChild: boolean
  type: "text" | "symbol" | "voice"
  symbolUrl?: string
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar: string
  isGroup: boolean
  messages: Message[]
  unreadCount: number
}

interface MessageContextType {
  conversations: Conversation[]
  activeConversation: Conversation | null
  setActiveConversation: (conversation: Conversation | null) => void
  sendMessage: (conversationId: string, content: string, type: "text" | "symbol" | "voice", symbolUrl?: string) => void
  getConversationByParticipant: (participantId: string) => Conversation | undefined
  getGroupConversation: () => Conversation | undefined
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "group",
      participantId: "group",
      participantName: "Family Group",
      participantAvatar: "",
      isGroup: true,
      messages: [
        {
          id: "msg-1",
          senderId: "3",
          senderName: "Dad",
          senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          recipientId: "group",
          content: "Good morning everyone!",
          timestamp: new Date(Date.now() - 3600000),
          isFromChild: false,
          type: "text",
        },
      ],
      unreadCount: 0,
    },
    {
      id: "conv-1",
      participantId: "1",
      participantName: "Obama",
      participantAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isGroup: false,
      messages: [],
      unreadCount: 0,
    },
    {
      id: "conv-2",
      participantId: "2",
      participantName: "Benny",
      participantAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isGroup: false,
      messages: [
        {
          id: "msg-2",
          senderId: "2",
          senderName: "Benny",
          senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          recipientId: "child-1",
          content: "Hey buddy! How are you doing today?",
          timestamp: new Date(Date.now() - 1800000),
          isFromChild: false,
          type: "text",
        },
      ],
      unreadCount: 1,
    },
    {
      id: "conv-3",
      participantId: "3",
      participantName: "Dad",
      participantAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isGroup: false,
      messages: [],
      unreadCount: 0,
    },
    {
      id: "conv-4",
      participantId: "4",
      participantName: "Andrew",
      participantAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
      isGroup: false,
      messages: [],
      unreadCount: 0,
    },
  ])

  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)

  const sendMessage = (
    conversationId: string,
    content: string,
    type: "text" | "symbol" | "voice",
    symbolUrl?: string
  ) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "child-1",
      senderName: "Dominic",
      senderAvatar: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&h=150&fit=crop&crop=face",
      recipientId: conversationId,
      content,
      timestamp: new Date(),
      isFromChild: true,
      type,
      symbolUrl,
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      )
    )

    if (activeConversation?.id === conversationId) {
      setActiveConversation((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMessage] } : null
      )
    }
  }

  const getConversationByParticipant = (participantId: string) => {
    return conversations.find((c) => c.participantId === participantId)
  }

  const getGroupConversation = () => {
    return conversations.find((c) => c.isGroup)
  }

  return (
    <MessageContext.Provider
      value={{
        conversations,
        activeConversation,
        setActiveConversation,
        sendMessage,
        getConversationByParticipant,
        getGroupConversation,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider")
  }
  return context
}
