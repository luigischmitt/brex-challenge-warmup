import { Ranking } from "@/components/ranking"

export const metadata = {
  title: "Ranking - Click Counter",
  description: "See the top clickers",
}

export default function RankingPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-2xl">
        <Ranking />
      </div>
    </div>
  )
}

