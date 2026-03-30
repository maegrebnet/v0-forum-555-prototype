'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Lock, Calendar } from 'lucide-react'
import { recentCheckIn } from '@/lib/mock-data'

export function RecentInsights() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
            <Lightbulb className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg font-medium">Recent Insights</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Private to you
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* 5% Reflection */}
        <div className="p-4 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(recentCheckIn.completedAt)}
            <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium">5% Reflection</span>
          </div>
          <p className="text-sm text-foreground">
            <span className="font-medium">Personal:</span> {recentCheckIn.reflection.personalWhat}
          </p>
          <p className="text-sm text-muted-foreground mt-1 italic">
            {recentCheckIn.reflection.personalFeeling}
          </p>
        </div>

        {/* Latest Insight */}
        {recentCheckIn.otherThoughts.insight && (
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Lightbulb className="w-3.5 h-3.5" />
              Key Insight
            </div>
            <p className="text-sm text-foreground">
              {recentCheckIn.otherThoughts.insight}
            </p>
          </div>
        )}

        {/* Forum Challenge */}
        {recentCheckIn.reflection.forumChallenge && (
          <div className="p-4 rounded-lg border border-dashed border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              Potential Forum Topic
            </div>
            <p className="text-sm text-foreground">
              {recentCheckIn.reflection.forumChallenge}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
