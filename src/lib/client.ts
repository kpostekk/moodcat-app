import createClient, { type Middleware } from "openapi-fetch"
import type { paths } from "./openapi"

const throw4xx5xx: Middleware = {
  onResponse: (ctx) => {
    const response = ctx.response
    if (response.status >= 400) throw new Error(response.statusText)
    return ctx.response
  },
}

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL as string,
  credentials: "include",
})

client.use(throw4xx5xx)
