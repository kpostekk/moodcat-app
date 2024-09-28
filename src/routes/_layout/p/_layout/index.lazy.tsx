import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { usePatient } from "@/components/contexts/user-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as Icons from "lucide-react"

export const Route = createLazyFileRoute("/_layout/p/_layout/")({
  component: Component,
})

function Component() {
  // const lorem = useMemo(() => {
  //   faker.seed(2137)

  //   return Array.from({ length: 2137 }).map(() => faker.lorem.sentence())
  // }, [])
  const patient = usePatient()

  return (
    <div className="container mx-auto grid max-w-xl gap-4 py-4">
      <h1 className="text-3xl font-semibold">Hello {patient.name}!</h1>
      <p>Remember to update jour journal!</p>
      <Alert>
        <Icons.ClipboardCheck />
        <AlertTitle>Your weekly raport is ready!</AlertTitle>
        <AlertDescription>Check it out!</AlertDescription>
      </Alert>
      <h2 className="text-lg font-bold">Your journal</h2>
      <div className="grid grid-cols-2 gap-2">
        <Link to={"/p/create-entry"}>
          <Card>
            <CardHeader>
              <CardTitle>Add new entry</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
              <Icons.Plus />
            </CardFooter>
          </Card>
        </Link>
        <Link to={"/p/history"}>
          <Card>
            <CardHeader>
              <CardTitle>Browse past entries</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
              <Icons.Search />
            </CardFooter>
          </Card>
        </Link>
      </div>
      <h2 className="text-lg font-bold">Planned visits</h2>
      <div className="flex w-full flex-row gap-2 overflow-x-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <Link key={i} className="w-2/5 flex-none">
            <Card>
              <CardHeader>
                <CardTitle>
                  {new Date().toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Kamil Bednarski</p>
                <p className="text-xs">Terapeuta</p>
                <p className="text-xs">Centrum terapii ul. Kocia</p>
              </CardContent>
              <CardFooter className="justify-end">
                <Icons.ArrowRight />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
