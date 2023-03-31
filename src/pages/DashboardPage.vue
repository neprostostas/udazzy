<template>
  <div class="dashboard-container">

    <ToggleView class="toggle-dashboard" @changeStatus="changeUiOption" :status="uiOptions.listView"
                :text1="'My events'" :text2="'Notification'"/>

    <div class="dashboard-view" :class="uiOptions.listView ? 'active' : ''">
      <div class="wrapper">
        <div class="item my_events" v-touch:swipe.left="swipeScreen('1')">
          <DashboardEventsList :events="myEvents" />
        </div>
        <div class="item notification" v-touch:swipe.right="swipeScreen('2')">
          <NotificationListView />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from "vue";
import {dashboardStore} from "@/modules/dashboardPage/store/dashboard";
import NotificationListView from "@/modules/dashboardPage/components/NotificationListView";
import DashboardEventsList from "@/modules/dashboardPage/components/DashboardEventsList";
import ToggleView from "@/modules/eventsMap/components/ToggleView.vue";

export default defineComponent({
  components: { ToggleView, DashboardEventsList, NotificationListView },
  setup() {
    const myEvents = ref(null);
    const dashboard = dashboardStore();

    const my_events = ref(true)
    const notification = ref(false)

    onBeforeMount(() => {
      dashboard.getMyEvent(myEvents)
    });

    function changeUiOption(status) {
      uiOptions.value.listView = status;
    }

    const uiOptions = ref({
      listView: false,
    });

    function swipeScreen(action) {

      return () => {
        changeScreen(action)
      }
    }

    function changeScreen(action) {
      switch (action) {
        case '1':
          my_events.value = false;
          notification.value = true;
          break;

        case '2':
          my_events.value = true;
          notification.value = false;
          break;
      }
    }

    return { myEvents, dashboard, my_events, notification, uiOptions, changeUiOption, swipeScreen, changeScreen };
  },
});
</script>


<style scoped>

.toggle-dashboard {
  background: #1c1c1c!important;
  margin: 50px 30px 10px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.dashboard-view {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: scroll;
  height: -webkit-fill-available;
  min-height: 100%;
  width: 100%;
}

.dashboard-view > .wrapper {
  width: 200vw;
  height: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
}

.dashboard-view > .wrapper > .item {
  padding: 110px 30px 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.dashboard-view.active > .wrapper {
  transform: translateX(-100vw);
}

.my_events-button p, .notification-button p {
  text-align: center;
}

.dashboard-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.dashboard-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>