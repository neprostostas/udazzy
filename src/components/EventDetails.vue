<template>
  <div class="eventDetails bg-blur" :class="active ? 'active' : 'hidden'">
    <div class="close" @click="[active = !active, $emit('close')]"></div>
    <div class="p-relative" style="overflow: visible">
      <div class="top-wrapper mb-25">
        <div>{{ eventDate }}</div>
        <div v-if="(event.participants_joined.male >= event.participants.male && event.participants.male !== -1) && (event.participants_joined.female >= event.participants.female && event.participants.female !== -1) && (event.participants_joined.other >= event.participants.other && event.participants.other !== -1)" class="crowded">
          <div class="color-secondary">CROWDED</div>
        </div>
        <div v-else class="participants d-flex">
          <div>
            <div v-for="(value, key) in event.participants" :key="key" style="margin-right: 5px;">
              <div v-if="event.participants_joined[key] !== 0">
                <GenderIcon :gender="key" />
                <span>{{event.participants_joined[key]}}</span>
                <span v-if="value === -1" class="color-gray">/∞</span>
                <span v-else class="color-gray">/{{ value }}</span>
              </div>
            </div>
          </div>
        </div>
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
      <router-link :to="{ name: 'EventDetails', params: { id: event.id }}" class="btn btn-primary btn-sm">More Info</router-link>
    </div>
  </div>
</template>

<script>

import {defineComponent, computed, ref, watch} from "vue";
import {printDate} from "@/components/js/printDate";
import GenderIcon from "@/modules/eventsMap/components/GenderIcon";

export default defineComponent( {
  components: { GenderIcon },
  props: {
    eventInfoActive: Boolean,
    event: {},
  },
  emits: ['close'],
  setup(props) {

    const eventInfoActive = computed(() => props.eventInfoActive)
    let active = ref(props.eventInfoActive)
    const eventDate = printDate(props.event.datetime)

    watch(eventInfoActive, (val) => {
      active.value = val
    })

    return { eventDate, active }
  },
})

</script>

<style>

.eventDetails {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  background: #1C1C1C;
  border-radius: calc(var(--radius) * 1.5) calc(var(--radius) * 1.5) 0 0;
  padding: 35px 25px 60px;
}
.eventDetails:before {
  content: '';
  position: absolute;
  top: 15px;
  left: 50%;
  margin-left: -15px;
  height: 4px;
  width: 30px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.event-title-wrapper {
  margin-left: -10px;
  display: flex;
  align-items: center;
}
.eventDetails .title {
  font-size: 19px;
  margin-bottom: 6px;
}
.eventDetails .text-wrapper {
  padding-left: 5px;
  line-height: 1em;
  letter-spacing: 0.05em;
}
.eventDetails .text-wrapper .text {
  font-weight: 400;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}
.eventDetails .description {
  font-size: 13px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.eventDetails .top-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.eventDetails .top-wrapper span.color-primary {
  color: var(--color-primary);
  font-weight: 800;
}
.eventDetails .top-wrapper div:first-child span {
  letter-spacing: -0.1em;
}

.eventDetails {
  transform: translate(0, 100%);
  transition: all .3s;
}
.eventDetails.active {
  transform: translate(0, 0);
  transition: all .3s;
}
.eventDetails.hidden {
  transform: translate(0, calc(100% - 65px));
}

.eventDetails .close {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
}
</style>