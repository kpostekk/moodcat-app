import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/text",
)({
  component: Component,
})

function Component() {
  return (
    <div className="grid py-4 gap-2">
      <Textarea
        className="h-64 resize-none"
        placeholder="Spróbuj od opisania jak zacząłeś swój dzień..."
      />
      <Button>Prześlij</Button>
    </div>
  )
}
