import { client } from "./client"
import { uploadBlob } from "./upload"

export const createAudioNote = async (blob: Blob) => {
  const audioUrl = await uploadBlob(blob)
  return client.POST("/api/notes/create-audio", {
    body: {
      audioUrl: audioUrl.url,
      noteTitle: `Audio Note ${new Date().toISOString()}`,
    },
  })
}

export const createTextNote = (text: string) => {
  return client.POST("/api/notes/create", {
    body: {
      requestData: {
        body: text,
        title: `Text Note ${new Date().toISOString()}`,
      },
    },
  })
}
