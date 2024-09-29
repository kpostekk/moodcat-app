import { Button } from "@/components/ui/button"
import { createLazyFileRoute, Link } from "@tanstack/react-router"
import * as Icons from "lucide-react"

export const Route = createLazyFileRoute("/_layout/p/_layout/create-entry/")({
  component: Component,
})

function Component() {
  return (
    <div className="grid gap-2 my-4">
      <h1 className="text-3xl font-bold">Create new entry into your journal</h1>
      <Link to="/p/create-entry/voice">
        <Button className="h-24 w-full text-xl">
          <Icons.Mic />
          Speak into journal
          <small className="translate-x-1 translate-y-1">(preferred)</small>
        </Button>
      </Link>
      <Link to="/p/create-entry/text">
        <Button variant="outline" className="h-24 w-full text-xl">
          <Icons.Pencil />
          Write into journal
        </Button>
      </Link>
    </div>
  )
}
