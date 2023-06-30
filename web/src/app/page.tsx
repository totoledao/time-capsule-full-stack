import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { cookies } from 'next/headers'

import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

dayjs.locale(ptBr)

interface memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

const FilePreview = ({ mediaURL }: { mediaURL: string }) => {
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

const RenderMemories = ({
  memories,
  isPublic = false,
}: {
  memories: memory[]
  isPublic?: boolean
}) => (
  <div className="flex flex-col gap-10">
    {memories.map((memory) => (
      <div key={memory.id} className="space-y-4">
        <time className="ml-[-4rem] flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('DD[ de ]MMMM[, ]YYYY')}
        </time>
        {memory.coverUrl !== '' ? (
          <FilePreview mediaURL={memory.coverUrl} />
        ) : null}
        {memory.excerpt !== '' ? (
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
        ) : null}
        {isPublic ? null : (
          <Link
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            href={`/memories/${memory.id}`}
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    ))}
  </div>
)

export default async function Home() {
  const isAuthenticated = cookies().has('token')
  const token = cookies().get('token')?.value

  if (!isAuthenticated) {
    const { data } = await api.get<memory[]>('/public-memories')

    return <RenderMemories memories={data} isPublic />
  }

  const { data } = await api.get<memory[]>('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (data.length === 0) return <EmptyMemories />

  return <RenderMemories memories={data} />
}
