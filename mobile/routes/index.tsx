import { SplashScreen, Stack } from 'expo-router'
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context/auth'

export function Routes() {
  const [loading, setLoading] = useState(true)
  const { token, getToken } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      try {
        await getToken()
      } finally {
        setLoading(false)
      }
    })()
  }, [getToken])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" redirect={!!token} />
      <Stack.Screen name="memories" />
      <Stack.Screen name="memory" />
      <Stack.Screen name="new" />
    </Stack>
  )
}
