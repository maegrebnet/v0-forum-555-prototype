'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ArrowRight, MessageCircle, Target, Lightbulb, BookOpen, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FeedItem, FeedItemType, GoalStatus } from '@/lib/types'

interface GroupUpdatesProps {
  feedItems: FeedItem[]
}

const typeConfig: Record<FeedItemType, { icon: typeof Target; label: string; className: string }> = {
  'goal-update': {
    icon: Target,
    label: 'Goal Update',
    className: 'text-primary',
  },
  'insight': {
    icon: Lightbulb,
    label: 'Insight',
    className: 'text-warning-foreground',
  },
  'resource': {
    icon: BookOpen,
    label: 'Resource',
    className: 'text-info',
  },
  'challenge': {
    icon: HelpCircle,
    label: 'Challenge',
    className: 'text-accent',
  },
}

const statusLabels: Record<GoalStatus, string> = {
  'full-speed': 'Full Speed',
  'slow-progress': 'Slow Progress',
  'no-progress': 'No Progress',
}

export function GroupUpdates({ feedItems }: GroupUpdatesProps) {
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium">Group Updates</CardTitle>
            <p className="text-sm text-muted-foreground">From your Forum</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {feedItems.map((item) => {
          const config = typeConfig[item.type]
          const Icon = config.icon

          return (
            <div key={item.id} className="p-4 rounded-lg bg-muted/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                  {item.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-foreground">{item.userName}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Icon className={cn('w-3.5 h-3.5', config.className)} />
                    <span className="text-xs text-muted-foreground">{config.label}</span>
                    {item.goalStatus && (
                      <span className="text-xs text-muted-foreground">
                        &middot; {statusLabels[item.goalStatus]}
                      </span>
                    )}
                  </div>
                  {item.type === 'goal-update' && (
                    <p className="text-sm font-medium text-foreground mt-2">{item.title}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
                  {item.comments.length > 0 && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {item.comments.length} comment{item.comments.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        <Button asChild variant="outline" className="w-full">
          <Link href="/group" className="flex items-center gap-2">
            View All Updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
