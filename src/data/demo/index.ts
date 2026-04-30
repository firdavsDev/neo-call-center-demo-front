import { useLanguageStore } from '../../store/languageStore'
import type { DemoTimeline } from '../demoTimeline'
import { DEMO_TIMELINE_UZ } from './timeline.uz'
import { DEMO_TIMELINE_RU } from './timeline.ru'
import { DEMO_TIMELINE_EN } from './timeline.en'

export function useDemoTimeline(): DemoTimeline {
  const lang = useLanguageStore((s) => s.lang)
  if (lang === 'ru') return DEMO_TIMELINE_RU
  if (lang === 'en') return DEMO_TIMELINE_EN
  return DEMO_TIMELINE_UZ
}
