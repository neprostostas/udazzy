<template>
  <div class="online-status" v-if="!isItMe || show">
    <div :class="{ greenCircle: online, redCircle: !online }"></div> {{online ? 'Online' : 'Offline'}}
  </div>
</template>

<script>

import {computed, defineComponent} from "vue";

export default defineComponent({

  props: {
    uri: String,
    online: Boolean,
    show: Boolean,
  },

  setup(props) {

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    return {
      isItMe,
    }
  }
})

</script>

<style scoped>

.online-status {
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: start;
  gap: 6px;
  position: absolute;
  bottom: 2%;
  margin-left: 15px;
}

.greenCircle {
  display: inline-block;
  background: #60C550;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.redCircle {
  display: inline-block;
  background: #FBBC05;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

</style>