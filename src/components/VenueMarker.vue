<template>
  <div v-if="data" class="venue" :class="data.label.className" :style="hide_marker ? 'opacity: 0' : 'opacity: 1'">
    <div class="venue-icon">
      <img :src="data.icon.url" alt="">
    </div>
    <div class="venue-desc">
      <div class="title">{{ data.name }}</div>
      <div class="text-xs color-light-05">Events here: <span style="margin-left: 3px;" class="text-md color-white">{{ data.events.length }}</span></div>
    </div>
  </div>
</template>

<script>

import {defineComponent, ref, watch} from "vue";

export default defineComponent( {
  props: {
    data: Object,
    active: Boolean
  },
  emits: ['showEventsInVenue'],
  setup(props, {emit}) {
    const hide_marker = ref(true);

    watch(props, () => {
      hide_marker.value = true
      setTimeout(() => {
        hide_marker.value = false
      }, 50)
    })

    function showEventsInVenue(venue) {
      emit("showEventsInVenue", venue);
    }

    return { showEventsInVenue, hide_marker }
  },
})
</script>


<style scoped>

.venue {
  opacity: 0;
}

.venue {
  position: relative;
  height: 65px;
  width: 65px;
  transform: translate(0, 50%);
  transition: opacity .25s ease-in;
}
.venue-desc {
  background: #151515 !important;

  position: absolute;
  z-index: -1;
  left: 33px;
  top: 50%;
  transform: translate(0, -50%);
  width: fit-content;
  height: 36px;

  padding: 4px 8px;
  padding-left: 25px;
  border: 1.5px solid #FDF95A;
  border-radius: 0 25px 25px 0;

  line-height: 13px;
  letter-spacing: -0.07em;
  text-align: left;

  transition: all .9s;
}

.venue-desc .title {
  color: #FDF95A !important;
  font-weight: 500;
  font-size: 10px !important;
}

.venue-desc > div {
  white-space: nowrap;
}

.venue .venue-icon {
  height: 100%;
  width: 100%;
}

.venue.venue-collapsed {
  width: 30px;
  height: 30px;
}

.venue.venue-collapsed .venue-desc {
  display: none;
}
</style>