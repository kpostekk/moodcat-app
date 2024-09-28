import { client } from "./client"

export const loginPatient = () => {
  return client.POST("/api/auth/login", {
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

export const loginTherapist = () => {
  return client.POST("/api/auth/login", {
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

export const logout = () => {
  const cookie = document.cookie
  console.log("cookie", cookie)
}
