import { Button } from "@/components/ui/button"
import { AudioVisualizer, Visualizer } from "@/components/ui/visualizer"
import { useAudioStream } from "@/lib/audio"
import { createLazyFileRoute, Link } from "@tanstack/react-router"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry-voice",
)({
  component: Component,
})

function Component() {
  const audio = useAudioStream()

  if (!audio) return

  return (
    <div className="grid gap-2">
      <AudioVisualizer segments={4} audio={audio} />
      {/* <Visualizer values={[2, 3, 3.5, 1]} /> */}
    </div>
  )
}
