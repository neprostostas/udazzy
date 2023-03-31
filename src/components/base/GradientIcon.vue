<template>
    <div class="wrapper">
      <div
          :style=styles
          class="icon-wrap">
        <div>
          <img :style=stylesImg class="icon-img" :src="src" alt="edit-icon">
        </div>
      </div>
      <template v-if="text">
        <p class="text">{{ text }}</p>
      </template>
    </div>
</template>

<script>
import {defineComponent} from "vue";
import {useEventStore} from "@/modules/eventDetail/store/event";

export default defineComponent({
  props: {
    src: {
      required: true
    },
    text: String,
    width: String,
    height: String,
    boxShadow: String,
    widthImg: String,
    heightImg: String,
    borderRadius: String,
  },

  setup(props) {
    const event = useEventStore();

    const styles = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      'box-shadow': `0 0 ${props.boxShadow}px rgba(255, 255, 255, 0.5)`
    }

    const stylesImg = {
      width: `${props.widthImg}px`,
      height: `${props.heightImg}px`,
      borderRadius: `${props.borderRadius}%`
    }

    return {
      styles,
      stylesImg,
      event,
    }
  }
})
</script>

<style scoped>

.wrapper {
  display: grid;
  justify-items: center;
  gap: 5px;
}

.text {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.7);
}

.icon-wrap, .icon-wrap div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrap {
  background: linear-gradient(90deg, rgba(73, 47, 231, 1) 0%, rgba(246, 21, 237, 1) 100%);
  border-radius: 50%;
}

.icon-wrap div {
  width: 95%;
  height: 95%;
  background: #1C1C1C;
  border-radius: 50%;
}

.icon-img {
  width: 60%;
}

</style>