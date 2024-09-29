import { createLazyFileRoute } from "@tanstack/react-router"
import * as Icons from "lucide-react"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/submitted/$noteId",
)({
  component: Component,
  pendingComponent: () => (
    <div className="flex gap-2">
      <Icons.Loader className="animate-spin" />
      Loading
    </div>
  ),
})

function Component() {
  const data = Route.useLoaderData()
  return <p>{data.data?.content}</p>
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
