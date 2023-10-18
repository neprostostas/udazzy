<template>

  <div class="no-internet">

    <p>No internet <br> connection...</p>

  </div>

</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  components: {},
  props: {},
  setup() {


    return {

    }
  },
})

</script>

<style>

.no-internet {
  display: none;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  background: #1C1C1C;
  position: fixed;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  padding-top: 30vh;
}

.no-internet.active {
  display: unset;
}

</style>