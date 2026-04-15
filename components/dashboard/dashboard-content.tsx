'use client'

import { useApp } from '@/lib/app-context'
import { getDaysUntilCheckIn, getDaysUntilMeeting, isCheckInDue } from '@/lib/mock-data'
import { WelcomeHeader } from './welcome-header'
import { CheckInCard } from './check-in-card'
import { MeetingCard } from './meeting-card'
import { GoalsOverview } from './goals-overview'
import { RecentInsights } from './recent-insights'
import { ConfidentialityBanner } from './confidentiality-banner'

export function DashboardContent() {
  const { user, goals, upcomingMeeting } = useApp()
  const daysUntilCheckIn = getDaysUntilCheckIn()
  const daysUntilMeeting = getDaysUntilMeeting()
  const checkInDue = isCheckInDue()

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Welcome Header */}
        <WelcomeHeader userName={user.name.split(' ')[0]} />

        {/* Confidentiality Banner */}
        <ConfidentialityBanner />

        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <CheckInCard 
            daysUntil={daysUntilCheckIn} 
            isDue={checkInDue} 
          />
          <MeetingCard 
            meeting={upcomingMeeting} 
            daysUntil={daysUntilMeeting} 
          />
        </div>

        {/* Goals Overview */}
        <GoalsOverview goals={goals} />

        {/* Recent Insights - Full Width */}
        <div className="mt-8">
          <RecentInsights />
        </div>
      </div>
    </div>
  )
}
