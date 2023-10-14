export function FilePreview({ mediaURL }: { mediaURL: string }) {
  if (mediaURL === '') return null

  const isImage = mediaURL.includes('jpg')

  if (isImage) {
    return (
      // eslint-disable-next-line
      <img
        src={mediaURL}
        alt=""
        className="aspect-auto w-fit rounded-lg object-cover"
      />
    )
  }

  return (
    <video
      src={mediaURL}
      controls
      className="aspect-auto w-fit rounded-lg object-cover"
    />
  )
}
