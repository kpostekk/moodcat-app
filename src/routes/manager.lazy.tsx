import { createLazyFileRoute } from "@tanstack/react-router"
import jonkler from "@/assets/manager.gif"

export const Route = createLazyFileRoute("/manager")({
  component: () => <img className="h-screen w-screen" src={jonkler} />,
})
