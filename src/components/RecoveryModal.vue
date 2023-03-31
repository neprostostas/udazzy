<template>

  <div class="overlay" @click="$emit('close')"></div>
  <div class="recovery-wrapper">

    <h3>Your account is in deleted period.</h3>
    <p>Do you want to recovery <br> your UDAZZY account?</p>

    <div class="button-group">
      <!-- add function api to backend on click "Yes" -->
      <button class="recover-modal-button" @click="$emit('close')">Yes</button>
      <button class="cancel-modal-button" @click="$emit('close')">No</button>
    </div>

  </div>

</template>

<script>

import {defineComponent} from "vue";

export default defineComponent({
  components: {},
  props: {

  },
  emits: ['close'],
  setup() {



    return {

    };
  },
})
</script>


<style scoped>

.overlay {
  z-index: 991;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.35);
}

.recovery-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  justify-items: center;

  z-index: 992;
  width: 350px;
  height: 400px;
  padding: 20px;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #FFFFFF;
  background: rgba(157, 157, 157, 0.69);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgba(157, 157, 157, 0.3);
}

.button-group {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
  align-items: center;
  width: -webkit-fill-available;
}

.recover-modal-button, .cancel-modal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-weight: 700;
  height: 48px;
  line-height: 48px;
  font-size: 1.1em;
  transition: all .3s linear;
}

.recover-modal-button {
  position: relative;
  z-index: 1;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: 14px;
}


.cancel-modal-button {
  position: relative;
  z-index: 1;
  background: linear-gradient(269.98deg, #E914E1 1.49%, #4A2FE7 97.33%);
  border-radius: 14px;
  line-height: 56px;
}

.cancel-modal-button:before {
  position: absolute;
  z-index: -1;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  content: '';
  background-color: #414141;
  border-radius: calc(14px * .75);
  box-shadow: inset 0 0 8px 8px rgba(147, 35, 228, 0.1);
}

.cancel-modal-button:after {
  opacity: 0.8;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: linear-gradient(94.01deg, rgba(73, 47, 231, 0.5) 16.65%, rgba(247, 21, 237, 0.46) 83.76%);
  filter: blur(8px);
  border-radius: 14px;
}

.slide-fade-enter-active {
  transition: all 0.4s;
}

.slide-fade-leave-active {
  transition: all 0.4s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

</style>