<template>
  <li @click="read = true" :class="{ read: read }">
    <div class="wrapper">

      <div class="img-wrapper">
          <img :src="img" alt="img">

          <img class="icon" v-if="icon === 'accept'" src="../assets/icons/accept.svg" alt="accept">
          <img class="icon" v-if="icon === 'decline'" src="../assets/icons/decline.svg" alt="decline">
          <img class="icon" v-if="icon === 'pause'" src="../assets/icons/pause.svg" alt="pause">
          <img class="icon" v-if="icon === 'love'" src="../assets/icons/love.svg" alt="love">
          <img class="icon" v-if="icon === 'share'" src="../assets/icons/share.svg" alt="share">
          <img class="icon" v-if="icon === 'chat'" src="../assets/icons/chat.svg" alt="chat">
          <img class="icon" v-if="icon === 'like'" src="../assets/icons/like.svg" alt="like">

      </div>

      <section>
        <div class="desc">

        <p class="text-notification">{{text}}</p>
        <p class="time-notification">{{time}} hours</p>

        </div>
      </section>

      <img class="three-dots" src="../assets/icons/three-dots.svg" alt="three-dots">

    </div>
  </li>
</template>

<script>

import {defineComponent, ref} from "vue";

export default defineComponent({
  components: {},
  props: {
    text: String,
    time: Number,
    img: String,
    icon: String,
  },
  setup() {

    const read = ref()

    return {
      read
    }
  },
})

</script>

<style>

li {
  list-style: none;
  padding: 20px;
}

.read {
  /*background: #272727;*/
}

.three-dots {
  cursor: pointer;
  padding-left: 15px;
}

.text-notification {
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.time-notification {
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.wrapper {
  display: flex;
}

li:not(:last-child) {
  margin-bottom: 0!important;
  border-bottom: none!important;
}

.img-wrapper {
  width: 65px;
  min-width: 65px;
  align-items: flex-start;
}

.img-wrapper img {
  border-radius: 50%;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.icon {
  border-radius: 0;
  height: 26px!important;
  position: relative;
  top: 30px;
  right: 20px;
}

</style>