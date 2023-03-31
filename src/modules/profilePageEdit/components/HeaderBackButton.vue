<template>
  <router-link :to="{ name: 'ProfilePage'}" class="go-back absolute">
    <img :src="require('../../../assets/img/icons/chevron-left-icon.svg')" alt="chevron-left-icon">

  </router-link>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({

  setup() {


    return {
    }
  }
})

</script>

<style scoped>

</style>