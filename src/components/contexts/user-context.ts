import { createContext, useContext } from "react"
import z from "zod"

const User = z.union([
  z.object({
    type: z.literal("patient"),
    name: z.string(),
  }),
  z.object({
    type: z.literal("doctor"),
    name: z.string(),
  }),
])

export type User = z.infer<typeof User>

export type UserContextType = {
  user?: User
  setUser: (user: User | undefined) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("UserContext is not defined!")

  return context
}

export const useLogin = () => {
  const { setUser } = useUserContext()

  return { setUser }
}

export const useUser = () => {
  const { user } = useUserContext()

  return { user }
}

export const usePatient = () => {
  const { user } = useUser()
  if (user?.type !== "patient") throw new Error("User is not a patient!")

  return user
}

export const useDoctor = () => {
  const { user } = useUser()
  if (user?.type !== "doctor") throw new Error("User is not a doctor!")

  return user
}
