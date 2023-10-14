import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Link, useLocalSearchParams } from 'expo-router'
import React, { useContext, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'

import { AuthContext } from '../context/auth'
import { api } from '../src/assets/lib/api'

import LogoLine from '../src/assets/logoLine'
import { LoadingBG } from './components/LoadingBG'
import { MediaPreview } from './components/MediaPreview'

dayjs.locale(ptBr)

interface memory {
  id: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
  userId: string
}

const MemoryCard = ({ memory }: { memory: memory }) => {
  if (!memory) return null

  return (
    <View className="space-y-4">
      <View className="flex-row items-center gap-2">
        <View className="h-px w-5 bg-gray-50" />
        <Text className="font-body text-xs text-gray-100">
          {dayjs(memory.createdAt).format('DD[ de ]MMMM[, ]YYYY')}
        </Text>
      </View>
      {memory.coverUrl !== '' ? (
        <View className="mx-8 space-y-4 overflow-hidden rounded-lg">
          <MediaPreview
            media={{
              type: memory.coverUrl.includes('jpg') ? 'image' : 'video',
              uri: memory.coverUrl,
            }}
          />
        </View>
      ) : null}
      {memory.content !== '' ? (
        <Text className="px-8 font-body text-base leading-relaxed  text-gray-100">
          {memory.content}
        </Text>
      ) : null}
    </View>
  )
}

export default function Memory() {
  const { token, logout } = useContext(AuthContext)
  const [memory, setMemory] = useState<memory>()
  const [loading, setLoading] = useState(false)
  const params = useLocalSearchParams()
  const { id } = params

  useEffect(() => {
    const loadMemories = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/memories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setMemory(data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    loadMemories()
  }, [id, token])

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-8 pb-6">
        <LogoLine />

        <View className="flex-row gap-2">
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
            onPress={logout}
          >
            <Icon name="log-out" size={16} color={'#000'} />
          </Pressable>

          <Link
            href={'/new'}
            className="h-10 w-10 items-center justify-center rounded-full bg-green-500"
            asChild
          >
            <Pressable>
              <Icon name="plus" size={16} color={'#000'} />
            </Pressable>
          </Link>
        </View>
      </View>

      <MemoryCard memory={memory} />

      <LoadingBG loading={loading} />
    </View>
  )
}
