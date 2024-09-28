import { client } from "./client"

export const loginPatient = async () => {
  await client.POST("/api/auth/login", {
    params: {
      query: {
        useCookies: true,
      },
    },
    body: {
      email: "patient",
      password: import.meta.env.VITE_DEMO_PASSWORD,
    },
  })
}

export const loginTherapist = async () => {
  await client.POST("/api/auth/login", {
    params: {
      query: {
        useCookies: true,
      },
    },
    body: {
      email: "specialist",
      password: import.meta.env.VITE_DEMO_PASSWORD,
    },
  })
}
