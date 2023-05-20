export function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança,{' '}
        <a className="underline hover:text-gray-50" href="">
          comece a criar agora!
        </a>
      </p>
    </div>
  )
}
