import { clsx, type ClassValue } from "clsx"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectColorScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

type ColorScheme = ReturnType<typeof detectColorScheme>

export function useColorScheme() {
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(detectColorScheme())

  useEffect(() => {
    const handler = () => setColorScheme(detectColorScheme())
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handler)
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handler)
  }, [])

  return colorScheme
}

export function useMatchMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)

  useEffect(() => {
    const handler = () => setMatches(window.matchMedia(query).matches)
    window.matchMedia(query).addEventListener("change", handler)
    return () => window.matchMedia(query).removeEventListener("change", handler)
  }, [query])

  return matches
}
