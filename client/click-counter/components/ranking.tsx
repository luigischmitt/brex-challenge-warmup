"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { listUsers, type User } from "@/lib/api"

export function Ranking({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await listUsers()
        setUsers(data)
        setError("")
      } catch (err) {
        console.error("Failed to fetch ranking:", err)
        setError("Failed to load ranking")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRanking()
  }, [])

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6">
              <p className="text-muted-foreground">Loading ranking...</p>
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
            
            {/* Title */}
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-2xl font-bold">🏆 Click Ranking</h1>
              <p className="text-muted-foreground text-balance">
                Top clickers of all time
              </p>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 text-center w-full">
                {error}
              </p>
            )}

            {/* Ranking list */}
            {users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No users yet. Be the first to click!
                </p>
              </div>
            ) : (
              <div className="w-full space-y-3">
                {users.map((user, index) => {
                  const position = index + 1
                  const medal = position === 1 ? "🥇" : position === 2 ? "🥈" : position === 3 ? "🥉" : null
                  
                  return (
                    <div
                      key={user.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-colors",
                        position <= 3 
                          ? "bg-primary/5 border-primary/20" 
                          : "bg-muted/50 border-border"
                      )}
                    >
                      {/* Position and Username */}
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm",
                          position <= 3 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        )}>
                          {medal || position}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {user.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.clicks === 1 ? "1 click" : `${user.clicks} clicks`}
                          </p>
                        </div>
                      </div>

                      {/* Clicks count */}
                      <div className="text-right">
                        <p className={cn(
                          "text-2xl font-bold",
                          position <= 3 ? "text-primary" : "text-foreground"
                        )}>
                          {user.clicks}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full pt-4">
              <Link href="/" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-xs text-center text-muted-foreground px-6">
        Keep clicking to climb the ranks! 🚀
      </p>
    </div>
  )
}

