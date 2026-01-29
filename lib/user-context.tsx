"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Caregiver {
  id: string
  name: string
  relationship: string
  avatar: string
  isOnline: boolean
}

export interface Child {
  id: string
  name: string
  avatar: string
  points: number
  caregivers: Caregiver[]
}

interface UserContextType {
  currentChild: Child
  setCurrentChild: (child: Child) => void
  getCaregiverById: (id: string) => Caregiver | undefined
}

const defaultCaregivers: Caregiver[] = [
  {
    id: "1",
    name: "Obama",
    relationship: "Family Friend",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "2",
    name: "Benny",
    relationship: "Brother",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "3",
    name: "Dad",
    relationship: "Father",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
  },
  {
    id: "4",
    name: "Andrew",
    relationship: "Uncle",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
  },
]

const defaultChild: Child = {
  id: "child-1",
  name: "Dominic",
  avatar: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&h=150&fit=crop&crop=face",
  points: 210,
  caregivers: defaultCaregivers,
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentChild, setCurrentChild] = useState<Child>(defaultChild)

  const getCaregiverById = (id: string) => {
    return currentChild.caregivers.find((c) => c.id === id)
  }

  return (
    <UserContext.Provider
      value={{
        currentChild,
        setCurrentChild,
        getCaregiverById,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
