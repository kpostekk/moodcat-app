import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./route-tree.gen"
import "./index.css"
import * as dateFns from "date-fns"
import { pl } from "date-fns/locale"

dateFns.setDefaultOptions({ locale: pl, weekStartsOn: 1 })

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("No root element found")

// createRoot(rootElement).render( <RouterProvider router={router} />)

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
