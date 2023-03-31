<template>
  <div class="header mb-30 text-center">
    <a @click="$emit('close')" class="top-bar">
      <div class="go-back absolute"><img src="../assets/img/icons/chevron-left-icon.svg" alt=""></div>
    </a>
    <div class="h4 title">Become a Promoter</div>
  </div>

  <div class="text-center">
    <div class="text h5 mb-30" style="margin-top: 60px;">Only promoters allowed to create events. So you need to upgrade your account before</div>

    <router-link to="/upgrade" class="btn btn-secondary mt-60">Upgrade Account</router-link>
  </div>


</template>

<script>

import {defineComponent} from "vue"

export default defineComponent({
  emits: ['close'],
})
</script>

<style>



</style>