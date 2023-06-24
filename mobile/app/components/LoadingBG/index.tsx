import { useEffect, useRef } from 'react'
import { Animated, Image } from 'react-native'

import Blur from '../../../src/assets/bg-blur.png'
import Logo from '../../../src/assets/logoLine'

export function LoadingBG({ loading = false }) {
  const Loader = () => {
    const fadeAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start()
    }, [fadeAnim])

    return (
      <Animated.View
        className="absolute h-full w-full flex-1 items-center justify-center"
        style={{
          opacity: fadeAnim,
        }}
      >
        <Image className="absolute" source={Blur} alt="blur" />
        <Logo width={315} height={30} />
      </Animated.View>
    )
  }

  if (!loading) return null
  return <Loader />
}
