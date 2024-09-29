import { Button } from "@/components/ui/button"
import { useAudioRecorder, useAudioStream } from "@/lib/audio"
import { createLazyFileRoute } from "@tanstack/react-router"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import * as dateFns from "date-fns"
import { useMutation } from "@tanstack/react-query"
import * as Icons from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AudioPlayer } from "@/components/ui/audio-player"
import { createAudioNote, suggestQuestion } from "@/lib/notes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// offload heavy components loads
const AudioVisualizer = lazy(() =>
  import("@/components/ui/visualizer").then((mod) => ({
    default: mod.AudioVisualizer,
  })),
)
const Visualizer = lazy(() =>
  import("@/components/ui/visualizer").then((mod) => ({
    default: mod.Visualizer,
  })),
)
const CustomCircularSlider = lazy(() =>
  import("@/components/ui/circular-slider").then((mod) => ({
    default: mod.CustomCircularSlider,
  })),
)

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

  const uploadMutation = useMutation({
    mutationFn: createAudioNote,
    onSuccess: async (x) => {
      if (!x.data?.response?.noteId) return
      await navigate({
        to: "/p/create-entry/submitted/$noteId",
        params: { noteId: x.data.response.noteId },
      })
    },
  })

  const questionMutation = useMutation({
    mutationFn: () => suggestQuestion(),
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
        <Suspense>
          <CustomCircularSlider
            initValue={20}
            onChange={(n) => {
              setHappiness(5 - Math.floor(n / 10))
            }}
          />
        </Suspense>
        <Alert>
          <AlertTitle>Tip!</AlertTitle>
          <AlertDescription>
            Rotate slider to describe how you feel now
          </AlertDescription>
        </Alert>
        {/* <p>{happiness}</p> */}
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
      <Suspense>
        {recorder.recorderState === "inactive" && (
          <Visualizer values={[0.3, 0.3, 0.3, 0.3]} />
        )}
        {recorder.recorderState === "recording" && (
          <AudioVisualizer segments={4} audio={audio} />
        )}
      </Suspense>
      {questionMutation.data?.data?.question && (
        <div className="ml-4 border-l-4 border-secondary-foreground/50 pl-4">
          <h1 className="text-lg font-semibold">
            {questionMutation.data.data.question}
          </h1>
        </div>
      )}
      {questionMutation.isPending && (
        <div className="ml-4 border-l-4 border-secondary-foreground/50 pl-4">
          <p className="flex">
            Loading a starter question <Icons.Loader className="animate-spin" />{" "}
          </p>
        </div>
      )}
      {recorder.recorderState === "inactive" && (
        <Button onClick={() => recorder.startRecording()}>
          Start recording
        </Button>
      )}
      {questionMutation.isIdle && (
        <div className="my-4 flex items-center gap-2">
          <h2>No idea how to start?</h2>
          <Button variant={"outline"} onClick={() => questionMutation.mutate()}>
            Suggest me something
          </Button>
        </div>
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
            onClick={() =>
              uploadMutation.mutate({
                blob,
                happinessLevel: happiness ?? 0,
                providedQuestion:
                  questionMutation.data?.data?.question ?? undefined,
              })
            }
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
