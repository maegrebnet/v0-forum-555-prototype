import type { User, ForumGroup, Goal, CheckIn, Meeting, FeedItem, Comment } from './types'

export const currentUser: User = {
  id: 'user-1',
  name: 'Alexandra Chen',
  email: 'alexandra@example.com',
  avatarUrl: undefined,
  forumGroupId: 'group-1',
  createdAt: new Date('2024-01-15'),
}

export const forumGroup: ForumGroup = {
  id: 'group-1',
  name: 'Leadership Circle',
  description: 'A confidential peer group for executive growth and accountability',
  memberIds: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5'],
  createdAt: new Date('2023-06-01'),
}

export const groupMembers: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Michael Torres',
    email: 'michael@example.com',
    forumGroupId: 'group-1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    forumGroupId: 'group-1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-4',
    name: 'David Park',
    email: 'david@example.com',
    forumGroupId: 'group-1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'user-5',
    name: 'Emma Richardson',
    email: 'emma@example.com',
    forumGroupId: 'group-1',
    createdAt: new Date('2024-01-15'),
  },
]

export const userGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: 'user-1',
    title: 'Develop strategic delegation framework',
    description: 'Create a clear system for delegating high-impact decisions to my leadership team',
    status: 'full-speed',
    order: 1,
    isSharedWithGroup: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-25'),
  },
  {
    id: 'goal-2',
    userId: 'user-1',
    title: 'Improve work-life boundaries',
    description: 'Establish clear boundaries between work and personal time, including device-free evenings',
    status: 'slow-progress',
    order: 2,
    isSharedWithGroup: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-24'),
  },
  {
    id: 'goal-3',
    userId: 'user-1',
    title: 'Build executive presence in board meetings',
    description: 'Develop more confident communication style and strategic framing in board presentations',
    status: 'full-speed',
    order: 3,
    isSharedWithGroup: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-23'),
  },
  {
    id: 'goal-4',
    userId: 'user-1',
    title: 'Mentor two emerging leaders',
    description: 'Identify and actively mentor two high-potential team members for leadership roles',
    status: 'slow-progress',
    order: 4,
    isSharedWithGroup: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-03-20'),
  },
  {
    id: 'goal-5',
    userId: 'user-1',
    title: 'Complete executive coaching certification',
    description: 'Finish the ICF-accredited coaching program by Q3',
    status: 'no-progress',
    order: 5,
    isSharedWithGroup: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-15'),
  },
]

export const recentCheckIn: CheckIn = {
  id: 'checkin-1',
  userId: 'user-1',
  reflection: {
    id: 'reflection-1',
    checkInId: 'checkin-1',
    personalWhat: 'Had a meaningful conversation with my daughter about her career aspirations',
    personalFeeling: 'Felt deeply connected and reminded of what matters most',
    professionalWhat: 'Successfully navigated a difficult board meeting with a challenging stakeholder',
    professionalFeeling: 'Proud of maintaining composure, though still processing some tension',
    forumChallenge: 'The balance between being supportive and setting boundaries with underperforming team members',
    createdAt: new Date('2024-03-25'),
  },
  goalUpdates: [
    {
      id: 'gu-1',
      goalId: 'goal-1',
      checkInId: 'checkin-1',
      status: 'full-speed',
      whatIDid: 'Documented decision rights for top 3 VPs',
      whatHelped: 'Clear framework from leadership workshop',
      whatHindered: 'Time constraints during quarter-end',
      createdAt: new Date('2024-03-25'),
    },
  ],
  otherThoughts: {
    id: 'thoughts-1',
    checkInId: 'checkin-1',
    potentialChallenge: 'Managing expectations during organizational restructuring',
    potentialChallengeShared: false,
    insight: 'Realized that my resistance to delegation stems from fear of losing relevance',
    insightShared: true,
    resource: 'The Art of Possibility by Rosamund Stone Zander',
    resourceShared: true,
    createdAt: new Date('2024-03-25'),
  },
  completedAt: new Date('2024-03-25'),
  durationSeconds: 498,
}

export const upcomingMeeting: Meeting = {
  id: 'meeting-1',
  forumGroupId: 'group-1',
  title: 'Monthly Forum Meeting',
  scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  location: 'Virtual - Zoom',
  notes: 'Focus on Q1 reflections and goal realignment',
}

export const feedItems: FeedItem[] = [
  {
    id: 'feed-1',
    type: 'goal-update',
    userId: 'user-2',
    userName: 'Michael Torres',
    title: 'Expand leadership team capabilities',
    content: 'Made significant progress this week. Completed 360 feedback sessions with all direct reports.',
    goalStatus: 'full-speed',
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        targetType: 'goal',
        targetId: 'feed-1',
        content: 'Great progress, Michael! How did your team respond to the feedback process?',
        createdAt: new Date('2024-03-24'),
      },
    ],
    createdAt: new Date('2024-03-24'),
  },
  {
    id: 'feed-2',
    type: 'insight',
    userId: 'user-3',
    userName: 'Sarah Williams',
    title: 'Insight',
    content: 'Discovered that my need for control in meetings was actually limiting the creativity of my team. Experimenting with facilitated discussions instead.',
    comments: [],
    createdAt: new Date('2024-03-23'),
  },
  {
    id: 'feed-3',
    type: 'resource',
    userId: 'user-4',
    userName: 'David Park',
    title: 'Resource',
    content: 'Highly recommend "Leadership and Self-Deception" by The Arbinger Institute. It changed how I approach difficult conversations.',
    comments: [
      {
        id: 'comment-2',
        userId: 'user-1',
        targetType: 'resource',
        targetId: 'feed-3',
        content: 'Added to my reading list. Thank you for sharing!',
        createdAt: new Date('2024-03-23'),
      },
    ],
    createdAt: new Date('2024-03-22'),
  },
  {
    id: 'feed-4',
    type: 'goal-update',
    userId: 'user-5',
    userName: 'Emma Richardson',
    title: 'Build strategic partnerships',
    content: 'Slow progress this period. Had initial conversations with two potential partners but struggled to find alignment on values.',
    goalStatus: 'slow-progress',
    comments: [],
    createdAt: new Date('2024-03-21'),
  },
  {
    id: 'feed-5',
    type: 'challenge',
    userId: 'user-2',
    userName: 'Michael Torres',
    title: 'Challenge to Explore',
    content: 'Navigating the tension between scaling quickly and maintaining company culture. Would value Forum perspectives.',
    comments: [
      {
        id: 'comment-3',
        userId: 'user-5',
        targetType: 'challenge',
        targetId: 'feed-5',
        content: 'I faced something similar. Happy to share what worked for us.',
        createdAt: new Date('2024-03-20'),
      },
    ],
    createdAt: new Date('2024-03-20'),
  },
]

export const comments: Comment[] = feedItems.flatMap(item => item.comments)

// Helper to get next check-in date (every 5 days)
export function getNextCheckInDate(): Date {
  const lastCheckIn = recentCheckIn.completedAt
  const nextDate = new Date(lastCheckIn)
  nextDate.setDate(nextDate.getDate() + 5)
  return nextDate
}

// Helper to check if check-in is due
export function isCheckInDue(): boolean {
  const now = new Date()
  const nextCheckIn = getNextCheckInDate()
  return now >= nextCheckIn
}

// Helper to get days until next check-in
export function getDaysUntilCheckIn(): number {
  const now = new Date()
  const nextCheckIn = getNextCheckInDate()
  const diffTime = nextCheckIn.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

// Helper to get days until meeting
export function getDaysUntilMeeting(): number {
  const now = new Date()
  const diffTime = upcomingMeeting.scheduledAt.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}
