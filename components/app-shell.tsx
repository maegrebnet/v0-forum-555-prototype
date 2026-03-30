'use client'

import { Navigation } from './navigation'
import { AppProvider } from '@/lib/app-context'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className={cn(
          'lg:pl-64 pb-20 lg:pb-0 pt-16 lg:pt-0',
          className
        )}>
          {children}
        </main>
      </div>
    </AppProvider>
  )
}
