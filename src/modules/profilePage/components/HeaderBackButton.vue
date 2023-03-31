<template>
  <router-link :to="back" class="go-back absolute">
    <img :src="require('../../../assets/img/icons/chevron-left-icon.svg')" alt="chevron-left-icon">

  </router-link>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({

  setup() {
    const back = window.history.state.back;

    return {
      back
    }
  }
})

</script>

<style scoped>

</style>