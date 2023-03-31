<template>
  <template v-if="sex === 'male'">
    <img :src="require('@/modules/profilePage/assets/icons/ic_male-participants.svg')" alt="male-icon">
  </template>
  <template v-if="sex === 'female'">
    <img :src="require('@/modules/profilePage/assets/icons/ic_female-participants.svg')" alt="female-icon">
  </template>
  <template v-if="sex === 'other'">
    <img :src="require('@/modules/profilePage/assets/icons/ic_other-participants.svg')" alt="other-icon">
  </template>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({

  props: {
    sex: String
  },

  setup() {


    return {
    }
  }
})

</script>

<style scoped>

</style>