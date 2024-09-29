import { useCallback, useEffect, useState } from "react"
import { useAsync } from "react-use"

const FFT_SIZE = 2048

export const useAudioStream = () => {
  const audioAsync = useAsync(async () => {
    const stream = navigator.mediaDevices.getUserMedia({ audio: true })
    return stream
  })

  useEffect(() => {
    return () => audioAsync.value?.getTracks().forEach((t) => t.stop())
  }, [audioAsync.value])

  return audioAsync.value
}

export const useAudioLevels = (audio?: MediaStream) => {
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

export const useAudioRecorder = (audio?: MediaStream) => {
  const [recorder, setRecorder] = useState<MediaRecorder>()
  const [chunks, setChunks] = useState<Blob[]>([])
  const [recordingStartedAt, setRecordingStartedAt] = useState<Date>()
  const [recordingEndedAt, setRecordingEndedAt] = useState<Date>()
  const [recorderState, setRecorderState] =
    useState<(typeof MediaRecorder)["prototype"]["state"]>("inactive")

  useEffect(() => {
    if (!audio) return

    const rec = new MediaRecorder(audio)
    setRecorder(rec)

    return () => {
      rec.stop()
    }
  }, [audio])

  const updateChunks = useCallback((e: BlobEvent) => {
    console.log(e)
    setChunks((prev) => [...prev, e.data])
  }, [])

  const startRecording = useCallback(() => {
    if (!recorder) throw new Error("Recorder is not ready!")
    recorder.start()
    setRecordingStartedAt(new Date())
    setRecordingEndedAt(undefined)
    setRecorderState(recorder.state)
    setChunks([])

    recorder.addEventListener("dataavailable", updateChunks)
  }, [recorder, updateChunks])

  const endRecording = useCallback(() => {
    if (!recorder) throw new Error("")

    recorder.stop()
    setRecorderState(recorder.state)
    setRecordingEndedAt(new Date())
  }, [recorder])

  return {
    startRecording,
    endRecording,
    chunks,
    recorderState,
    recordingEndedAt,
    recordingStartedAt,
  }
}
