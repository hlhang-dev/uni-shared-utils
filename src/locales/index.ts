import { zhCN, LangPack } from './zh-CN'
import { zhTW } from './zh-TW'
import { enUS } from './en-US'
import { jaJP } from './ja-JP'

export type LocaleType = 'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP'

export const locales: Record<LocaleType, LangPack> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS,
  'ja-JP': jaJP
}

export { LangPack } from './zh-CN'
export { zhCN, zhTW, enUS, jaJP }
