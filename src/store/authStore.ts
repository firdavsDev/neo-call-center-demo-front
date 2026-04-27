import { create } from 'zustand'
import { storeTokens, getAccessToken, getRole, clearTokens } from '../lib/auth'

const DEMO_ACCOUNTS: Record<string, string> = {
  'agent@sqb.uz': 'agent',
  'supervisor@sqb.uz': 'supervisor',
}
const DEMO_PASSWORD = 'demo'

interface AuthState {
  accessToken: string | null
  role: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  init: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  role: null,

  login: async (email: string, password: string) => {
    const role = DEMO_ACCOUNTS[email.toLowerCase().trim()]
    if (!role || password !== DEMO_PASSWORD) {
      throw new Error('Invalid credentials')
    }
    const fakeToken = `demo-${role}-token`
    storeTokens(fakeToken, fakeToken, role)
    set({ accessToken: fakeToken, role })
  },

  logout: () => {
    clearTokens()
    set({ accessToken: null, role: null })
  },

  init: () => {
    const accessToken = getAccessToken()
    const role = getRole()
    if (accessToken && role) {
      set({ accessToken, role })
    }
  },
}))
