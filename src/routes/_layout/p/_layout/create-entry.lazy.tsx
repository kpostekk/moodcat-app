import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/p/_layout/create-entry")({
  component: () => <div>Hello /_layout/p/_layout/create-entry!</div>,
})
