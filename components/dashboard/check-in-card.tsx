'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Timer, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckInCardProps {
  daysUntil: number
  isDue: boolean
}

export function CheckInCard({ daysUntil, isDue }: CheckInCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all',
      isDue 
        ? 'border-primary/30 bg-primary/5' 
        : 'border-border'
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center justify-center w-12 h-12 rounded-xl',
              isDue ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}>
              <Timer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">555 Check-in</h3>
              <p className="text-sm text-muted-foreground">
                {isDue 
                  ? 'Your check-in is ready' 
                  : `Due in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {isDue
            ? 'Take 555 seconds to reflect on your meaningful 5% and track progress on your goals.'
            : 'Your next executive check-in will help you stay focused on what matters most.'
          }
        </p>

        <div className="mt-5">
          <Button asChild variant={isDue ? 'default' : 'outline'} className="w-full sm:w-auto">
            <Link href="/check-in" className="flex items-center gap-2">
              {isDue ? 'Start Check-in' : 'View Check-in'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
