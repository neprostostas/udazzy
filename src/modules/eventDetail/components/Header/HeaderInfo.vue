<template>
  <div class="header-info">
    <span v-if="name !== undefined" class="header-info-title">{{ name }}</span>
    <span v-if="!name" class="header-info-title">{{ state.allEventData.name }}</span>
    <div class="header-info-wrap" :class="{ name: name !== undefined }">
      <span class="header-club-type">{{ state.allEventData.type }}</span>
      <span class="header-info-name">{{ state.allEventData.place?.name }}</span>
      <div class="header-music-wrap">
        <img src="../../assets/icons/ic_music-type.svg" alt="music-icon">
        <span :key="music" v-for="music in state.allEventData.music" class="header-music-type">
          {{ music.toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {useEventStore} from "@/modules/eventDetail/store/event";

export default {
  name: "HeaderInfo",

  props: {
    name: String
  },

  setup() {
    const state = useEventStore();

    return {
      state,
    }
  }

}
</script>

<style scoped>

.header-info {
  pointer-events: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  height: 100%;
  padding-top: 40px;
  z-index: 2;
}

.header-info-title {
  font-weight: 900;
  font-size: 32px;
  line-height: 40px;
  line-break: anywhere;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
}

.header-info-wrap {
  display: flex;
  flex-direction: column;
}

.header-info-wrap.name {
  padding-top: 100px;
}

.header-club-type {
  font-weight: 600;
}

.header-info-name {
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.header-music-type {
  font-weight: 600;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.header-music-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.header-music-wrap img {
  border-radius: 100%;
  animation: animate-pulse 3s linear infinite;
}

@keyframes animate-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  }

  30% {
    box-shadow: 0 0 0 7px rgba(184, 95, 236, 0.2);
  }

  70% {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  100% {
    box-shadow: 0 0 0 14px rgba(184, 95, 236, 0.2);
  }
}

</style>