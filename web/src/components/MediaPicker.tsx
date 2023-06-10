'use client'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<File | null>(null)

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return

    setPreview(files[0])
  }

  const FilePreview = () => {
    if (!preview) return null

    const previewURL = URL.createObjectURL(preview)
    const mimetypeImageRegex = /^(image)\/[a-zA-Z0-9]+/
    const isImage = mimetypeImageRegex.test(preview.type)

    if (isImage) {
      return (
        // eslint-disable-next-line
        <img
          src={previewURL}
          alt=""
          className="aspect-auto w-fit rounded-lg object-cover"
        />
      )
    }

    return (
      <video
        src={previewURL}
        controls
        className="aspect-auto w-fit rounded-lg object-cover"
      />
    )
  }

  return (
    <>
      <input
        type="file"
        id="media"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />

      <FilePreview />
    </>
  )
}
