import { usePatient } from "@/components/contexts/user-context"
import { Navbar } from "@/components/ui/navbar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/p/_layout")({
  component: Component,
})

function Component() {
  usePatient()

  return (
    <Navbar>
      <div className="container relative mx-auto max-w-xl">
        <Outlet />
      </div>
    </Navbar>
  )
}
