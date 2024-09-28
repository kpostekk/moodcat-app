import { PropsWithChildren, useCallback } from "react"
import { UserContext } from "./user-context"
import { useLocalStorage } from "react-use"
import type { User } from "./user-context"

export function UserContextProvider(props: PropsWithChildren) {
  const [user, setUserStorage, delUserStorage] = useLocalStorage<User>(
    "user",
    undefined,
  )

  const setUser = useCallback(
    (user: User | undefined) => {
      console.log("setUser", user)

      if (!user) {
        delUserStorage()
        return
      }

      setUserStorage(user)

      return
    },
    [setUserStorage, delUserStorage],
  )

  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
