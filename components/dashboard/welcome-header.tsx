'use client'

interface WelcomeHeaderProps {
  userName: string
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="mb-2">
      <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
        {getGreeting()}, {userName}
      </h1>
      <p className="mt-2 text-muted-foreground text-sm md:text-base">
        Take a moment to pause, reflect, and prepare for meaningful exchange.
      </p>
    </div>
  )
}
