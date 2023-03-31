<template>

  <div v-if="!events?.length" class="not-found">
    <div class="h4 text">There are no your Events(</div>
  </div>

  <div class="list">
    <ul v-if="events?.length">

      <DashboardListItem
          :key="index"
          v-for="(event, index) in events"
          :name="event.name"
          :address="event.place.address"
          :participants="event.participants"
          :participants_joined="event.participants_joined"
          :age="event.age_limit"
          :music="event.music"
          :alcohol="event.without_alcohol"
          :managerName="event.manager.name"
          :datetime="event.datetime"
      />

    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import DashboardListItem from "@/modules/dashboardPage/components/DashboardListItem";

export default defineComponent({
  components: { DashboardListItem },
  props: {
    events: {}
  },
  setup() {

    return {

    };
  },
});
</script>

<style scoped>
.list {
  /*height: calc(100vh - 200px);*/
  padding-top: 0;
  overflow-y: scroll;
  padding-bottom: 100px;
}

.list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.list {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.list li {
  padding: 10px 20px;
}

@media (min-width: 740px) {
  .list ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .list ul {
    grid-template-columns: repeat(3, 1fr);
  }
}

li:not(:last-child) {
  margin-bottom: 15px;
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