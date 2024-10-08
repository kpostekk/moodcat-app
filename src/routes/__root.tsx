import { Suspense } from "react"
import { Outlet, createRootRoute } from "@tanstack/react-router"
import { UserContextProvider } from "@/components/contexts/user-context-provider"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const DevTools = React.lazy(() => import("@/devtools"))
const Analytics = React.lazy(() =>
  import("@vercel/analytics/react").then((m) => ({ default: m.Analytics })),
)

const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <>
      {import.meta.env.PROD && (
        <Suspense>
          <Analytics />
        </Suspense>
      )}
      {import.meta.env.DEV && (
        <Suspense>
          <DevTools />
        </Suspense>
      )}
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <Outlet />
        </UserContextProvider>
      </QueryClientProvider>
    </>
  ),
})
