import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/submitted",
)({
  component: () => <div>Hello /_layout/p/_layout/create-entry/submitted!</div>,
})
