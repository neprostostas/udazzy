<template>
  <Marker
      :key="index"
      v-for="(m, index) in markersFiltered"
      :options="{
          position: {
            lat: m.position.lat,
            lng: m.position.lng
          },
          icon: m.icon,
          zIndex: m.priority,
          class: m.label.className,
          label: m.label,
          clickable: true
        }"
      @click="showEventDetails(m)"/>
</template>

<script>

import {defineComponent} from "vue";
import { Marker } from "vue3-google-map";

export default defineComponent( {
  components: { Marker },
  props: {
    markersFiltered: Object
  },
  emits: ['showEventDetails'],
  setup(props, {emit}) {
    function showEventDetails(fromDate, toDate) {
      emit("showEventDetails", fromDate, toDate);
    }

    return { showEventDetails }
  },
})
</script>


<style>

</style>