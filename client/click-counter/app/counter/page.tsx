import { ClickCounter } from "@/components/click-counter"

export default async function CounterPage({
  searchParams,
}: {
  searchParams: Promise<{ username?: string }>
}) {
  const params = await searchParams
  const username = params.username || "Guest"

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <ClickCounter username={username} />
      </div>
    </div>
  )
}

