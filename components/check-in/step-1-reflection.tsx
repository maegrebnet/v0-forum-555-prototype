'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowRight, Lock } from 'lucide-react'
import type { ReflectionData } from './check-in-flow'

interface Step1ReflectionProps {
  data: ReflectionData
  onChange: (data: ReflectionData) => void
  onNext: () => void
}

export function Step1Reflection({ data, onChange, onNext }: Step1ReflectionProps) {
  const updateField = (field: keyof ReflectionData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
          The Meaningful 5%
        </h2>
        <p className="mt-2 text-muted-foreground">
          What stood out from the last 5 days? Focus on moments that mattered.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" />
          This section stays private unless you choose to share
        </div>
      </div>

      {/* Personal Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold">P</span>
            Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personal-what" className="text-sm text-foreground">
              What happened?
            </Label>
            <Textarea
              id="personal-what"
              placeholder="A meaningful conversation, a moment of clarity, an unexpected connection..."
              value={data.personalWhat}
              onChange={(e) => updateField('personalWhat', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personal-feeling" className="text-sm text-foreground">
              How did it feel? (Impact + Emotions)
            </Label>
            <Textarea
              id="personal-feeling"
              placeholder="What emotions came up? What impact did this have on you?"
              value={data.personalFeeling}
              onChange={(e) => updateField('personalFeeling', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Section */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-semibold">W</span>
            Professional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="professional-what" className="text-sm text-foreground">
              What happened?
            </Label>
            <Textarea
              id="professional-what"
              placeholder="A breakthrough moment, a difficult decision, a leadership insight..."
              value={data.professionalWhat}
              onChange={(e) => updateField('professionalWhat', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="professional-feeling" className="text-sm text-foreground">
              How did it feel? (Impact + Emotions)
            </Label>
            <Textarea
              id="professional-feeling"
              placeholder="What emotions came up? What impact did this have on your work?"
              value={data.professionalFeeling}
              onChange={(e) => updateField('professionalFeeling', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Forum Challenge */}
      <Card className="border-dashed">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">
            Forum Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="forum-challenge" className="text-sm text-foreground">
              Which moments point to an important or urgent challenge to explore with Forum?
            </Label>
            <Textarea
              id="forum-challenge"
              placeholder="Is there something you'd benefit from discussing?"
              value={data.forumChallenge}
              onChange={(e) => updateField('forumChallenge', e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="px-6">
          Continue to Goals
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
