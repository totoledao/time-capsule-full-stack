import Icon from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { useState } from 'react'
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import LogoLine from '../src/assets/logoLine'

export default function New() {
  const [isPublic, setIsPublic] = useState(false)
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
          onPress={null}
        >
          <View className="flex-row items-center gap-2">
            <Icon name="image" color="#FFF" />
            <Text className="font-body text-sm text-gray-200">
              Adicionar foto ou video de capa
            </Text>
          </View>
        </Pressable>

        <TextInput
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor={'#56565A'}
        />
      </View>

      <View className="mb-10 flex-grow justify-end">
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center self-end rounded-full bg-green-500 px-5 py-3"
          onPress={null}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
