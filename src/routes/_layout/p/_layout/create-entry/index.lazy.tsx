import { Button } from "@/components/ui/button"
import { createLazyFileRoute, Link } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/p/_layout/create-entry/")({
  component: Component,
})

function Component() {
  return (
    <div className="grid gap-2">
      <Link to="/p/create-entry/voice">
        <Button className="h-72 w-full text-xl">Talk to me</Button>
      </Link>
      <Link to="/p/create-entry/text">
        <Button variant="secondary" className="h-24 w-full text-xl">
          Write to me
        </Button>
      </Link>
    </div>
  )
}
