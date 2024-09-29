import { client } from "./client"
import { uploadBlob } from "./upload"

type NoteOptions = {
  happinessLevel: number
  providedQuestion?: string
}

type AudioNoteOptions = {
  blob: Blob
} & NoteOptions

type TextNoteOptions = {
  text: string
} & NoteOptions

export const createAudioNote = async (opts: AudioNoteOptions) => {
  const { url } = await uploadBlob(opts.blob)
  return client.POST("/api/notes/create", {
    body: {
      data: {
        audioUrl: url,
        text: "",
        title: `Voice Note ${new Date().toISOString()}`,
        meta: {
          happinessLevel: opts.happinessLevel,
          providedQuestion: opts.providedQuestion,
        },
      },
    },
  })
}

export const createTextNote = (opts: TextNoteOptions) => {
  return client.POST("/api/notes/create", {
    body: {
      data: {
        audioUrl: "",
        text: opts.text,
        title: `Text Note ${new Date().toISOString()}`,
        meta: {
          happinessLevel: opts.happinessLevel,
          providedQuestion: opts.providedQuestion,
        },
      },
    },
  })
}

export const suggestQuestion = async () => {
  return client.POST("/api/openai/generate-question-for-user", {
    body: {
      language: "en",
      tags: [
        "ptsd",
        "toxic relationships",
        "anxiety",
        "start of therapy",
        "short question",
      ],
      topic: "PatientGeneralFunctioning",
    },
  })
}
