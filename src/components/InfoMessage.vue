<template>
  <div class="message-popup" :class="[message.active ? 'active' : '', message.size === 'small' ? 'small' : 'big']">
    <div v-touch:swipe="hideAlert" @click="hideAlert" class="message text-center" :class="message.type">
      <img v-if="message.type === 'success'" src="../assets/img/icons/message-icon-success.svg" alt="">
      <img v-if="message.type === 'danger'" src="../assets/img/icons/message-icon-danger.svg" alt="">
      <div class="text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>

import {defineComponent, ref} from "vue"

export default defineComponent({
  expose: ['showAlert', 'hideAlert'],
  setup() {
    const message = ref({
      active: false,
      text: '',
      type: 'success',
      size: 'small'
    });

    function showAlert(text = '', type = 'info', size = 'small', timeout = 6000) {

      message.value = {
        active: true,
        text: text,
        type: type,
        size: size
      }
      setTimeout(() => {
        message.value.active = false
      }, timeout)
    }

    function hideAlert() {
      message.value.active = false
    }

    return {showAlert, hideAlert, message}
  },
  emits: ['close'],
})
</script>

<style>
.message-popup {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  transform: translate(0, -100px);
  transition: all .35s ease-in-out;
}

.message-popup.active {
  opacity: 1;
  visibility: visible;
  transform: translate(0, 0);
}

.message-popup.big:before {
  content: '';
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.7);
  backdrop-filter: blur(5px);
  transition: 0s;
}

.message {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 85%;
  transform: translate(-50%, 0);
  background: linear-gradient(86.18deg, #979797 4.98%, #6CABBF 51.62%, #5FA785 99.05%);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);

  border-radius: 12px;
}

.message-popup.small .message {
  text-align: center;
  padding: 10px 25px;
  padding-left: 50px;
}

.message-popup.big .message img {
  margin: auto;
  margin-bottom: 10px;
}

.message-popup.small .message img {
  position: absolute;
  left: 15px;
  top: 50%;
  margin-top: -12px;
}

.message .text {
  font-weight: 400;
  font-size: 17px;
  line-height: 28px;
}

@media (max-width: 400px) {
  .message .text {
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
  }
}

.message-popup.big .message {
  padding: 30px;
}

.message.success {
  background: rgba(247, 21, 237, 0.92);
}

.message.danger {
  background: linear-gradient(88.08deg, #979797 3.6%, #C089BA 49.28%, #FB6767 104.16%);
}
</style>