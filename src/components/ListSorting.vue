<template>
  <div class="select-wrapper">
    <select class="sort" @change="$emit('sortBy', $event.target.value)">
      <option v-for="(option, index) in sortOptions" :key="index" :value="option" :selected="option === optionSelected">{{ option }}</option>
    </select>
  </div>
</template>

<script>

import {defineComponent, computed} from "vue";

export default defineComponent({
  props: {
    sortOptions: Array,
    sortOptionsSelected: String
  },
  emits: ['sortBy'],
  setup(props) {
    const optionSelected = computed(() => props.sortOptionsSelected);

    return {optionSelected}
  },
})

</script>

<style>
  .sort {
    background: transparent;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9em;
    font-weight: 400;
  }
  .sort option {
    color: var(--color-dark);
  }
</style>