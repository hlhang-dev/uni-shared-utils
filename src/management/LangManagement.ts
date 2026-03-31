import { LocaleType, locales, LangPack } from '../locales'
import { LangKey } from '../definition/LangKey'

export class LangManagement {
  private static _instance: LangManagement
  private currentLocale: LocaleType = 'zh-CN'
  private customLangPack?: Partial<LangPack>

  private constructor() {}

  public static getInstance(): LangManagement {
    if (!this._instance) {
      this._instance = new LangManagement()
    }
    return this._instance
  }

  public setLocale(locale: LocaleType): void {
    this.currentLocale = locale
  }

  public getLocale(): LocaleType {
    return this.currentLocale
  }

  public setCustomLangPack(langPack: Partial<LangPack>): void {
    this.customLangPack = langPack
  }

  public clearCustomLangPack(): void {
    this.customLangPack = undefined
  }

  public t(key: LangKey): string {
    if (this.customLangPack && this.customLangPack[key]) {
      return this.customLangPack[key]!
    }
    
    const langPack = locales[this.currentLocale]
    return langPack[key] || key
  }

  public getCurrentLangPack(): LangPack {
    return locales[this.currentLocale]
  }

  public getAllLocales(): LocaleType[] {
    return Object.keys(locales) as LocaleType[]
  }
}
