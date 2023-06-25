import Icon from '@expo/vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'
import { Link, useRouter } from 'expo-router'
import React, { useContext, useState } from 'react'
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { AuthContext } from '../context/auth'

import { api } from '../src/assets/lib/api'
import LogoLine from '../src/assets/logoLine'
import { LoadingBG } from './components/LoadingBG'
import { MediaPreview } from './components/MediaPreview'

export default function New() {
  const router = useRouter()
  const { token } = useContext(AuthContext)
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const openMediaPicker = async () => {
    setLoading(true)
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      })

      if (!result.canceled) {
        setMedia(result.assets[0])
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMemory = async () => {
    if (media === null && content === '') {
      setError('Escolha uma foto/video ou digite algo para salvar')
      setTimeout(() => {
        setError(null)
      }, 3000)
      return
    }
    setLoading(true)
    try {
      let coverUrl = ''

      if (media) {
        const uploadFormData = new FormData()

        uploadFormData.append('file', {
          uri: media.uri,
          name: media.type === 'image' ? 'image.jpg' : 'video.mp4',
          type: media.type === 'image' ? 'image/jpeg' : 'video/mp4',
        } as any)

        const { data } = await api.post<{
          success: boolean
          url?: string
        }>('/upload', uploadFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        coverUrl = data.url
      }

      const { data } = await api.post(
        '/memories',
        {
          content,
          isPublic,
          coverUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      console.log(data)

      router.push('/memories')
    } catch (err) {
      console.log(err.response)
      setError(err?.response?.data?.error)
      setTimeout(() => {
        setError(null)
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="flex-1 px-8" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-row items-center justify-between">
        <LogoLine />
        <Link
          href={'/memories'}
          className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          asChild
        >
          <Pressable>
            <Icon name="arrow-left" size={16} color={'#FFF'} />
          </Pressable>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{
              false: '#2c2c31',
              true: '#372560',
            }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <Pressable
          className="items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-500 bg-black/20"
          onPress={openMediaPicker}
        >
          <MediaPreview media={media} />
        </Pressable>

        {error ? (
          <Text className="m-0 p-0 font-body text-lg text-purple-400">
            {error}
          </Text>
        ) : null}

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          textAlignVertical="top"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor={'#56565A'}
          value={content}
          onChangeText={setContent}
        />
      </View>

      <View className="mb-10 flex-grow justify-end">
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>

      <LoadingBG loading={loading} />
    </ScrollView>
  )
}
