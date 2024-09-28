import { Slice } from "lucide-react"
import { useRef } from "react"
import { Slider } from "./slider"

export type AudioPlayerProps = {
  src: string
  duration: number
}

export function AudioPlayer(props: AudioPlayerProps) {
  const ref = useRef<HTMLAudioElement>(null)
  const [sliderPos, setSliderPos] = useState(0)

  return (
    <>
      <audio src={props.src} ref={ref} />
      <Slider
        min={0}
        max={300}
        value={sliderPos}
        
        onValueChange={([p]) => {
          setSliderPos(p)
          if (!ref.current) return
          ref.current.currentTime = p
        }}
      />
    </>
  )
}
