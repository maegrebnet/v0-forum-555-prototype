'use client'

import { useState, useEffect, useCallback } from 'react'
import { useApp } from '@/lib/app-context'
import { CheckInIntro } from './check-in-intro'
import { Step1Reflection } from './step-1-reflection'
import { Step2Goals } from './step-2-goals'
import { Step3Thoughts } from './step-3-thoughts'
import { Step4Review } from './step-4-review'
import { CheckInComplete } from './check-in-complete'
import type { GoalStatus } from '@/lib/types'

export interface ReflectionData {
  personalWhat: string
  personalFeeling: string
  professionalWhat: string
  professionalFeeling: string
  forumChallenge: string
}

export interface GoalUpdateData {
  goalId: string
  status: GoalStatus
  whatIDid: string
  whatHelped: string
  whatHindered: string
}

export interface ThoughtsData {
  potentialChallenge: string
  potentialChallengeShared: boolean
  insight: string
  insightShared: boolean
  resource: string
  resourceShared: boolean
}

type Step = 'intro' | 'reflection' | 'goals' | 'thoughts' | 'review' | 'complete'

const TOTAL_SECONDS = 555

export function CheckInFlow() {
  const { goals } = useApp()
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  
  const [reflectionData, setReflectionData] = useState<ReflectionData>({
    personalWhat: '',
    personalFeeling: '',
    professionalWhat: '',
    professionalFeeling: '',
    forumChallenge: '',
  })

  const [goalUpdates, setGoalUpdates] = useState<GoalUpdateData[]>(
    goals.map(goal => ({
      goalId: goal.id,
      status: goal.status,
      whatIDid: '',
      whatHelped: '',
      whatHindered: '',
    }))
  )

  const [thoughtsData, setThoughtsData] = useState<ThoughtsData>({
    potentialChallenge: '',
    potentialChallengeShared: false,
    insight: '',
    insightShared: false,
    resource: '',
    resourceShared: false,
  })

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && elapsedSeconds < TOTAL_SECONDS) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => Math.min(prev + 1, TOTAL_SECONDS))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, elapsedSeconds])

  const startCheckIn = useCallback(() => {
    setTimerActive(true)
    setCurrentStep('reflection')
  }, [])

  const goToStep = useCallback((step: Step) => {
    setCurrentStep(step)
  }, [])

  const completeCheckIn = useCallback(() => {
    setTimerActive(false)
    setCurrentStep('complete')
  }, [])

  const stepNumber = 
    currentStep === 'reflection' ? 1 :
    currentStep === 'goals' ? 2 :
    currentStep === 'thoughts' ? 3 :
    currentStep === 'review' ? 4 : 0

  const progress = (elapsedSeconds / TOTAL_SECONDS) * 100

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
        {currentStep === 'intro' && (
          <CheckInIntro onStart={startCheckIn} />
        )}

        {currentStep !== 'intro' && currentStep !== 'complete' && (
          <div className="mb-8">
            {/* Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Step {stepNumber} of 4</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-mono">{formatTime(elapsedSeconds)}</span>
                <span>/</span>
                <span className="font-mono">{formatTime(TOTAL_SECONDS)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="flex justify-between mt-3">
              {['5% Reflection', 'Goal Progress', 'Other Thoughts', 'Review'].map((label, index) => (
                <button
                  key={label}
                  onClick={() => {
                    const steps: Step[] = ['reflection', 'goals', 'thoughts', 'review']
                    goToStep(steps[index])
                  }}
                  className={`text-xs transition-colors ${
                    index + 1 === stepNumber 
                      ? 'text-primary font-medium' 
                      : index + 1 < stepNumber
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'reflection' && (
          <Step1Reflection
            data={reflectionData}
            onChange={setReflectionData}
            onNext={() => goToStep('goals')}
          />
        )}

        {currentStep === 'goals' && (
          <Step2Goals
            goals={goals}
            updates={goalUpdates}
            onChange={setGoalUpdates}
            onBack={() => goToStep('reflection')}
            onNext={() => goToStep('thoughts')}
          />
        )}

        {currentStep === 'thoughts' && (
          <Step3Thoughts
            data={thoughtsData}
            onChange={setThoughtsData}
            onBack={() => goToStep('goals')}
            onNext={() => goToStep('review')}
          />
        )}

        {currentStep === 'review' && (
          <Step4Review
            reflection={reflectionData}
            goalUpdates={goalUpdates}
            thoughts={thoughtsData}
            goals={goals}
            onBack={() => goToStep('thoughts')}
            onSubmit={completeCheckIn}
            onEditThoughts={(updates) => setThoughtsData(updates)}
          />
        )}

        {currentStep === 'complete' && (
          <CheckInComplete 
            elapsedSeconds={elapsedSeconds}
          />
        )}
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
