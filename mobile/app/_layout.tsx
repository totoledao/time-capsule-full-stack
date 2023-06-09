import { SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import AuthProvider from '../context/auth'

import { Routes } from '../routes'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StatusBar style="light" translucent />
      <Stripes />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ImageBackground>
  )
}
