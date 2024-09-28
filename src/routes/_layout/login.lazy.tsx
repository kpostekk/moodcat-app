import { useLogin, useUser } from "@/components/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "@tanstack/react-query"
import { createLazyFileRoute } from "@tanstack/react-router"
import * as Icons from "lucide-react"
import { loginPatient } from "@/lib/users"
import { client } from "@/lib/client"

export const Route = createLazyFileRoute("/_layout/login")({
  component: Component,
})

function Component() {
  const navigate = Route.useNavigate()
  const { setUser } = useLogin()
  const { user } = useUser()

  const loginPatientMutation = useMutation({
    mutationFn: () => loginPatient(),
    onSuccess: async () => {
      const user = await client.GET("/api/auth/manage/info")
      if (user.error) throw new Error()

      setUser({ name: user.data.email ?? "Patient", type: "patient" })
      navigate({ to: "/p" })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // for future use
      setUser(undefined)
    },
  })

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
                variant={
                  loginPatientMutation.isError ? "destructive" : "default"
                }
                className="flex justify-around"
                disabled={loginPatientMutation.isPending}
                onClick={() => loginPatientMutation.mutate()}
              >
                {loginPatientMutation.isIdle && (
                  <>
                    <Icons.User /> Login as patient
                  </>
                )}
                {loginPatientMutation.isPending && (
                  <Icons.Loader className="animate-spin" />
                )}
                {loginPatientMutation.isSuccess && <Icons.Check />}
                {loginPatientMutation.isError && <>Login error</>}
              </Button>
              <Button
                variant={"secondary"}
                disabled
                className="flex justify-around"
                // onClick={() => login()}
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
              onClick={() => logoutMutation.mutate()}
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
