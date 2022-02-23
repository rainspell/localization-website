<template>
  <div class="text-lg">
    <h1 class="font-bold">Vue App Template</h1>
    <p>Version: {{ version }}</p>
    <p>
      Count: {{ counter.count }}
      <button class="px-2 border rounded" @click="counter.increment()">
        Increment
      </button>
      <button class="px-2 border rounded" @click="counter.$patch({ count: 0 })">
        Reset
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounterStore } from '../Store';

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
    const counter = useCounterStore();
    
    return {
      counter,
      version: APP_VERSION
    };
  }
});
</script>