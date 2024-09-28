import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/p/_layout/latest-summary")({
  component: () => <div>Hello /_layout/p/_layout/latest-summary!</div>,
})
