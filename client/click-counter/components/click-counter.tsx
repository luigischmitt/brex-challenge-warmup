"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { getUser, incrementClicks, updateClicks } from "@/lib/api"

export function ClickCounter({
  className,
  username = "User",
  ...props
}: React.ComponentProps<"div"> & { username?: string }) {
  const [clicks, setClicks] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState("")

  // Busca os dados do usuário ao montar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUser(username)
        setClicks(user.clicks)
        setError("")
      } catch (err) {
        console.error("Failed to fetch user data:", err)
        setError("Failed to load user data")
      } finally {
        setIsLoading(false)
      }
    }

    if (username && username !== "User") {
      fetchUserData()
    } else {
      setIsLoading(false)
    }
  }, [username])

  const handleClick = async () => {
    setIsUpdating(true)
    const optimisticClicks = clicks + 1
    setClicks(optimisticClicks)

    try {
      const user = await incrementClicks(username)
      setClicks(user.clicks)
      setError("")
    } catch (err) {
      console.error("Failed to increment clicks:", err)
      setClicks(clicks) // Reverte em caso de erro
      setError("Failed to save click")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleReset = async () => {
    setIsUpdating(true)
    const previousClicks = clicks
    setClicks(0)

    try {
      await updateClicks(username, 0)
      setError("")
    } catch (err) {
      console.error("Failed to reset clicks:", err)
      setClicks(previousClicks) // Reverte em caso de erro
      setError("Failed to reset counter")
    } finally {
      setIsUpdating(false)
    }
  }

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <Image
              src="/brex_icon.png"
              alt="Brex Logo"
              width={60}
              height={60}
              priority
            />
            
            {/* Welcome message */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
              <p className="text-muted-foreground text-balance">
                Click the button below to increase your count
              </p>
            </div>

            {/* Click counter display */}
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-6xl font-bold text-primary">
                {clicks}
              </div>
              <p className="text-sm text-muted-foreground">
                {clicks === 1 ? "click" : "clicks"}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 text-center w-full">
                {error}
              </p>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 w-full">
              <Button 
                onClick={handleClick}
                size="lg"
                className="w-full text-lg py-6"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Click Me!"}
              </Button>
              
              {clicks > 0 && (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="w-full"
                  disabled={isUpdating}
                >
                  Reset Counter
                </Button>
              )}
              
              <Link href="/ranking" className="w-full">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  🏆 View Ranking
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="w-full pt-4 border-t">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>User:</span>
                <span className="font-medium text-foreground">{username}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>Total clicks:</span>
                <span className="font-medium text-foreground">{clicks}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-center text-muted-foreground px-6">
        Your progress will be saved automatically
      </p>
    </div>
  )
}

