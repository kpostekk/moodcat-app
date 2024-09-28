import { useLogin, useUser } from "@/components/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createLazyFileRoute } from "@tanstack/react-router"
// import { User as UserIcon, BookHeart as BookHeartIcon } from "lucide-react"
import * as Icons from "lucide-react"
import { useCallback } from "react"

export const Route = createLazyFileRoute("/_layout/login")({
  component: Component,
})

function Component() {
  const navigate = Route.useNavigate()
  const { setUser } = useLogin()
  const { user } = useUser()

  const loginAsPatient = useCallback(() => {
    setUser({ name: "Patient", type: "patient" })
    navigate({ to: "/p" })
  }, [navigate, setUser])

  const loginAsTherapist = useCallback(() => {
    setUser({ name: "Therapist", type: "doctor" })
    navigate({ to: "/t" })
  }, [navigate, setUser])

  return (
    <div className="grid h-screen w-screen place-items-center">
      <Card className="w-3/4 sm:w-72">
        <CardHeader>
          {!user && <CardTitle>Login</CardTitle>}
          {user && <CardTitle>Hi! {user.name}</CardTitle>}
        </CardHeader>
        <CardContent className="grid gap-4">
          {!user && (
            <>
              <Button
                variant={"default"}
                className="flex justify-around"
                onClick={() => loginAsPatient()}
              >
                <Icons.User /> Login as patient
              </Button>
              <Button
                variant={"secondary"}
                className="flex justify-around"
                onClick={() => loginAsTherapist()}
              >
                <Icons.Heart />
                Login as therapist
              </Button>
            </>
          )}
          {user && (
            <Button
              variant={"destructive"}
              className="flex justify-around"
              onClick={() => setUser(undefined)}
            >
              <Icons.LogOut />
              Logout {user.name}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
