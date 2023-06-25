import Icon from '@expo/vector-icons/Feather'
import { ResizeMode, Video } from 'expo-av'
import React from 'react'
import { Image, Text, View } from 'react-native'

export function MediaPreview({ media }) {
  const video = React.useRef(null)
  const [, setVideoStatus] = React.useState({})

  if (media?.type === 'image') {
    return (
      <Image
        className="h-64 w-full items-center justify-center"
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
            height: 64 * 4,
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
