<template>
  <div class="slider-wrapper" :class="venueInfoActive ? 'active' : 'hidden'">
    <div class="events-slider">
      <div v-for="(event, i) in venue.events" :key="i" class="bg-blur event-item">
        <div class="event-item-inner">
          <div style="overflow: visible" class="p-relative">
          <div class="top-wrapper">
            <div>{{ new Date(event.datetime).getDate() }} {{ months[new Date(event.datetime).getMonth()] }} {{ new Date(event.datetime).getFullYear() }}</div>
          </div>
          <div class="event-title-wrapper">
            <div class="img-wrapper">
              <img :src="event.icon.url" alt="">
            </div>
            <div class="text-wrapper">
              <div class="title">{{ event.name }}</div>
              <div class="text color-gray">{{ event.type }}<span v-for="music in event.music" :key="music">, {{ music }}</span></div>
            </div>
          </div>
          <div class="description">{{ event.description }}</div>
            <router-link :to="{ name: 'EventDetails', params: { id: event.id }}" class="more-info-btn text-md color-primary">
              More Info
              <svg style="width:18px;height:18px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
              </svg>
            </router-link>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";

export default defineComponent( {
  props: {
    venueInfoActive: Boolean,
    venue: Object
  },
  emits: [],
  setup() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return { months }
  },
})

</script>

<style scoped>
  .slider-wrapper {
    transform: translate(-100%, 0);
    opacity: 0;
    transition: all .35s;
   }
  .slider-wrapper.active {
    transform: translate(0, 0);
    opacity: 1;
  }
  .slider-wrapper.hidden {
    opacity: 0;
  }

  .slider-wrapper {
    overflow-x: scroll;
    padding-top: 8px;
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 30px;
    padding-right: 30px;

    position: fixed;
    bottom: 90px;
    left: 0;
    right: 0;
  }
  .events-slider {
    width: max-content;
    white-space: nowrap;
    display: flex;
  }
  .event-item {
    display: inline-block;
    width: 70vw;
    /*background: #1C1C1C;*/

    overflow: hidden;
    border-radius: var(--radius);
    margin-right: 8px;
  }
  .event-item-inner {
    padding: 15px 20px;
  }

  .event-title-wrapper {
    margin-left: -10px;
    display: flex;
    align-items: center;
  }
  .event-item .title {
    font-size: 17px;
    line-height: 22px;
  }
  .event-title-wrapper .img-wrapper {
    height: 45px;
    width: 45px;
    margin-left: -15px;
    margin-right: -15px;
  }
  .event-title-wrapper .img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .event-item .text-wrapper {
    padding-left: 5px;
    line-height: 1em;
    letter-spacing: 0.05em;
    width: 100%;
    overflow: hidden;
  }
  .event-item .text-wrapper .title {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .event-item .text-wrapper .text {
    font-weight: 400;
    font-size: 10px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.5);
  }
  .event-item .description {
    font-size: 11px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 5px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .event-item .top-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .event-item .top-wrapper span.color-primary {
    color: var(--color-primary);
    font-weight: 800;
  }
  .event-item .top-wrapper div:first-child span {
    letter-spacing: -0.1em;
  }

  .event-item .close {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 100%;
  }

  .more-info-btn {
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    line-height: 15px;
    font-size: 14px;
    text-decoration: underline;
  }
  .more-info-btn svg {
    margin-left: 2px;
  }
</style>