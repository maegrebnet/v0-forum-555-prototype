'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import type { Meeting } from '@/lib/types'

interface MeetingCardProps {
  meeting: Meeting
  daysUntil: number
}

export function MeetingCard({ meeting, daysUntil }: MeetingCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const isUpcoming = daysUntil <= 2

  return (
    <Card className={isUpcoming ? 'border-accent/30 bg-accent/5' : ''}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${isUpcoming ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Forum Meeting</h3>
              <p className="text-sm text-muted-foreground">
                {isUpcoming ? 'Coming up soon' : `In ${daysUntil} days`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-foreground">{meeting.title}</p>
          <p className="text-sm text-muted-foreground">{formatDate(meeting.scheduledAt)}</p>
          {meeting.location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              {meeting.location}
            </div>
          )}
        </div>

        <div className="mt-5">
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/summary" className="flex items-center gap-2">
              Prepare Summary
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
