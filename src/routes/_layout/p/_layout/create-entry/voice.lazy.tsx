import { Button } from "@/components/ui/button"
import { AudioVisualizer, Visualizer } from "@/components/ui/visualizer"
import { useAudioRecorder, useAudioStream } from "@/lib/audio"
import { createLazyFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"
import * as dateFns from "date-fns"
import { useMutation } from "@tanstack/react-query"
import { uploadBlob } from "@/lib/upload"
import * as Icons from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/voice",
)({
  component: Component,
})

function Component() {
  const audio = useAudioStream()
  const recorder = useAudioRecorder(audio)
  const [now, setNow] = useState(new Date())
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (recorder.recorderState !== "recording") return

    const i = setInterval(() => {
      setNow(new Date())
    }, 1000 / 24)
    return () => clearInterval(i)
  }, [recorder.recorderState])

  const blob = useMemo(() => {
    if (recorder.chunks.length < 1) return

    return new Blob(recorder.chunks, { type: "audio/webm; codecs=opus" })
  }, [recorder.chunks])

  const blobUrl = useMemo(() => {
    if (!blob) return

    return URL.createObjectURL(blob)
  }, [blob])

  const recordingDuration = useMemo(() => {
    if (!recorder.recordingStartedAt) return

    if (recorder.recordingEndedAt) {
      return dateFns.differenceInSeconds(
        recorder.recordingEndedAt,
        recorder.recordingStartedAt,
      )
    }

    return dateFns.differenceInSeconds(now, recorder.recordingStartedAt)
  }, [now, recorder.recordingEndedAt, recorder.recordingStartedAt])

  const uploadMutation = useMutation({
    mutationFn: uploadBlob,
  })

  if (!audio) return

  return (
    <div className="grid place-items-center gap-2">
      {recorder.recorderState === "inactive" && (
        <Visualizer values={[0.3, 0.3, 0.3, 0.3]} />
      )}
      {recorder.recorderState === "recording" && (
        <AudioVisualizer segments={4} audio={audio} />
      )}
      {recorder.recorderState === "inactive" && (
        <Button onClick={() => recorder.startRecording()}>
          Start recording
        </Button>
      )}
      {recorder.recorderState === "recording" && (
        <>
          <Button onClick={() => recorder.endRecording()}>End recording</Button>
          <Progress value={recordingDuration} max={300} />
        </>
      )}
      {recorder.recorderState === "inactive" && recorder.chunks.length > 0 && (
        <>
          <audio ref={audioRef} src={blobUrl} />
          <Slider
            value={[recordingDuration ?? 0]}
            min={0}
            max={recordingDuration}
            onChange={() => {}}
          />
        </>
      )}
    </div>
  )

  return (
    <div className="grid place-items-center gap-2">
      <Button onClick={() => recorder.startRecording()}>Start recording</Button>

      {recorder.recorderState === "recording" && (
        <>
          <Button onClick={() => recorder.endRecording()}>End recording</Button>
          <AudioVisualizer segments={4} audio={audio} />
          {recorder.recordingStartedAt && <p>{recordingDuration}</p>}
        </>
      )}

      {blobUrl && blob && (
        <>
          <audio src={blobUrl} controls />
          <Button onClick={() => uploadMutation.mutate(blob)}>Upload</Button>
        </>
      )}
      {uploadMutation.isPending && <Icons.Loader className="animate-spin" />}
      {uploadMutation.data && (
        <a href={uploadMutation.data.url}>
          <Button variant={"link"}>Kopia nagrania</Button>
        </a>
      )}
    </div>
  )
}
