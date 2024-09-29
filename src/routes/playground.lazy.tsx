import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/playground")({
  component: Component,
})

function Component() {
  return null
}
