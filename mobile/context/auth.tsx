import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { createContext, useState } from 'react'

import { api } from '../src/assets/lib/api'

interface authProps {
  token: string
  getToken: () => Promise<void>
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<authProps>({} as authProps)

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/fd7f351bee3a64f58242',
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState('')
  const router = useRouter()

  const [, , promptAsync] = useAuthRequest(
    {
      clientId: 'fd7f351bee3a64f58242',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'timecapsule',
      }),
    },
    discovery,
  )

  async function getToken() {
    const result = await SecureStore.getItemAsync('token')
    setToken(result)
  }

  async function login() {
    const res = await promptAsync()

    const handleOAuth = async (code: string) => {
      try {
        const registerRes = await api.post('/register-mobile', { code })
        const { token } = registerRes.data
        await SecureStore.setItemAsync('token', token)
        setToken(token)
        router.push('memories')
      } catch (err) {
        console.log(err)
      }
    }

    if (res?.type === 'success') {
      const { code } = res.params
      handleOAuth(code)
    } else {
      console.log(res)
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync('token')
    setToken('')
  }

  return (
    <AuthContext.Provider value={{ token, getToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
