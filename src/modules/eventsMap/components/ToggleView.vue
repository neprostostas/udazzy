<template>
  <div
      class="toggle-view bg-blur"
      :class="status ? 'active' : ''"
  >
    <div class="bg"></div>
    <div class="item" @click="changeStatus(false)">{{text1}}</div>
    <div class="item" @click="changeStatus(true)">{{text2}}</div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    status: {
      type: Boolean,
      request: true
    },
    text1: String,
    text2: String,
  },

  setup(){
    function changeStatus(status) {
      this.$emit('changeStatus', status)
    }

    return {
      changeStatus
    }
  }
})
</script>

<style scoped>

.toggle-view {
  position: relative;
  color: #fff;
  display: flex;
  margin-top: 15px;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.toggle-view div {
  width: 50%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: relative;
  z-index: 3;
}

.toggle-view .bg:before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
      93.85deg,
      #492fe7 16.7%,
      rgba(155, 35, 234, 0.962222) 48.06%,
      rgba(247, 21, 237, 0.92) 83.1%
  );
  transition: all 0.3s ease-in-out;
}

.toggle-view.active .bg {
  left: 50%;
}

.toggle-view.active .bg:before {
  left: -50%;
}

.toggle-view .bg {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: var(--radius-sm);
  width: 50%;
  height: 100%;
  transition: all 0.3s ease-in-out;
}

</style>