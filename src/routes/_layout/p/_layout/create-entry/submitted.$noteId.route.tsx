import { client } from "@/lib/client"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(
  "/_layout/p/_layout/create-entry/submitted/$noteId",
)({
  component: Component,
  loader: (ctx) => {
    return client.GET("/api/notes", {
      params: { query: { noteId: ctx.params.noteId } },
    })
  },
})

function Component() {
  const data = Route.useLoaderData()
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
