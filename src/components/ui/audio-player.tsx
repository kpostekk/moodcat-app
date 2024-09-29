import { useEffect, useRef, useState } from "react"
import { Slider } from "./slider"
import { Button } from "./button"
import * as Icons from "lucide-react"
import { formatDuration } from "date-fns"

export type AudioPlayerProps = {
  src: string
  duration: number
}

export function AudioPlayer(props: AudioPlayerProps) {
  const ref = useRef<HTMLAudioElement>(null)
  const [sliderPos, setSliderPos] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const a = ref.current

    const handler = () => {
      setSliderPos(a.currentTime)
    }

    ref.current.addEventListener("timeupdate", handler)

    return () => {
      a.removeEventListener("timeupdate", handler)
    }
  }, [])

  return (
    <>
      <audio src={props.src} ref={ref} />
      <div className="flex justify-center gap-1.5 items-center">
        <Button variant={"outline"} onClick={() => void ref.current?.play()}>
          <Icons.Play />
        </Button>
        <Button variant={"outline"} onClick={() => ref.current?.pause()}>
          <Icons.Pause />
        </Button>
        <span>
          {formatDuration(
            { seconds: Math.floor(sliderPos) },
            {
              zero: true,
              format: ["minutes", "seconds"],
            },
          )}
          /
          {formatDuration(
            { seconds: props.duration },
            {
              zero: true,
              format: ["minutes", "seconds"],
            },
          )}
        </span>
      </div>
      <Slider
        min={0}
        max={props.duration}
        value={[sliderPos]}
        onValueChange={([p]) => {
          setSliderPos(p)
          if (!ref.current) return
          ref.current.currentTime = p
        }}
      />
    </>
  )
}
