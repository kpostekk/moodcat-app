import { PropsWithChildren, useState } from "react"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Link } from "@tanstack/react-router"

export function Navbar(props: PropsWithChildren) {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 flex h-16 items-center border-b px-1 shadow backdrop-blur lg:px-8">
        <Button variant={"ghost"} onClick={() => setSheetOpen(true)}>
          <Icons.Menu className="text-4xl" />
        </Button>
      </nav>
      <Sheet open={sheetOpen} onOpenChange={(v) => setSheetOpen(v)}>
        <SheetContent side={"left"} className="max-w-lg">
          <div className="grid" onClick={() => setSheetOpen(false)}>
            <Link to="/p">
              <Button variant={"link"}>
                <Icons.Home />
                Home
              </Button>
            </Link>
            <Link to="/p/create-entry">
              <Button variant={"link"}>
                <Icons.Plus />
                Add entry
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <>{props.children}</>
    </>
  )
}
