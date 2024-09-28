import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createLazyFileRoute } from "@tanstack/react-router"
import * as Icons from "lucide-react"
import { useForm } from "@tanstack/react-form"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/text",
)({
  component: Component,
})

function Component() {
  const noteForm = useForm({
    defaultValues: {
      note: "",
    },
  })

  return (
    <div className="grid gap-2 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          noteForm.handleSubmit()
        }}
      >
        <noteForm.Field
          name="note"
          validators={{
            onChange: (value) => {
              if (value.value.length < 20) {
                return "Try to write at least 20 characters. You can do it!"
              }
            },
          }}
        >
          {(child) => (
            <>
              <Textarea
                name={child.name}
                value={child.state.value}
                onBlur={child.handleBlur}
                onChange={(e) => child.setValue(e.target.value)}
                className="h-64 resize-none"
                placeholder="Try by starting describing your day, then tell what you have achieved (or not). Honest thoughts are always welcome!"
              />
              {child.state.meta.errors.map((error, i) => (
                <p key={i} className="text-destructive">
                  {error?.toString()}
                </p>
              ))}
            </>
          )}
        </noteForm.Field>

        <Button>
          Send <Icons.MoveRight />
        </Button>
      </form>
    </div>
  )
}
