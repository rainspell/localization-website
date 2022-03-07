<template>
  <div class="px-5 text-lg">
    <section class="py-2 flex items-center space-x-2">
      <label>Category</label>
      <select v-model="currentCategory">
        <option
          v-for="category of categoryStore.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <button
        class="px-2 py-1 text-sm border rounded"
        :disabled="categoryStore.categories.length <= 1"
        @click="categoryStore.delete(currentCategory); currentCategory = categoryStore.categories[0].id"
      >
        Delete Category
      </button>

      <span>Key</span>

      <input
        v-model="keyId"
        class="border rounded"
      >

      <button
        class="px-2 py-1 text-sm border rounded"
        :disabled="keyId.length === 0"
        @click="store.add(keyId, currentCategory, 'text')"
      >
        Add
      </button>
    </section>

    <section>
      <p>Keys ({{ keys.length }})</p>
      <ul>
        <li
          v-for="key of keys"
          :key="key.id"
        >
          <span>{{ key.id }}</span>
          <button
            class=""
            @click="store.delete(key.id)"
          >
            Remove
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref, Ref } from 'vue';
import { useKeyStore, ILocalizationKey } from '@/keys';
import { useCategoryStore } from '@/categories';

// -----------------------------------------------------------------------------
//  HomePage
// -----------------------------------------------------------------------------
export default defineComponent({
  name: 'HomePage',
  // ---------------------------------------------------------------------------
  //  Components
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  //  Props
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  //  Composition API
  // ---------------------------------------------------------------------------
  setup() {
    const store = useKeyStore();
    const keyId: Ref<string> = ref('');
    const categoryStore = useCategoryStore();
    const currentCategory: Ref<string> = ref('common');
    const keys: ComputedRef<ILocalizationKey[]> = computed(() => {
      return categoryStore.getKeys(currentCategory.value);
    });

    categoryStore.add('Common');
    categoryStore.add('Other 1');
    categoryStore.add('Dashboard');
    
    return {
      store,
      keyId,
      keys,
      categoryStore,
      currentCategory,
      version: APP_VERSION
    };
  }
});
</script>