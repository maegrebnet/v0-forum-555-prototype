'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Check, Lock, Users, Target, Lightbulb, HelpCircle, BookOpen, Zap, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Goal, GoalStatus } from '@/lib/types'
import type { ReflectionData, GoalUpdateData, ThoughtsData } from './check-in-flow'

interface Step4ReviewProps {
  reflection: ReflectionData
  goalUpdates: GoalUpdateData[]
  thoughts: ThoughtsData
  goals: Goal[]
  onBack: () => void
  onSubmit: () => void
  onEditThoughts: (thoughts: ThoughtsData) => void
}

const statusConfig: Record<GoalStatus, { label: string; icon: typeof Zap; className: string }> = {
  'full-speed': { label: 'Full Speed', icon: Zap, className: 'text-success' },
  'slow-progress': { label: 'Slow Progress', icon: TrendingDown, className: 'text-warning-foreground' },
  'no-progress': { label: 'No Progress', icon: Minus, className: 'text-muted-foreground' },
}

export function Step4Review({ 
  reflection, 
  goalUpdates, 
  thoughts, 
  goals,
  onBack, 
  onSubmit,
  onEditThoughts 
}: Step4ReviewProps) {
  const getGoal = (goalId: string) => goals.find(g => g.id === goalId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
          Review Your Check-in
        </h2>
        <p className="mt-2 text-muted-foreground">
          Confirm what stays private and what you&apos;d like to share with your Forum group.
        </p>
      </div>

      {/* Private Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Lock className="w-4 h-4 text-muted-foreground" />
          Private to You
        </div>

        <Card className="bg-muted/30 border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">5% Reflection</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3 text-sm">
            {reflection.personalWhat && (
              <div>
                <span className="text-muted-foreground">Personal: </span>
                <span className="text-foreground">{reflection.personalWhat}</span>
              </div>
            )}
            {reflection.professionalWhat && (
              <div>
                <span className="text-muted-foreground">Professional: </span>
                <span className="text-foreground">{reflection.professionalWhat}</span>
              </div>
            )}
            {reflection.forumChallenge && (
              <div>
                <span className="text-muted-foreground">Forum Topic: </span>
                <span className="text-foreground">{reflection.forumChallenge}</span>
              </div>
            )}
            {!reflection.personalWhat && !reflection.professionalWhat && !reflection.forumChallenge && (
              <p className="text-muted-foreground italic">No reflection entries</p>
            )}
          </CardContent>
        </Card>

        {/* Private Thoughts */}
        {(thoughts.potentialChallenge && !thoughts.potentialChallengeShared) ||
         (thoughts.insight && !thoughts.insightShared) ||
         (thoughts.resource && !thoughts.resourceShared) ? (
          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Private Thoughts</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 text-sm">
              {thoughts.potentialChallenge && !thoughts.potentialChallengeShared && (
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground">{thoughts.potentialChallenge}</span>
                </div>
              )}
              {thoughts.insight && !thoughts.insightShared && (
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-warning-foreground mt-0.5 shrink-0" />
                  <span className="text-foreground">{thoughts.insight}</span>
                </div>
              )}
              {thoughts.resource && !thoughts.resourceShared && (
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-info mt-0.5 shrink-0" />
                  <span className="text-foreground">{thoughts.resource}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}
      </div>

      {/* Shared Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Users className="w-4 h-4 text-primary" />
          Shared with Forum Group
        </div>

        {/* Goals */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {goalUpdates.map((update) => {
                const goal = getGoal(update.goalId)
                if (!goal) return null
                const status = statusConfig[update.status]
                const Icon = status.icon

                return (
                  <div key={update.goalId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
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

        {/* Shared Thoughts */}
        {(thoughts.potentialChallenge && thoughts.potentialChallengeShared) ||
         (thoughts.insight && thoughts.insightShared) ||
         (thoughts.resource && thoughts.resourceShared) ? (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Shared Thoughts</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {thoughts.potentialChallenge && thoughts.potentialChallengeShared && (
                <ShareableItem
                  icon={HelpCircle}
                  iconClassName="text-accent"
                  label="Challenge"
                  content={thoughts.potentialChallenge}
                  isShared={thoughts.potentialChallengeShared}
                  onToggle={(value) => onEditThoughts({ ...thoughts, potentialChallengeShared: value })}
                />
              )}
              {thoughts.insight && thoughts.insightShared && (
                <ShareableItem
                  icon={Lightbulb}
                  iconClassName="text-warning-foreground"
                  label="Insight"
                  content={thoughts.insight}
                  isShared={thoughts.insightShared}
                  onToggle={(value) => onEditThoughts({ ...thoughts, insightShared: value })}
                />
              )}
              {thoughts.resource && thoughts.resourceShared && (
                <ShareableItem
                  icon={BookOpen}
                  iconClassName="text-info"
                  label="Resource"
                  content={thoughts.resource}
                  isShared={thoughts.resourceShared}
                  onToggle={(value) => onEditThoughts({ ...thoughts, resourceShared: value })}
                />
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-6 text-center">
              <p className="text-sm text-muted-foreground">
                No additional thoughts shared with your Forum group
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onSubmit} className="px-8">
          <Check className="w-4 h-4 mr-2" />
          Complete Check-in
        </Button>
      </div>
    </div>
  )
}

function ShareableItem({
  icon: Icon,
  iconClassName,
  label,
  content,
  isShared,
  onToggle,
}: {
  icon: typeof HelpCircle
  iconClassName: string
  label: string
  content: string
  isShared: boolean
  onToggle: (value: boolean) => void
}) {
  return (
    <div className="p-3 rounded-lg bg-muted/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2 flex-1">
          <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', iconClassName)} />
          <div>
            <span className="text-xs text-muted-foreground">{label}</span>
            <p className="text-sm text-foreground mt-0.5">{content}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">Share</span>
          <Switch checked={isShared} onCheckedChange={onToggle} />
        </div>
      </div>
    </div>
  )
}
