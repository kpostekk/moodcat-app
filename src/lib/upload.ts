import { ContainerClient } from "@azure/storage-blob"

export async function uploadBlob(blob: Blob) {
  console.log(import.meta.env.VITE_AZURE_STORAGE_URL)
  const containerClient = new ContainerClient(
    import.meta.env.VITE_AZURE_STORAGE_URL,
  )
  const blockBlobClient = containerClient.getBlockBlobClient(
    `r/${crypto.randomUUID()}.webm`,
  )

  const response = await blockBlobClient.uploadData(blob)
  return { response, url: blockBlobClient.url }
}
