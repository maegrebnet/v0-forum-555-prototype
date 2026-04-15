'use client'

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Target, 
  Users, 
  Pencil, 
  Check, 
  X, 
  GripVertical,
  Zap,
  TrendingDown,
  Minus,
  Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Goal, GoalStatus } from '@/lib/types'

const statusConfig: Record<GoalStatus, { label: string; icon: typeof Zap; className: string }> = {
  'full-speed': {
    label: 'Full Speed',
    icon: Zap,
    className: 'bg-success/10 text-success border-success/20',
  },
  'slow-progress': {
    label: 'Slow Progress',
    icon: TrendingDown,
    className: 'bg-warning/10 text-warning-foreground border-warning/20',
  },
  'no-progress': {
    label: 'No Progress',
    icon: Minus,
    className: 'bg-muted text-muted-foreground border-border',
  },
}

export function GoalsEditor() {
  const { goals, updateGoal } = useApp()
  const [editingGoal, setEditingGoal] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<{ title: string; description: string }>({ title: '', description: '' })

  const sortedGoals = [...goals].sort((a, b) => a.order - b.order)

  const startEditing = (goal: Goal) => {
    setEditingGoal(goal.id)
    setEditForm({ title: goal.title, description: goal.description || '' })
  }

  const saveEdit = () => {
    if (editingGoal && editForm.title.trim()) {
      updateGoal(editingGoal, { 
        title: editForm.title.trim(), 
        description: editForm.description.trim() 
      })
      setEditingGoal(null)
    }
  }

  const cancelEdit = () => {
    setEditingGoal(null)
    setEditForm({ title: '', description: '' })
  }

  const updateStatus = (goalId: string, status: GoalStatus) => {
    updateGoal(goalId, { status })
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Your 5 Goals
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Users className="w-4 h-4" />
                Shared by default
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-primary/5 border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="text-foreground font-medium">Your goals are shared</p>
                <p className="text-muted-foreground mt-1">
                  This transparency supports accountability and meaningful exchange. You can edit your goals anytime.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals List */}
        <div className="space-y-4">
          {sortedGoals.map((goal, index) => {
            const isEditing = editingGoal === goal.id
            const status = statusConfig[goal.status]
            const StatusIcon = status.icon

            return (
              <Card key={goal.id} className={isEditing ? 'ring-2 ring-primary' : ''}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab" />
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor={`title-${goal.id}`} className="text-sm">Goal Title</Label>
                            <Input
                              id={`title-${goal.id}`}
                              value={editForm.title}
                              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Enter your goal..."
                              autoFocus
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`desc-${goal.id}`} className="text-sm">Description (optional)</Label>
                            <Textarea
                              id={`desc-${goal.id}`}
                              value={editForm.description}
                              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Add more detail about this goal..."
                              className="min-h-[80px] resize-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <CardTitle className="text-base font-medium text-foreground">
                            {goal.title}
                          </CardTitle>
                          {goal.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {goal.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {!isEditing && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(goal)}
                        className="shrink-0"
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="sr-only">Edit goal</span>
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {isEditing ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" onClick={saveEdit} disabled={!editForm.title.trim()}>
                        <Check className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={cancelEdit}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground mr-1">Status:</span>
                      {Object.entries(statusConfig).map(([key, config]) => {
                        const Icon = config.icon
                        const isSelected = goal.status === key
                        return (
                          <button
                            key={key}
                            onClick={() => updateStatus(goal.id, key as GoalStatus)}
                            className={cn(
                              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all',
                              isSelected
                                ? config.className
                                : 'border-transparent text-muted-foreground hover:bg-muted'
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {config.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Focus on 5 meaningful goals that you want to work toward with the support of your Forum.
          </p>
        </div>
      </div>
    </div>
  )
}
