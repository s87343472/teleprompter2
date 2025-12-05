"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, onAuthChange, signInWithGoogle, logOut } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: () => Promise<{ user: User | null; error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    const result = await signInWithGoogle()
    return result
  }

  const signOut = async () => {
    const result = await logOut()
    return result
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
