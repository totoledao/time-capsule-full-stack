import { Text, TouchableOpacity, View } from 'react-native'

import { useContext } from 'react'
import { AuthContext } from '../context/auth'
import LogoLine from '../src/assets/logoLine'

export default function App() {
  const { login } = useContext(AuthContext)

  return (
    <View className="flex-1 justify-center px-8 pb-10">
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
          onPress={login}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  )
}
