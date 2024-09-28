import { useEffect, useState } from "react"
import { useAsync } from "react-use"

const FFT_SIZE = 1024

export const useAudioStream = () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("This device does not support audio recording!")
  }

  const audioAsync = useAsync(async () => {
    const stream = navigator.mediaDevices.getUserMedia({ audio: true })
    return stream
  })

  // useEffect(() => {
  //   return () => audioAsync.value?.getTracks().forEach((t) => t.stop())
  // }, [audioAsync.value])

  return audioAsync.value
}

// export const useAudioContext = () => {
//   const [context, setContext] = useState<AudioContext>()

//   useEffect(() => {
//     const ac = new AudioContext()
//     setContext(ac)

//     return () => {
//       ac.close()
//     }
//   }, [])

//   return context
// }

// export type AudioLevelsOpts = {
//   transform?: (n: number) => number
//   probeFrequency?: number
// }

export const useAudioLevels = (audio?: MediaStream) => {
  // const transform = useMemo(() => {
  //   return opts?.transform ?? ((x: number) => x / 255)
  // }, [opts?.transform])
  // const probe = useMemo(() => {
  //   return opts?.probeFrequency ?? 30
  // }, [opts?.probeFrequency])
  // const context = useRef(new AudioContext())
  // const source = useRef<MediaStreamAudioSourceNode>()
  // const analyzer = useRef<AnalyserNode>()
  const [levels, setLevels] = useState<number[]>([])

  useEffect(() => {
    if (!audio) return

    const context = new AudioContext()
    const source = context.createMediaStreamSource(audio)
    const analyser = context.createAnalyser()

    analyser.fftSize = FFT_SIZE

    source.connect(analyser)

    const buffLen = analyser.frequencyBinCount
    const dataArray = new Uint8Array(buffLen)

    const i = setInterval(() => {
      analyser.getByteTimeDomainData(dataArray)
      const newLevels = Array.from(dataArray)
      setLevels(newLevels)
    }, 1000 / 12)

    return () => {
      clearInterval(i)
      source.disconnect(analyser)
      context.close()
    }
  }, [audio])

  return levels
}
