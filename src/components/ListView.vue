<template>
  <div style="background: red" v-if="markers_filtered.length" class="sort-wrapper">
    <div class="text">{{markers_filtered.length}} Events nearby</div>
    <div class="sort-by">
      <ListSorting @sortBy="(val) => sortBy(val)" :sort-options="sortOptions" :sortOptionsSelected="sortOptionsSelected" />
    </div>
  </div>
  <div v-else class="not-found">
    <div class="h4 text">There are no events matching your parameters :(</div>
    <div @click="$emit('filterReset')" class="btn btn-secondary">Reset filters</div>
  </div>
  <div class="list">
    <ul style="display: none">
      <ListItem :key="index" v-for="(m, index) in markers_filtered"
                :title="m.title"
                :music="m.music"
                :event-type="m.type"
                :description="m.description"
                :icon="m.icon"
                :label="m.label"
                :datetime="m.datetime"
                :participants="m.participants"
                :participants_joined="m.participants_joined"
                :ImAParticipant="m.ImAParticipant"
                :isNightEvent="m.isNightEvent"
      />
    </ul>
  </div>
</template>

<script>

import ListItem from "@/modules/eventsMap/components/ListItem";
import ListSorting from "@/components/ListSorting";
import {defineComponent, watch, ref, computed} from "vue";
import distanceBetweenCoordinates from "@/components/js/distanceBetweenCoordinates";

export default defineComponent({
  components: {ListItem, ListSorting},
  props: {
    markersFiltered: Object,
    currPos: Object
  },
  emits: ['filterReset'],
  setup(props) {
    const markers_filtered = computed(() => props.markersFiltered)

    const sortOptions = [
      'Recommended',
      'By Date',
      'More Participants',
      'Less Participants',
      'Closest to me'
    ]

    const sortOptionsSelected = ref(sortOptions[0])

    function sortBy(val) {
      if(val === 'Recommended') {
        markers_filtered.value.sort( ( a, b ) => {
          if ( a.priority > b.priority ){
            return -1;
          }
          if ( a.priority < b.priority ){
            return 1;
          }
          return 0;
        });
      }
      if(val === 'More Participants') {
        markers_filtered.value.sort( ( a, b ) => {
          if ( a.participants > b.participants ){
            return -1;
          }
          if ( a.participants < b.participants ){
            return 1;
          }
          return 0;
        });
      }
      if(val === 'Less Participants') {
        markers_filtered.value.sort( ( a, b ) => {
          if ( a.participants < b.participants ){
            return -1;
          }
          if ( a.participants > b.participants ){
            return 1;
          }
          return 0;
        });
      }
      if(val === 'By Date') {
        markers_filtered.value.sort( ( a, b ) => {
          if ( new Date(a.date) < new Date(b.date) ){
            return -1;
          }
          if ( new Date(a.date) > new Date(b.date) ){
            return 1;
          }
          return 0;
        });
      }
      if(val === 'Closest to me') {
        markers_filtered.value.sort( ( a, b ) => {
          if ( distanceBetweenCoordinates(a.position, props.currPos) < distanceBetweenCoordinates(b.position, props.currPos) ){
            return -1;
          }
          if ( distanceBetweenCoordinates(a.position, props.currPos) > distanceBetweenCoordinates(b.position, props.currPos) ){
            return 1;
          }
          return 0;
        });
      }
    }

    watch(markers_filtered, () => {
      sortBy(sortOptionsSelected.value)
    })

    return {sortBy, markers_filtered, sortOptions, sortOptionsSelected}
  },
})

</script>

<style>
  .list {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 200px;
  }

  li:not(:last-child) .desc {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
  li:not(:last-child) {
    margin-bottom: 15px;
  }

  .sort-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
  }
  .sort-wrapper .text {
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.5);
  }
  .not-found {
    height: 100%;
    padding-bottom: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .not-found .text {
    margin-bottom: 30px;
    text-align: center;
  }
</style>