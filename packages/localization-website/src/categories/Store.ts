import type { ICategory } from './Dtos';

import { defineStore } from 'pinia';
import { useKeyStore } from '@/keys';

/**
 * TBD
 */
export const useCategoryStore = defineStore('categories', {
  state: () => ({
    categories: <ICategory[]>[]
  }),
  getters: {
    getKeys: () => {
      return (categoryId: string) => useKeyStore().keys.filter(k => k.categoryId === categoryId)
    }
  },
  actions: {
    add(categoryName: string): ICategory {
      const category: ICategory = {
        id: categoryName.toLowerCase().replace(/ /g, '-'),
        name: categoryName
      };

      this.categories.push(category);
      return category;
    },
    delete(categoryId: string) {
      const index: number = this.categories.findIndex(c => c.id === categoryId);
      
      if (index >= 0) {
        const keyStore = useKeyStore();
        const keysToDelete: string[] = keyStore.keys.filter(k => k.categoryId === categoryId).map(k => k.id);

        for (const key of keysToDelete) {
          keyStore.delete(key);
        }

        this.categories.splice(index, 1);
      }
    }
  }
});