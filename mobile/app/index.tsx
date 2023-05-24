import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import blurBg from '../src/assets/bg-blur.png'
import { api } from '../src/assets/lib/api'
import LogoLine from '../src/assets/logoLine'
import Stripes from '../src/assets/stripes'

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/fd7f351bee3a64f58242',
}

async function getToken() {
  const result = await SecureStore.getItemAsync('token')
  return result
}

export default function App() {
  const router = useRouter()

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  const [, response, promptAsync] = useAuthRequest(
    {
      clientId: 'fd7f351bee3a64f58242',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'timecapsule',
      }),
    },
    discovery,
  )

  useEffect(() => {
    if (getToken() && fontsLoaded) {
      router.push('/memories')
    }
  }, [router])

  useEffect(() => {
    const handleOAuth = async (code: string) => {
      try {
        const registerRes = await api.post('/register-mobile', { code })
        const { token } = registerRes.data
        await SecureStore.setItemAsync('token', token)
        router.push('/memories')
      } catch (err) {
        console.log(err)
      }
    }

    if (response?.type === 'success') {
      const { code } = response.params
      handleOAuth(code)
    } else {
      console.log(response)
    }
  }, [response, router])

  if (!fontsLoaded) return null

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 justify-center bg-gray-900 px-8 py-10"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StatusBar style="light" translucent />

      <Stripes />

      <View className="flex-1 items-center justify-center gap-6">
        <LogoLine />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-full bg-green-500 px-5 py-3"
          onPress={() => promptAsync()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </ImageBackground>
  )
}
