'use client'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<File | null>(null)
  const [showError, setShowError] = useState(false)

  const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return
    if (files[0].size > 5242880) {
      // 5MB
      setPreview(null)
      setShowError(true)
      setTimeout(() => setShowError(false), 2000)
      return
    }

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
        name="coverUrl"
        accept="image/*,video/*"
        className="invisible h-0 w-0"
        onChange={onFileSelected}
      />
      {showError ? (
        <p className="text-xs text-red-400">
          O tamanho máximo do arquivo deve ser 5MB
        </p>
      ) : null}
      <FilePreview />
    </>
  )
}
