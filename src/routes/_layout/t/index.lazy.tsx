import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/t/")({
  component: () => <div>Hello /_layout/t/!</div>,
})
