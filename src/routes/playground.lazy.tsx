import { useAudioLevels, useAudioStream } from "@/lib/audio"
import { createLazyFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import * as _ from "lodash-es"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export const Route = createLazyFileRoute("/playground")({
  component: Component,
})

function Component() {
  const [start, setStart] = useState(false)

  return (
    <div className="bg-black text-white">
      <Button onClick={() => setStart((v) => !v)}>Start</Button>
      {start && (
        <>
          <AudioVisualizer segments={8} />
          <ControlClock />
        </>
      )}
      <p> </p>
      {/* <div className="bg-black">
        <Visualizer values={[1, 2, 3, 2]} />
      </div> */}
    </div>
  )

  
}

// function AudioRecorder() {
//   if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//     throw new Error("This device does not support audio recording!")
//   }

//   const [mode, setMode] = useState<"start" | "recording" | "stop">()
//   const [audio, setAudio] = useState<MediaStream>()
//   const [levels, setLevels] = useState<number[]>([])
//   const handleBlobEvents = useCallback((e: BlobEvent) => {
//     console.log(e)
//   }, [])

//   useEffect(() => {
//     if (mode !== "start") return
//     navigator.mediaDevices
//       .getUserMedia({ audio: true })
//       .then((stream) => {
//         console.log(stream)
//         setAudio(stream)
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }, [mode])

//   const audioRecorder = useMemo(() => {
//     if (!audio) return
//     return new MediaRecorder(audio)
//   }, [audio])

//   // do not confuse with react contexts
//   useMemo(() => {
//     if (!audio || mode === "stop") return
//     console.log("audio context created")

//     const context = new AudioContext()
//     const source = context.createMediaStreamSource(audio)
//     const analyser = context.createAnalyser()
//     analyser.fftSize = 2048
//     const buffLen = analyser.frequencyBinCount
//     const dataArray = new Uint8Array(buffLen)

//     source.connect(analyser)

//     setInterval(() => {
//       analyser.getByteTimeDomainData(dataArray)
//       const newLevels = Array.from(dataArray).map((v) => v / 255)
//       setLevels(newLevels)
//     }, 1000 / 60)

//     return { context, analyser }
//   }, [audio, mode])

//   useEffect(() => {
//     if (!audioRecorder) return

//     switch (mode) {
//       case "start":
//         {
//           audioRecorder.start()
//           audioRecorder.addEventListener("dataavailable", handleBlobEvents)
//           setMode("recording")
//         }
//         break
//       case "stop":
//         {
//           audioRecorder.stop()
//           // stop the audio context
//           // audioContext?.context.close()
//           // stop audio stream
//           audio?.getAudioTracks().forEach((track) => track.stop())

//           audioRecorder.removeEventListener("dataavailable", handleBlobEvents)
//         }
//         break
//     }
//   }, [audio, audioRecorder, handleBlobEvents, mode])

//   const levelsAverage = useMemo(() => {
//     return levels.reduce((acc, v) => Math.max(acc, v), 0)
//   }, [levels])

//   return (
//     <div>
//       {mode === "recording" && <p>Recording...</p>}
//       <button onClick={() => setMode("start")}>Start</button>
//       <button onClick={() => setMode("stop")}>Stop</button>
//       <pre>{JSON.stringify(levelsAverage)}</pre>
//       <div
//         style={{
//           scale: String(levelsAverage ? levelsAverage * 2 : 1),
//           margin: "20px",
//           width: "100px",
//           height: "100px",
//           backgroundColor: "red",
//           borderRadius: "100%",
//         }}
//         // className="m-4 h-12 w-12 rounded-full bg-red-500"
//       ></div>
//     </div>
//   )
// }

function ControlClock() {
  const [s] = useState(Date.now())
  const [v, setV] = useState(Date.now())

  useEffect(() => {
    const i = setInterval(() => {
      setV(Date.now())
    }, 1000 / 30)

    return () => {
      clearInterval(i)
    }
  }, [])

  return v - s
}

type AudioVisualizerProps = {
  scale?: number
  segments?: number
}

function AudioVisualizer(props: AudioVisualizerProps) {
  const audio = useAudioStream()
  // return null

  const levels = useAudioLevels(audio)

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

type VisualizerProps = {
  values: number[]
}

function Visualizer(props: VisualizerProps) {
  return (
    <div className="flex h-72 w-72 items-center gap-1">
      {props.values.map((v, i) => (
        <VisualizerBar key={i} value={v} />
      ))}
    </div>
  )
}

type VisializerBarProps = {
  value: number
}

function VisualizerBar(props: VisializerBarProps) {
  return (
    <motion.div
      animate={{
        height: props.value * 60,
      }}
      transition={{
        duration: 1000 / 3 / 1000,
      }}
      className="grow rounded-full bg-slate-100"
    />
  )
}
