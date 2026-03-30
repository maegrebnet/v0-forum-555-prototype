'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { currentUser, userGoals, feedItems, upcomingMeeting, forumGroup, groupMembers } from './mock-data'
import type { User, Goal, FeedItem, Meeting, ForumGroup, GoalStatus, CheckIn, Comment } from './types'

interface AppContextType {
  user: User
  goals: Goal[]
  feedItems: FeedItem[]
  upcomingMeeting: Meeting
  forumGroup: ForumGroup
  groupMembers: User[]
  updateGoal: (goalId: string, updates: Partial<Goal>) => void
  updateGoalStatus: (goalId: string, status: GoalStatus) => void
  addComment: (feedItemId: string, content: string) => void
  currentCheckIn: Partial<CheckIn> | null
  setCurrentCheckIn: (checkIn: Partial<CheckIn> | null) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(userGoals)
  const [feed, setFeed] = useState<FeedItem[]>(feedItems)
  const [currentCheckIn, setCurrentCheckIn] = useState<Partial<CheckIn> | null>(null)

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, ...updates, updatedAt: new Date() } 
          : goal
      )
    )
  }

  const updateGoalStatus = (goalId: string, status: GoalStatus) => {
    updateGoal(goalId, { status })
  }

  const addComment = (feedItemId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      targetType: 'goal',
      targetId: feedItemId,
      content,
      createdAt: new Date(),
    }

    setFeed(prev =>
      prev.map(item =>
        item.id === feedItemId
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      )
    )
  }

  return (
    <AppContext.Provider
      value={{
        user: currentUser,
        goals,
        feedItems: feed,
        upcomingMeeting,
        forumGroup,
        groupMembers,
        updateGoal,
        updateGoalStatus,
        addComment,
        currentCheckIn,
        setCurrentCheckIn,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
