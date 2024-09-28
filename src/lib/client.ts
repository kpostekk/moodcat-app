import createClient from "openapi-fetch"
import type { paths } from "./openapi"

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL as string,
})
