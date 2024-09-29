import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { useColorScheme } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const Route = createLazyFileRoute("/")({
  component: Component,
})

function Component() {
  const scheme = useColorScheme()

  return (
    <div className={scheme}>
      <div className="grid h-screen w-screen place-items-center bg-background">
        <Card className="group relative w-2/3 md:w-1/3 max-w-md overflow-hidden">
          {/* <div className="absolute z-10 grid h-full w-full select-none place-content-center bg-background/90 opacity-0 backdrop-blur-sm duration-200 group-hover:opacity-100 group-hover:backdrop-blur-md">
            <div>🚧 under construction 🚧</div>
          </div> */}
          <div className="flex justify-center p-8 md:p-16 lg:p-24">
            {scheme === "dark" ? (
              <img src="/moodcat-white.svg" alt="Moodcat logo" />
            ) : (
              <img src="/moodcat.svg" alt="Moodcat logo" />
            )}
          </div>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Moodcat - your mental health diary
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link to="/login">
              <Button>Get Started</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
