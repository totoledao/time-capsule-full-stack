import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get code from auth
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // Check for redirection cookie
  const redirectTo = request.cookies.get('redirectTo')?.value

  // Get the token from back-end using the code
  const registerResponse = await api.post('register', {
    code,
  })
  const { token } = registerResponse.data

  // Redirect to URL or Home and save the token in a cookie
  const redirectURL = redirectTo ?? new URL('/', request.url)
  const cookieExpirationInSeconds = 60 * 60 * 24 * 30 // 1 month

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpirationInSeconds}`,
    },
  })
}
