<template>
  <div class="loader-on-block bg-dark" v-if="loaderStatus.loaderStatus">
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import {loaderStore} from "../store/loader";

export default defineComponent({
  setup() {
    const loaderStatus = loaderStore();

    return {
      loaderStatus,
    }
  }
})
</script>


<style scoped>

.loader {
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dot {
  width: 10px;
  height: 10px;
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  float: left;
  margin: 0 5px;
  transform: scale(0);
  -webkit-animation: fx 1000ms ease infinite 0ms;
  animation: fx 1000ms ease infinite 0ms;
}

.dot:nth-child(2) {
  -webkit-animation: fx 1000ms ease infinite 300ms;
  animation: fx 1000ms ease infinite 300ms;
}

.dot:nth-child(3) {
  -webkit-animation: fx 1000ms ease infinite 600ms;
  animation: fx 1000ms ease infinite 600ms;
}

@-webkit-keyframes fx {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fx {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loader-on-block {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>