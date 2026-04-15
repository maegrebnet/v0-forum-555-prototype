'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Timer, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 800))
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <span className="font-serif font-semibold text-lg">5</span>
          </div>
          <div>
            <h1 className="font-serif font-semibold text-lg text-foreground">Forum 555</h1>
            <p className="text-xs text-muted-foreground">Executive Check-in</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground">
              Sign in to continue to your Forum space
            </p>
          </div>

          {/* Sign In Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Sign in</CardTitle>
              <CardDescription>
                Enter your email to access your private Forum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  By continuing, you agree to Forum 555&apos;s Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
              <Timer className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">555 Check-ins</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Structured reflection every 5 days
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
              <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Confidential</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  End-to-end encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Trust Message */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Forum 555 is a confidential space for peer support and executive growth
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center">
        <p className="text-xs text-muted-foreground">
          A private executive check-in experience
        </p>
      </footer>
    </div>
  )
}
