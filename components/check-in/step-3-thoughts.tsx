'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, ArrowRight, Lock, Users, HelpCircle, Lightbulb, BookOpen } from 'lucide-react'
import type { ThoughtsData } from './check-in-flow'

interface Step3ThoughtsProps {
  data: ThoughtsData
  onChange: (data: ThoughtsData) => void
  onBack: () => void
  onNext: () => void
}

export function Step3Thoughts({ data, onChange, onBack, onNext }: Step3ThoughtsProps) {
  const updateField = <K extends keyof ThoughtsData>(field: K, value: ThoughtsData[K]) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
          Other Thoughts
        </h2>
        <p className="mt-2 text-muted-foreground">
          Capture challenges, insights, or resources. Each section is private by default.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" />
          Toggle sharing for anything you&apos;d like to share
        </div>
      </div>

      {/* Potential Challenge */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              Potential Challenge to Explore
            </CardTitle>
            <ShareToggle
              isShared={data.potentialChallengeShared}
              onToggle={(value) => updateField('potentialChallengeShared', value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="challenge" className="text-sm text-foreground">
              Is there a challenge you might want to bring to Forum?
            </Label>
            <Textarea
              id="challenge"
              placeholder="A decision you're wrestling with, a pattern you've noticed, something you'd value peer input on..."
              value={data.potentialChallenge}
              onChange={(e) => updateField('potentialChallenge', e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Insight */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning-foreground" />
              Insight or Lesson
            </CardTitle>
            <ShareToggle
              isShared={data.insightShared}
              onToggle={(value) => updateField('insightShared', value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="insight" className="text-sm text-foreground">
              What did you learn or realize this period?
            </Label>
            <Textarea
              id="insight"
              placeholder="A realization about yourself, your leadership, or your approach to challenges..."
              value={data.insight}
              onChange={(e) => updateField('insight', e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resource */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-info" />
              Resource to Share
            </CardTitle>
            <ShareToggle
              isShared={data.resourceShared}
              onToggle={(value) => updateField('resourceShared', value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="resource" className="text-sm text-foreground">
              A book, article, podcast, or tool you&apos;d recommend?
            </Label>
            <Textarea
              id="resource"
              placeholder="Something valuable you've discovered that might help others..."
              value={data.resource}
              onChange={(e) => updateField('resource', e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} className="px-6">
          Review
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

function ShareToggle({ isShared, onToggle }: { isShared: boolean; onToggle: (value: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      {isShared ? (
        <span className="text-xs text-primary flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          Shared
        </span>
      ) : (
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Lock className="w-3.5 h-3.5" />
          Private
        </span>
      )}
      <Switch
        checked={isShared}
        onCheckedChange={onToggle}
        aria-label="Toggle sharing"
      />
    </div>
  )
}
