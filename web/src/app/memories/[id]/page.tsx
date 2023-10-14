import { FilePreview } from '@/components/FilePreview'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { cookies } from 'next/headers'

interface memory {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
  userId: string
}

const RenderMemory = ({ memory }: { memory: memory }) => (
  <div key={memory.id} className="space-y-4">
    <time className="ml-[-4rem] flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
      {dayjs(memory.createdAt).format('DD[ de ]MMMM[, ]YYYY')}
    </time>
    {memory.coverUrl !== '' ? <FilePreview mediaURL={memory.coverUrl} /> : null}
    {memory.content !== '' ? (
      <p className="text-lg leading-relaxed text-gray-100">{memory.content}</p>
    ) : null}
  </div>
)

export default async function ShowMemory({
  params,
}: {
  params: { id: string }
}) {
  const token = cookies().get('token')?.value

  const fetchMemory = async () => {
    let data = {}

    try {
      const resPublic = await api.get<memory>(`/public-memories/${params.id}`)
      data = resPublic.data
    } catch (err) {
      const resPrivate = await api.get<memory>(`/memories/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      data = resPrivate.data
    }

    return data as memory
  }

  return <RenderMemory memory={await fetchMemory()} />
}
