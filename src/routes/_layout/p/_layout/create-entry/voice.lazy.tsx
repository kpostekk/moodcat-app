import { Button } from "@/components/ui/button"
import { AudioVisualizer, Visualizer } from "@/components/ui/visualizer"
import { useAudioRecorder, useAudioStream } from "@/lib/audio"
import { createLazyFileRoute } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import * as dateFns from "date-fns"
import { DefaultError, useMutation } from "@tanstack/react-query"
import * as Icons from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AudioPlayer } from "@/components/ui/audio-player"
import { createAudioNote } from "@/lib/notes"
import { CustomCircularSlider } from "@/components/ui/circular-slider"

export const Route = createLazyFileRoute(
  "/_layout/p/_layout/create-entry/voice",
)({
  component: Component,
})

function Component() {
  const navigate = Route.useNavigate()
  const audio = useAudioStream()
  const recorder = useAudioRecorder(audio)
  const [now, setNow] = useState(new Date())
  const [happiness, setHappiness] = useState<number>()
  const [hideHappy, setHideHappy] = useState(false)

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

  const uploadMutation = useMutation<unknown, DefaultError, [Blob, number]>({
    mutationFn: ([b, n]) => createAudioNote(b, n),
    onSuccess: () => {
      navigate({ to: "/p/create-entry/submitted" })
    },
  })

  useEffect(() => {
    if (
      recorder.recorderState === "recording" &&
      recordingDuration &&
      recordingDuration > 299
    ) {
      recorder.endRecording()
    }
  }, [recorder, recordingDuration])

  if (!audio) return

  if (!hideHappy) {
    return (
      <div className="grid place-content-center">
        <h1 className="my-4 text-2xl font-semibold">I feel...</h1>
        <CustomCircularSlider
          initValue={20}
          onChange={(n) => {
            setHappiness(5 - Math.floor(n / 10))
          }}
        />
        <p>{happiness}</p>
        <Button
          onClick={() => {
            setHideHappy(true)
          }}
        >
          Next
        </Button>
      </div>
    )
  }

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
      {recorder.recorderState === "inactive" && blob && blobUrl && (
        <>
          <AudioPlayer src={blobUrl} duration={recordingDuration ?? 0} />
          <Button
            disabled={uploadMutation.isPending}
            onClick={() => uploadMutation.mutate([blob, happiness ?? 0])}
          >
            {uploadMutation.isIdle && (
              <>
                Submit <Icons.ArrowRight />
              </>
            )}
            {uploadMutation.isPending && (
              <Icons.Loader className="animate-spin" />
            )}
            {uploadMutation.isSuccess && <Icons.Check />}
          </Button>
        </>
      )}
    </div>
  )
}
