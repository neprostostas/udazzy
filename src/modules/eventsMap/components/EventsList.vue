<template>
  <div class="sort-wrapper">
    <div class="text">{{ itemsComputed.length }} Events nearby</div>
    <div class="sort-by">
      <ListSorting
          @sortBy="(val) => sortBy(val)"
          :sort-options="sortOptions"
          :sortOptionsSelected="sortOptionsSelected"
      />
    </div>
  </div>

  <div class="list list-events-items">
    <ul v-if="itemsComputed.length">

      <ListItem
          :key="index"
          v-for="(item, index) in itemsComputed"
          :type="'Event'"
          :title="item.name"
          :event-music="item.music"
          :event-type="item.type"
          :description="item.description"
          :icon="item.icon"
          :label="item.label"
          :datetime="item.datetime"
          :place="item.place"
          :participants="item.participants"
          :participants_joined="item.participants_joined"
          :ImAParticipant="item.ImAParticipant"
          :isNightEvent="item.isNightEvent"
          @click="$emit('showEventDetails', item)"
      />

    </ul>
  </div>
</template>

<script>
import ListItem from "@/modules/eventsMap/components/ListItem";
import ListSorting from "@/components/ListSorting";
import {defineComponent, watchEffect, ref, watch} from "vue";
import distanceBetweenCoordinates from "@/components/js/distanceBetweenCoordinates";

export default defineComponent({
  components: {ListItem, ListSorting},
  props: {
    venues: Array,
    currPos: Object,
  },
  emits: ["filterReset", "showEventDetails"],
  setup(props) {
    const itemsComputed = ref([]);

    const sortOptions = [
      "Recommended",
      "By Date",
      "More Participants",
      "Less Participants",
      "Closest to me",
    ];


    const sortOptionsSelected = ref(sortOptions[0]);

    function sortBy(val) {

      if (val === "By Date") {
        itemsComputed.value.sort((a, b) => {
          if (new Date(a.datetime) > new Date(b.datetime)) {
            return 1;
          }
          if (new Date(a.datetime) < new Date(b.datetime)) {
            return -1;
          }
          return 0
        })
      }

      if (val === "Recommended") {
        itemsComputed.value.sort((a, b) => {
          if (a.priority > b.priority) {
            return -1;
          }
          if (a.priority < b.priority) {
            return 1;
          }
          return 0;
        });
      }

      if (val === "More Participants") {
        itemsComputed.value.sort((a, b) => {
          if ((a.participants_joined.male + a.participants_joined.female + a.participants_joined.other) > (b.participants_joined.male + b.participants_joined.female + b.participants_joined.other)) {
            return -1;
          }
          if ((a.participants_joined.male + a.participants_joined.female + a.participants_joined.other) < (b.participants_joined.male + b.participants_joined.female + b.participants_joined.other)) {
            return 1;
          }
          return 0;
        });
      }
      if (val === "Less Participants") {
        itemsComputed.value.sort((a, b) => {
          if ((a.participants_joined.male + a.participants_joined.female + a.participants_joined.other) < (b.participants_joined.male + b.participants_joined.female + b.participants_joined.other)) {
            return -1;
          }
          if ((a.participants_joined.male + a.participants_joined.female + a.participants_joined.other) > (b.participants_joined.male + b.participants_joined.female + b.participants_joined.other)) {
            return 1;
          }
          return 0;
        });
      }

      if (val === "Closest to me") {
        itemsComputed.value.sort((a, b) => {
          if (
              distanceBetweenCoordinates(a.position, props.currPos) <
              distanceBetweenCoordinates(b.position, props.currPos)
          ) {
            return -1;
          }
          if (
              distanceBetweenCoordinates(a.position, props.currPos) >
              distanceBetweenCoordinates(b.position, props.currPos)
          ) {
            return 1;
          }
          return 0;
        });
      }

    }

    watchEffect(() => {
      let arr = []

      props.venues.forEach(venue => {

        venue.events.forEach((event) => {

          arr.push(event)

        })

      });
      itemsComputed.value = arr
    });

    watch(itemsComputed, () => {
      sortBy(sortOptionsSelected.value);
    })

    return {sortBy, itemsComputed, sortOptions, sortOptionsSelected};
  },
});
</script>

<style scoped>
.list {
  height: calc(100vh - 284px);
  overflow-y: scroll;
  padding-bottom: 100px;
}

.list-events-items {
  padding-top: 10px;
}

.list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.list {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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