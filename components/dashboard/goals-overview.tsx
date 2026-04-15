'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Goal, GoalStatus } from '@/lib/types'

interface GoalsOverviewProps {
  goals: Goal[]
}

const statusConfig: Record<GoalStatus, { label: string; className: string }> = {
  'full-speed': {
    label: 'Full Speed',
    className: 'bg-success/10 text-success border-success/20',
  },
  'slow-progress': {
    label: 'Slow Progress',
    className: 'bg-warning/10 text-warning-foreground border-warning/20',
  },
  'no-progress': {
    label: 'No Progress',
    className: 'bg-muted text-muted-foreground border-border',
  },
}

export function GoalsOverview({ goals }: GoalsOverviewProps) {
  const sortedGoals = [...goals].sort((a, b) => a.order - b.order)

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
            <Target className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium">Your 5 Goals</CardTitle>
            <p className="text-sm text-muted-foreground">
              Track your progress
            </p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
          <Link href="/goals" className="flex items-center gap-1">
            Edit Goals
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {sortedGoals.map((goal, index) => {
            const status = statusConfig[goal.status]
            return (
              <div
                key={goal.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background text-xs font-medium text-muted-foreground border border-border">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{goal.title}</p>
                </div>
                <span className={cn(
                  'shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border',
                  status.className
                )}>
                  {status.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-4 sm:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/goals" className="flex items-center gap-2">
              Edit Goals
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
