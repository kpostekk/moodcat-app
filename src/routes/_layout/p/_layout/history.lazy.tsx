import { HappyCalendar } from "@/components/ui/happy-calendar"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import * as dateFns from "date-fns"

export const Route = createLazyFileRoute("/_layout/p/_layout/history")({
  component: Component,
})

function Component() {
  const happinessQuery = useQuery({
    queryKey: ["happiness"],
    initialData: new Map<string, number>(),
    queryFn: async () => {
      const monthStart = dateFns.startOfMonth(new Date())
      const monthLength = dateFns.differenceInDays(
        dateFns.endOfMonth(monthStart),
        monthStart,
      )

      const happinessEntries = await Promise.all(
        Array.from({ length: monthLength }).map(async (_, i) => {
          const date = dateFns.addDays(monthStart, i)
          const dateIso = dateFns.formatISO(dateFns.endOfDay(date))
          const response = await client.GET("/api/notes/get-day-happiness", {
            params: { query: { day: dateIso } },
          })

          return [
            dateFns.formatISO(date, { representation: "date" }),
            Math.round(response.data?.happiness ?? 0),
          ] as const
        }),
      )

      return new Map<string, number>(happinessEntries)
    },
  })

  return (
    <HappyCalendar scopeDate={new Date()} happinessMap={happinessQuery.data} />
  )
}
