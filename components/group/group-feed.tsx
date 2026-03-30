'use client'

import { useState } from 'react'
import { useApp } from '@/lib/app-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  Shield, 
  Target, 
  Lightbulb, 
  BookOpen, 
  HelpCircle,
  MessageCircle,
  Send,
  Zap,
  TrendingDown,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FeedItem, FeedItemType, GoalStatus } from '@/lib/types'

const typeConfig: Record<FeedItemType, { icon: typeof Target; label: string; className: string; bgClassName: string }> = {
  'goal-update': {
    icon: Target,
    label: 'Goal Update',
    className: 'text-primary',
    bgClassName: 'bg-primary/10',
  },
  'insight': {
    icon: Lightbulb,
    label: 'Insight',
    className: 'text-warning-foreground',
    bgClassName: 'bg-warning/10',
  },
  'resource': {
    icon: BookOpen,
    label: 'Resource',
    className: 'text-info',
    bgClassName: 'bg-info/10',
  },
  'challenge': {
    icon: HelpCircle,
    label: 'Challenge',
    className: 'text-accent',
    bgClassName: 'bg-accent/10',
  },
}

const statusConfig: Record<GoalStatus, { label: string; icon: typeof Zap; className: string }> = {
  'full-speed': { label: 'Full Speed', icon: Zap, className: 'text-success bg-success/10' },
  'slow-progress': { label: 'Slow Progress', icon: TrendingDown, className: 'text-warning-foreground bg-warning/10' },
  'no-progress': { label: 'No Progress', icon: Minus, className: 'text-muted-foreground bg-muted' },
}

export function GroupFeed() {
  const { feedItems, forumGroup, user, addComment } = useApp()

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent text-accent-foreground">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                Group Feed
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {forumGroup.name}
              </p>
            </div>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <Card className="mb-6 bg-primary/5 border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="text-foreground font-medium">This feed is private to your Forum group</p>
                <p className="text-muted-foreground mt-1">
                  Only members of {forumGroup.name} can see these updates. Please keep discussions respectful and confidential.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed */}
        <div className="space-y-4">
          {feedItems.map((item) => (
            <FeedItemCard 
              key={item.id} 
              item={item} 
              currentUserId={user.id}
              onAddComment={(content) => addComment(item.id, content)}
            />
          ))}
        </div>

        {feedItems.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="font-medium text-foreground mb-1">No updates yet</h3>
              <p className="text-sm text-muted-foreground">
                Shared goals, insights, and resources from your Forum group will appear here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function FeedItemCard({ 
  item, 
  currentUserId,
  onAddComment 
}: { 
  item: FeedItem
  currentUserId: string
  onAddComment: (content: string) => void 
}) {
  const [showComments, setShowComments] = useState(item.comments.length > 0)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const config = typeConfig[item.type]
  const Icon = config.icon

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    setIsSubmitting(true)
    onAddComment(newComment.trim())
    setNewComment('')
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-foreground shrink-0">
            {item.userName.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-foreground">{item.userName}</span>
              <span className="text-xs text-muted-foreground">{formatDate(item.createdAt)}</span>
            </div>

            {/* Type Badge */}
            <div className="flex items-center gap-2 mt-1">
              <span className={cn(
                'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium',
                config.bgClassName,
                config.className
              )}>
                <Icon className="w-3 h-3" />
                {config.label}
              </span>
              
              {item.goalStatus && (
                <StatusBadge status={item.goalStatus} />
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Content */}
        {item.type === 'goal-update' && (
          <p className="font-medium text-foreground mb-2">{item.title}</p>
        )}
        <p className="text-sm text-muted-foreground">{item.content}</p>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {item.comments.length > 0 
            ? `${item.comments.length} comment${item.comments.length !== 1 ? 's' : ''}`
            : 'Add a comment'
          }
        </button>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border">
            {/* Existing Comments */}
            {item.comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {item.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                      {comment.userId === currentUserId ? 'You' : 'M'}
                    </div>
                    <div className="flex-1 p-2 rounded-lg bg-muted/50">
                      <p className="text-sm text-foreground">{comment.content}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* New Comment Form */}
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                You
              </div>
              <div className="flex-1 flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a supportive comment..."
                  className="min-h-[60px] resize-none flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="shrink-0 self-end"
                >
                  <Send className="w-4 h-4" />
                  <span className="sr-only">Send comment</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: GoalStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon
  
  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
      config.className
    )}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}
