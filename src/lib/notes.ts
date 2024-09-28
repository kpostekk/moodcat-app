import { client } from "./client"
import { uploadBlob } from "./upload"

export const createAudioNote = async (blob: Blob, happinessLevel: number) => {
  const { url } = await uploadBlob(blob)
  return client.POST("/api/notes/create", {
    body: {
      data: {
        audioUrl: url,
        text: "",
        title: `Voice Note ${new Date().toISOString()}`,
        meta: {
          happinessLevel,
          providedQuestion: "",
        },
      },
    },
  })
}

export const createTextNote = (text: string, happinessLevel: number) => {
  return client.POST("/api/notes/create", {
    body: {
      data: {
        audioUrl: "",
        text,
        title: `Text Note ${new Date().toISOString()}`,
        meta: {
          happinessLevel,
          providedQuestion: "",
        },
      },
    },
  })
}
