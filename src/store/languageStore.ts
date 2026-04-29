import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Lang = 'uz' | 'ru' | 'en'

interface LanguageState {
  lang: Lang
  setLang: (l: Lang) => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'uz',
      setLang: (lang) => set({ lang }),
    }),
    { name: 'sqb_lang' },
  ),
)
