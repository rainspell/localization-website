import type { ILocale } from './Dtos';

import { defineStore } from 'pinia';

/**
 * TBD
 */
export const useLocaleStore = defineStore('locales', {
  state: () => ({
    locales: <ILocale[]>[]
  }),
  actions: {
    add(name: string, language: string, region?: string): ILocale {
      const locale: ILocale = {
        id: region ? `${language}-${region}` : language,
        name,
        language,
        region
      };

      this.locales.push(locale);
      return locale;
    }
  }
});