<template>
  <div class="info">
    <div class="item">
      <div class="title">About</div>
      <div class="text">{{ state.about }}</div>
    </div>
    <div class="item">
      <div class="title">Sex</div>
      <div class="text">{{ state.sex.charAt(0).toUpperCase() + state.sex.slice(1) }}</div>
    </div>
    <div class="item">
      <div class="title">Age</div>
      <div class="text">{{ yearsOld }} y.o.</div>
    </div>
    <div class="item">
      <div class="title">Instagram</div>
      <div class="text">{{ state.instagram }}</div>
    </div>
    <div class="item">
      <div class="title">Mobile</div>
      <div class="text">{{ phone }}</div>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({

  props: {
    state: {
      about: String,
      sex: String,
      instagram: String,
    },
    phone: String,
    yearsOld: Number
  },

  setup() {


    return {

    }
  }
})

</script>

<style scoped>

  .info {
    margin-top: 15px;
    margin-bottom: 15px;
    padding-top: 15px;
  }

  .info .item {
    padding-bottom: 20px;
  }

  .info .item:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    margin-bottom: 15px;
  }

  .info .item .title {
    margin-bottom: 5px;
    font-size: 13px;
  }

</style>