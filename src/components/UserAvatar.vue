<template>
  <img v-if="img" :src="img" alt="">
  <template v-else-if="sex">
    <img v-if="sex === 'other'" :src="'../img/default-ava-other.jpg'" alt="">
    <img v-else :src="sex === 'male' ? '../img/default-ava-male.jpg' : '../img/default-ava-female.jpg'" alt="">
  </template>
  <template v-else>
    <img :src="'../img/default-ava-default.jpg'" alt="">
  </template>
</template>

<script>

import {defineComponent} from "vue"

export default defineComponent( {
  props: ['img', 'sex']
})
</script>