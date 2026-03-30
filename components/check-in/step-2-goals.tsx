'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Users, ChevronDown, ChevronUp, Zap, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Goal, GoalStatus } from '@/lib/types'
import type { GoalUpdateData } from './check-in-flow'

interface Step2GoalsProps {
  goals: Goal[]
  updates: GoalUpdateData[]
  onChange: (updates: GoalUpdateData[]) => void
  onBack: () => void
  onNext: () => void
}

const statusOptions: { value: GoalStatus; label: string; icon: typeof Zap; className: string }[] = [
  { 
    value: 'full-speed', 
    label: 'Full Speed', 
    icon: Zap,
    className: 'border-success/50 bg-success/10 text-success hover:border-success' 
  },
  { 
    value: 'slow-progress', 
    label: 'Slow Progress', 
    icon: TrendingDown,
    className: 'border-warning/50 bg-warning/10 text-warning-foreground hover:border-warning' 
  },
  { 
    value: 'no-progress', 
    label: 'No Progress', 
    icon: Minus,
    className: 'border-border bg-muted text-muted-foreground hover:border-muted-foreground' 
  },
]

export function Step2Goals({ goals, updates, onChange, onBack, onNext }: Step2GoalsProps) {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(goals[0]?.id || null)

  const updateGoal = (goalId: string, field: keyof GoalUpdateData, value: string | GoalStatus) => {
    onChange(
      updates.map(update =>
        update.goalId === goalId
          ? { ...update, [field]: value }
          : update
      )
    )
  }

  const getGoalUpdate = (goalId: string) => {
    return updates.find(u => u.goalId === goalId) || {
      goalId,
      status: 'no-progress' as GoalStatus,
      whatIDid: '',
      whatHelped: '',
      whatHindered: '',
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
          Goal Progress
        </h2>
        <p className="mt-2 text-muted-foreground">
          Update the status and capture notes for each of your 5 goals.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-primary">
          <Users className="w-3.5 h-3.5" />
          Goal progress is shared with your Forum group by default
        </div>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => {
          const update = getGoalUpdate(goal.id)
          const isExpanded = expandedGoal === goal.id

          return (
            <Card key={goal.id} className={isExpanded ? 'ring-1 ring-primary/20' : ''}>
              <CardHeader 
                className="pb-3 cursor-pointer"
                onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium text-muted-foreground shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <CardTitle className="text-base font-medium text-foreground">
                        {goal.title}
                      </CardTitle>
                      {!isExpanded && (
                        <div className="mt-2">
                          <StatusBadge status={update.status} />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0 space-y-5">
                  {/* Status Selector */}
                  <div className="space-y-2">
                    <Label className="text-sm text-foreground">Progress Status</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {statusOptions.map((option) => {
                        const Icon = option.icon
                        const isSelected = update.status === option.value
                        return (
                          <button
                            key={option.value}
                            onClick={() => updateGoal(goal.id, 'status', option.value)}
                            className={cn(
                              'flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all',
                              isSelected
                                ? option.className
                                : 'border-border hover:border-muted-foreground/30'
                            )}
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-xs font-medium">{option.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`did-${goal.id}`} className="text-sm text-foreground">
                        What I did
                      </Label>
                      <Textarea
                        id={`did-${goal.id}`}
                        placeholder="Actions you took toward this goal..."
                        value={update.whatIDid}
                        onChange={(e) => updateGoal(goal.id, 'whatIDid', e.target.value)}
                        className="min-h-[60px] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`helped-${goal.id}`} className="text-sm text-foreground">
                        What helped
                      </Label>
                      <Textarea
                        id={`helped-${goal.id}`}
                        placeholder="Resources, people, or circumstances that supported progress..."
                        value={update.whatHelped}
                        onChange={(e) => updateGoal(goal.id, 'whatHelped', e.target.value)}
                        className="min-h-[60px] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`hindered-${goal.id}`} className="text-sm text-foreground">
                        What hindered or stopped me
                      </Label>
                      <Textarea
                        id={`hindered-${goal.id}`}
                        placeholder="Obstacles, blockers, or challenges you faced..."
                        value={update.whatHindered}
                        onChange={(e) => updateGoal(goal.id, 'whatHindered', e.target.value)}
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} className="px-6">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: GoalStatus }) {
  const config = statusOptions.find(s => s.value === status)
  if (!config) return null
  
  const Icon = config.icon
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
      config.className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  )
}
