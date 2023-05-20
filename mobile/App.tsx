import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!fontsLoaded) return null

  return (
    <View className=" flex-1 items-center justify-center bg-gray-900">
      <Text className="font-title text-5xl text-gray-50">Hello World</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
