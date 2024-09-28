import { motion } from "framer-motion"
import { useAudioLevels } from "@/lib/audio"
import { useMemo } from "react"
import * as _ from "lodash-es"

export type AudioVisualizerProps = {
  scale?: number
  segments?: number
  audio: MediaStream
}

export function AudioVisualizer(props: AudioVisualizerProps) {
  // return null

  const levels = useAudioLevels(props.audio)

  const levelsModified = useMemo(() => {
    const transformer = (n: number) => {
      const nScaled = (n / 255) * (props.scale ?? 1)
      const x = nScaled
      return x < 0.51 ? x ** 2 : (x + 1) ** 2
    }

    return levels.map(transformer)
  }, [levels, props.scale])

  const levelsSimplified = useMemo(() => {
    const levelsChunked = _.chunk(
      levelsModified,
      Math.floor(levels.length / (props.segments ?? 4)),
    ).map((v) => Math.max(...v))
    return levelsChunked
  }, [levels.length, levelsModified, props.segments])

  const levelsScaled = useMemo(() => {
    return levelsSimplified.map((v) => v)
  }, [levelsSimplified])

  return <Visualizer values={levelsScaled} />
}

export type VisualizerProps = {
  values: number[]
}

export function Visualizer(props: VisualizerProps) {
  return (
    <div className="flex h-72 w-72 items-center gap-1">
      {props.values.map((v, i) => (
        <VisualizerBar key={i} value={v} />
      ))}
    </div>
  )
}

export type VisializerBarProps = {
  value: number
}

export function VisualizerBar(props: VisializerBarProps) {
  return (
    <motion.div
      animate={{
        height: props.value * 60,
      }}
      transition={{
        duration: 1000 / 3 / 1000,
      }}
      className="grow rounded-full bg-primary"
    />
  )
}
