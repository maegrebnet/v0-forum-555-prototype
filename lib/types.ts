// Forum 555 Data Types

export type GoalStatus = 'full-speed' | 'slow-progress' | 'no-progress'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  forumGroupId: string
  createdAt: Date
}

export interface ForumGroup {
  id: string
  name: string
  description?: string
  memberIds: string[]
  createdAt: Date
}

export interface Goal {
  id: string
  userId: string
  title: string
  description?: string
  status: GoalStatus
  order: number
  isSharedWithGroup: boolean
  createdAt: Date
  updatedAt: Date
}

export interface GoalProgressUpdate {
  id: string
  goalId: string
  checkInId: string
  status: GoalStatus
  whatIDid: string
  whatHelped: string
  whatHindered: string
  createdAt: Date
}

export interface ReflectionEntry {
  id: string
  checkInId: string
  personalWhat: string
  personalFeeling: string
  professionalWhat: string
  professionalFeeling: string
  forumChallenge: string
  createdAt: Date
}

export interface OtherThoughts {
  id: string
  checkInId: string
  potentialChallenge: string
  potentialChallengeShared: boolean
  insight: string
  insightShared: boolean
  resource: string
  resourceShared: boolean
  createdAt: Date
}

export interface CheckIn {
  id: string
  userId: string
  reflection: ReflectionEntry
  goalUpdates: GoalProgressUpdate[]
  otherThoughts: OtherThoughts
  completedAt: Date
  durationSeconds: number
}

export interface ResourceShare {
  id: string
  userId: string
  checkInId?: string
  title: string
  description?: string
  url?: string
  content: string
  sharedAt: Date
}

export interface Comment {
  id: string
  userId: string
  targetType: 'goal' | 'insight' | 'resource' | 'challenge'
  targetId: string
  content: string
  createdAt: Date
}

export interface Meeting {
  id: string
  forumGroupId: string
  title: string
  scheduledAt: Date
  location?: string
  notes?: string
}

// Feed item types
export type FeedItemType = 'goal-update' | 'insight' | 'resource' | 'challenge'

export interface FeedItem {
  id: string
  type: FeedItemType
  userId: string
  userName: string
  userAvatar?: string
  title: string
  content: string
  goalStatus?: GoalStatus
  comments: Comment[]
  createdAt: Date
}
