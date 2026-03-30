'use client'

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { recentCheckIn, getDaysUntilMeeting } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  FileText, 
  Calendar, 
  MapPin, 
  Clock,
  Sparkles,
  Target,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Zap,
  TrendingDown,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GoalStatus } from '@/lib/types'

const statusConfig: Record<GoalStatus, { label: string; icon: typeof Zap; className: string }> = {
  'full-speed': { label: 'Full Speed', icon: Zap, className: 'text-success' },
  'slow-progress': { label: 'Slow Progress', icon: TrendingDown, className: 'text-warning-foreground' },
  'no-progress': { label: 'No Progress', icon: Minus, className: 'text-muted-foreground' },
}

export function PreMeetingSummary() {
  const { goals, upcomingMeeting, feedItems } = useApp()
  const [bringToForum, setBringToForum] = useState('')
  const daysUntilMeeting = getDaysUntilMeeting()

  const sortedGoals = [...goals].sort((a, b) => a.order - b.order)
  
  // Count recurring blockers (goals with slow/no progress)
  const blockedGoals = sortedGoals.filter(g => g.status === 'slow-progress' || g.status === 'no-progress')
  
  // Get shared resources from feed
  const sharedResources = feedItems.filter(item => item.type === 'resource').slice(0, 3)

  const formatMeetingDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-accent-foreground">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Pre-meeting Summary
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Review before your Forum meeting
              </p>
            </div>
          </div>
        </div>

        {/* Meeting Info Card */}
        <Card className="mb-6 bg-accent/5 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-foreground">{upcomingMeeting.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatMeetingDate(upcomingMeeting.scheduledAt)}
                </p>
                {upcomingMeeting.location && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {upcomingMeeting.location}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-sm font-medium text-accent">
                  <Clock className="w-4 h-4" />
                  {daysUntilMeeting === 0 ? 'Today' : daysUntilMeeting === 1 ? 'Tomorrow' : `In ${daysUntilMeeting} days`}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent 5% Reflections */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Recent 5% Reflections
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            {recentCheckIn.reflection.personalWhat && (
              <div className="p-3 rounded-lg bg-muted/30">
                <span className="text-xs text-muted-foreground font-medium">Personal</span>
                <p className="text-sm text-foreground mt-1">{recentCheckIn.reflection.personalWhat}</p>
                {recentCheckIn.reflection.personalFeeling && (
                  <p className="text-sm text-muted-foreground mt-1 italic">{recentCheckIn.reflection.personalFeeling}</p>
                )}
              </div>
            )}
            {recentCheckIn.reflection.professionalWhat && (
              <div className="p-3 rounded-lg bg-muted/30">
                <span className="text-xs text-muted-foreground font-medium">Professional</span>
                <p className="text-sm text-foreground mt-1">{recentCheckIn.reflection.professionalWhat}</p>
                {recentCheckIn.reflection.professionalFeeling && (
                  <p className="text-sm text-muted-foreground mt-1 italic">{recentCheckIn.reflection.professionalFeeling}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Goal Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {sortedGoals.map((goal) => {
                const status = statusConfig[goal.status]
                const Icon = status.icon
                return (
                  <div key={goal.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{goal.title}</span>
                    <div className={cn('flex items-center gap-1.5 text-xs font-medium', status.className)}>
                      <Icon className="w-3.5 h-3.5" />
                      {status.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recurring Blockers */}
        {blockedGoals.length > 0 && (
          <Card className="mb-6 border-warning/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning-foreground" />
                Areas Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {blockedGoals.map((goal) => (
                  <div key={goal.id} className="p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <p className="text-sm font-medium text-foreground">{goal.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {goal.status === 'no-progress' 
                        ? 'No progress reported — consider discussing blockers with your Forum'
                        : 'Slow progress — what support might help accelerate?'
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Insights */}
        {recentCheckIn.otherThoughts.insight && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-warning-foreground" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-foreground">{recentCheckIn.otherThoughts.insight}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources Shared */}
        {sharedResources.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-info" />
                Resources Shared
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {sharedResources.map((resource) => (
                  <div key={resource.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span>From {resource.userName}</span>
                    </div>
                    <p className="text-sm text-foreground">{resource.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* What to Bring to Forum */}
        <Card className="mb-6 ring-1 ring-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-primary" />
              What I Want to Bring to Forum Today
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {recentCheckIn.reflection.forumChallenge && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <span className="text-xs text-primary font-medium">From your recent check-in</span>
                  <p className="text-sm text-foreground mt-1">{recentCheckIn.reflection.forumChallenge}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="bring-to-forum" className="text-sm text-muted-foreground">
                  Add or refine your thoughts for today&apos;s meeting:
                </Label>
                <Textarea
                  id="bring-to-forum"
                  value={bringToForum}
                  onChange={(e) => setBringToForum(e.target.value)}
                  placeholder="What question, challenge, or topic would you like to explore with your Forum today?"
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ready Prompt */}
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            You&apos;re prepared. Enter your Forum meeting with intention and openness.
          </p>
          <Button size="lg" className="px-8">
            I&apos;m Ready
          </Button>
        </div>
      </div>
    </div>
  )
}
