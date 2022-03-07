import type { ILocalizationKey, LocalizationKeyType } from './Dtos';

import { defineStore } from 'pinia';

/**
 * TBD
 */
export const useKeyStore = defineStore('keys', {
  state: () => ({
    keys: <ILocalizationKey[]>[]
  }),
  actions: {
    add(keyId: string, categoryId: string, keyType: LocalizationKeyType): ILocalizationKey {
      const key: ILocalizationKey = {
        id: keyId,
        categoryId,
        type: keyType,
        value: {}
      };

      this.keys.push(key);
      return key;
    },
    delete(keyId: string): void {
      const index: number = this.$state.keys.findIndex(k => k.id === keyId);

      if (index >= 0) {
        this.$state.keys.splice(index, 1);
      }
    }
  }
});