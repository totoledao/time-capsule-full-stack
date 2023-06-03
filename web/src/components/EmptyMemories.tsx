import Link from 'next/link'

export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança,{' '}
        <Link className="underline hover:text-gray-50" href="/memories/new">
          comece a criar agora!
        </Link>
      </p>
    </div>
  )
}
