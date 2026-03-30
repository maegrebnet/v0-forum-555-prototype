'use client'

import { Shield } from 'lucide-react'

export function ConfidentialityBanner() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 mt-6 rounded-lg bg-primary/5 border border-primary/10">
      <Shield className="w-5 h-5 text-primary shrink-0" />
      <p className="text-sm text-foreground">
        <span className="font-medium">Your space is confidential.</span>{' '}
        <span className="text-muted-foreground">
          Reflections remain private unless you choose to share them with your Forum group.
        </span>
      </p>
    </div>
  )
}
