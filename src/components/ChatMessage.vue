<template>
  <div class="chat-message" :class="isMine ? 'my-message' : ''">
    <div class="chat-inner"><span>{{ text }}</span>
      <span class="timeSent">{{ timeSent }}</span>
      <svg fill="#17A1FA" v-if="newMessage" style="width:14px;height:14px" viewBox="0 0 24 24">
        <path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
      </svg>
      <svg fill="#17A1FA" v-else style="width:14px;height:14px" viewBox="0 0 24 24">
        <path fill="white"
              d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z"/>
      </svg>
    </div>
  </div>
</template>

<script>

import {defineComponent, computed} from "vue"

export default defineComponent({
  props: {
    text: String,
    isMine: Boolean,
    newMessage: Boolean,
    dateSent: Number
  },
  setup(props) {
    const timeSent = computed(() => {
      let hour = '' + new Date(props.dateSent).getHours(),
          minute = '' + new Date(props.dateSent).getMinutes();

      if (minute.length < 1)
        minute = '0' + minute;

      let ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      minute = minute < 10 ? '0' + minute : minute;
      let strTime = hour + ':' + minute + ' ' + ampm;

      return strTime
    })

    return {timeSent}
  },
})
</script>

<style>

.chat-message {
  width: 100%;
  margin-bottom: 10px;
}

.chat-message .chat-inner {
  background: #2C2C2C;
  width: fit-content;
  padding: 10px 15px;
  border-radius: 20px 20px 20px 0px;

  max-width: 100%;
}

.chat-message .chat-inner > span:first-child {
  overflow-wrap: break-word;
  max-width: 100%;
}

.chat-message.my-message .chat-inner {
  background: #17A1FA;
  margin-left: auto;
  border-radius: 20px 20px 0px 20px;
}

.timeSent {
  display: inline-block;
  font-size: 10px;
  opacity: 0.6;
  padding: 0 5px;
  margin-bottom: -6px;
  line-height: 18px;
  vertical-align: text-bottom;
}

.chat-inner svg {
  position: relative;
  top: 6px;
}

.read {
  display: inline-block;
  font-size: 10px;
  opacity: 0.6;
  margin-bottom: -6px;
  line-height: 12px;
  vertical-align: text-bottom;
}

</style>