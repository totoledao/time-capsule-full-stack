import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Link, useFocusEffect } from 'expo-router'
import React, { useContext, useState } from 'react'
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native'

import { AuthContext } from '../context/auth'
import { api } from '../src/assets/lib/api'

import LogoLine from '../src/assets/logoLine'
import { LoadingBG } from './components/LoadingBG'
import { MediaPreview } from './components/MediaPreview'

dayjs.locale(ptBr)

interface memory {
  coverUrl: string
  excerpt: string
  id: string
  createdAt: string
}

const MemoryCard = ({ memory }: { memory: memory }) => {
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
      {memory.excerpt !== '' ? (
        <Text className="px-8 font-body text-base leading-relaxed  text-gray-100">
          {memory.excerpt}
        </Text>
      ) : null}
      <Link href={`/memories/id`} asChild>
        <Pressable className="flex-row items-center gap-2 px-8">
          <Text className="font-body text-sm text-gray-200">Ler mais</Text>
          <Icon name="arrow-right" size={16} color={'#9e9ea0'} />
        </Pressable>
      </Link>
    </View>
  )
}

export default function Memories() {
  const { token, logout } = useContext(AuthContext)
  const [memories, setMemories] = useState<memory[]>([])
  const [loading, setLoading] = useState(false)

  const loadMemories = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/memories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMemories(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadMemories()
    }, []),
  )

  return (
    <View className="flex-1">
      <View className="flex-row items-center justify-between px-8">
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

      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MemoryCard memory={item} />}
        contentContainerStyle={{ flexGrow: 1 }}
        ItemSeparatorComponent={() => <View className="h-8" />}
        ListFooterComponent={() => <View className="h-8" />}
        ListEmptyComponent={() =>
          loading ? null : (
            <View className="flex-grow-1 flex-1 justify-center px-8">
              <Text className="mb-10 font-body text-base leading-relaxed  text-gray-100">
                Você ainda não possui nenhuma memória registrada.
              </Text>
              <Link href={'/new'} asChild>
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="rounded-full bg-green-500 px-5 py-3"
                >
                  <Text className="font-alt text-sm uppercase text-black">
                    Cadastrar lembrança
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          )
        }
      />

      <LoadingBG loading={loading} />
    </View>
  )
}
