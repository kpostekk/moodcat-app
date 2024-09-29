import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { createLazyFileRoute, Link } from "@tanstack/react-router"
import * as Icons from "lucide-react"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/submitted/$noteId",
)({
  component: Component,
  pendingComponent: () => (
    <div className="flex gap-2">
      <Icons.Loader className="animate-spin" />
      Loading
    </div>
  ),
})

function Component() {
  const data = Route.useLoaderData()
  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold">Entry submitted</h1>
      </CardHeader>
      <CardContent>
        <p>Your entry has been submitted successfully.</p>
        <Card className="my-2">
          <CardHeader>{data.data?.content}</CardHeader>
        </Card>
      </CardContent>
      <CardFooter>
        <Link to="/p">
          <Button>
            <Icons.ArrowLeft /> Go to home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
