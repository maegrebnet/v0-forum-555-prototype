'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Home, Users, Calendar } from 'lucide-react'

interface CheckInCompleteProps {
  elapsedSeconds: number
}

export function CheckInComplete({ elapsedSeconds }: CheckInCompleteProps) {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return (
    <div className="text-center space-y-8">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-success text-success-foreground">
          <Check className="w-7 h-7" />
        </div>
      </div>

      {/* Message */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
          Check-in Complete
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Well done. You&apos;ve taken time to pause, reflect, and prepare for meaningful exchange.
        </p>
      </div>

      {/* Stats Card */}
      <Card className="max-w-sm mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Time invested in reflection</p>
            <p className="text-3xl font-serif font-semibold text-foreground mt-1">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quote */}
      <div className="max-w-md mx-auto px-4">
        <blockquote className="text-sm text-muted-foreground italic">
          &quot;The unexamined life is not worth living.&quot;
          <footer className="mt-2 text-xs not-italic">— Socrates</footer>
        </blockquote>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/group" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            View Group Feed
          </Link>
        </Button>
        <Button asChild>
          <Link href="/summary" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Prepare for Meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}
