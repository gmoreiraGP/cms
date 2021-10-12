import { createContext, useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import api from '@/utils/api'
import Router from 'next/router'
import { response } from 'express'

type AuthContextType = {
  isAuthenticated: boolean
  token: Token
  user: User
  signIn: (data: SignInData) => Promise<void>
}

type User = {
  id: string
  email: string
  password: string
}

type SignInData = {
  email: string
  password: string
}

type RefreshToken = {
  id: string
  expiresIn: number
  userId: string
}

type Token = {
  token: string
  refreshToken: RefreshToken
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [token, setToken] = useState<Token | null>(null)
  const [user, setUser] = useState({} as User)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    async function getMe() {
      if (token) {
        const me = await api
          .post('/recover-me/', { token })
          .then(response => response.data)

        setUser(me)
      }
    }
    getMe()
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token: tokenData, refreshToken } = await api
      .post('/login', { email, password })
      .then(resolve => resolve.data)
      .catch(err => console.log(err))

    setCookie(undefined, 'nextauth.token', tokenData, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
    const refreshTokenData = JSON.stringify(refreshToken)
    setCookie(undefined, 'nextauth.refreshToken', refreshTokenData)

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setToken(tokenData)

    Router.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
