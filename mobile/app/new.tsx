import Icon from '@expo/vector-icons/Feather'
import { ResizeMode, Video } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import LogoLine from '../src/assets/logoLine'

const MediaPreview = ({ media }) => {
  const video = React.useRef(null)
  const [, setVideoStatus] = React.useState({})

  if (media?.type === 'image') {
    return (
      <Image
        className="h-32 w-full items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        alt={media.uri}
        source={{
          uri: media.uri,
        }}
      />
    )
  }

  if (media?.type === 'video') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Video
          ref={video}
          source={{
            uri: media.uri,
          }}
          style={{
            alignSelf: 'center',
            width: 800,
            height: 32 * 4,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          isMuted
          shouldPlay
          onPlaybackStatusUpdate={(status) => setVideoStatus(() => status)}
        />
      </View>
    )
  }

  return (
    <View className="flex-row items-center gap-2">
      <Icon name="image" color="#FFF" />
      <Text className="font-body text-sm text-gray-200">
        Adicionar foto ou video de capa
      </Text>
    </View>
  )
}

export default function New() {
  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | null>(null)

  const openMediaPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    })

    if (!result.canceled) {
      setMedia(result.assets[0])
    }
  }

  const handleCreateMemory = () => {
    console.log(isPublic, content, media)
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
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          onPress={openMediaPicker}
        >
          <MediaPreview media={media} />
        </Pressable>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
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
    </ScrollView>
  )
}
