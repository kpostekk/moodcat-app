import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import * as Icons from "lucide-react"

export const Route = createLazyFileRoute("/_layout/p/_layout/latest-summary")({
  component: Component,
})

function Component() {
  const query = useQuery({
    queryKey: ["latest-week-summary"],
    queryFn: () =>
      client.POST("/api/day-summaries/generate-summarize-week", {
        body: {
          forceRefresh: true,
        },
      }),
  })

  const content = query.data?.data as unknown as
    | { data: Record<string, string | null> }
    | undefined

  if (!content) {
    return (
      <div className="flex gap-2">
        <Icons.Loader className="animate-spin" />
        Loading
      </div>
    )
  }

  return (
    <Card className="my-4">
      <CardHeader>
        <h1 className="text-2xl font-semibold">
          Summary of a patient for last week
        </h1>
      </CardHeader>
      <CardContent>
        <p>{content["data"]["content"]}</p>
      </CardContent>
    </Card>
  )
}
