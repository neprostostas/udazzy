<template>
  <div v-if="isItMe === false" @click="$emit('close')" class="more-button">
    <img :src="require('@/modules/profilePage/assets/icons/three-dots.svg')" alt="three-dots">
  </div>
</template>

<script>

import {computed, defineComponent} from "vue";

export default defineComponent({

  props: {
    uri: String,
  },

  emits: ['close'],

  setup(props) {

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    return {
      isItMe,
    }
  }
})

</script>

<style scoped>

.more-button {
  position: absolute;
  z-index: 9;
  padding: 17px;
  top: 44px;
  right: 0;
}

.more-button:hover {
  cursor: pointer;
}

</style>