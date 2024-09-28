// import { useColorScheme } from "@/lib/utils"
import { createFileRoute, Outlet } from "@tanstack/react-router"
import clsx from "clsx"

export const Route = createFileRoute("/_layout")({
  component: Component,
})

function Component() {
  // const scheme = useColorScheme()

  return (
    <div
      className={clsx(
        // scheme,
        "relative min-h-screen bg-background text-primary",
      )}
    >
      <Outlet />
    </div>
  )
}
