import { useLanguageStore } from '../store/languageStore'
import type { Lang } from '../store/languageStore'
import { uz } from './uz'
import { ru } from './ru'
import { en } from './en'

export type { Lang }

const dictionaries: Record<Lang, Record<string, string>> = { uz, ru, en }

export function useT() {
  const lang = useLanguageStore((s) => s.lang)
  const dict = dictionaries[lang]

  function t(key: string, vars?: Record<string, string | number>): string {
    let str = dict[key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.split(`{${k}}`).join(String(v))
      }
    }
    return str
  }

  return { t, lang }
}

export function useDateLocale(): string {
  const lang = useLanguageStore((s) => s.lang)
  return lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : 'uz-UZ'
}
