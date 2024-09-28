import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/p/_layout/history")({
  component: () => <div>Hello /_layout/p/_layout/history!</div>,
})
