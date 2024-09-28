import { PropsWithChildren } from "react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar(props: PropsWithChildren) {
  return (
    <>
      <nav className="sticky top-0 flex h-16 items-center border-b px-8 backdrop-blur shadow">
        <Button variant={"ghost"}>
          <Icons.Menu className="text-4xl" />
        </Button>
      </nav>
      <>{props.children}</>
    </>
  )
}
