'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Timer, Target, Lightbulb, Eye, ArrowRight } from 'lucide-react'

interface CheckInIntroProps {
  onStart: () => void
}

const steps = [
  {
    icon: Lightbulb,
    title: '5% Reflection',
    description: 'Capture the most meaningful moments from the past 5 days',
  },
  {
    icon: Target,
    title: 'Goal Progress',
    description: 'Update status and notes for each of your 5 goals',
  },
  {
    icon: Lightbulb,
    title: 'Other Thoughts',
    description: 'Record challenges, insights, and resources',
  },
  {
    icon: Eye,
    title: 'Review & Share',
    description: 'Choose what to keep private and what to share',
  },
]

export function CheckInIntro({ onStart }: CheckInIntroProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-6">
          <Timer className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
          555 Executive Check-in
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Take 555 seconds to pause, reflect on your meaningful 5%, and track progress toward your goals.
        </p>
      </div>

      {/* Steps Preview */}
      <Card>
        <CardContent className="p-6">
          <h2 className="font-medium text-foreground mb-4">What you&apos;ll do:</h2>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted text-muted-foreground shrink-0">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary" />
                      <h3 className="font-medium text-foreground text-sm">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Timer Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-6">
          A gentle timer will guide you through all four steps.
          <br />
          Take your time — the timer is a guide, not a limit.
        </p>
        
        <Button onClick={onStart} size="lg" className="px-8">
          Begin Check-in
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
