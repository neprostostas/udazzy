<template>
  <div class="event-detail">
    <DetailHeader :id="id"/>
    <Creator/>
    <EventInfo/>
    <ParticipantsCount/>
    <div v-if="!iAmCreator" class="button-position">
      <ButtonPrimary v-if="buttonStatus" @click="isActive = true">Leave</ButtonPrimary>
      <ButtonPrimary v-if="!buttonStatus && eventStore.getFullParty && !eventStore.getEventCreator" @click="isActive = true">Join the event</ButtonPrimary>
    </div>
    <EventUserList/>
    <Loader/>
    <ConfirmModal @eventAction="ToggleButton" @toggleModal="toggleModal" :buttonStatus="buttonStatus" :isActive="isActive"/>
  </div>
</template>

<script>
import {onBeforeMount, ref, watchEffect} from "vue";
import DetailHeader from "@/modules/eventDetail/components/Header/DetailHeader";
import Creator from "@/modules/eventDetail/components/Creator";
import EventInfo from "@/modules/eventDetail/components/EventInfo";
import ParticipantsCount from "@/modules/eventDetail/components/ParticipantsCount";
import EventUserList from "@/modules/eventDetail/components/EventUserList";
import ButtonPrimary from "@/components/base/ButtonPrimary";
import {useEventStore} from "@/modules/eventDetail/store/event";
import Loader from "@/modules/loader/components/Loader";
import ConfirmModal from "@/modules/eventDetail/components/ConfirmModal";
import {loaderStore} from "@/modules/loader/store/loader";

export default {
  components: {
    ConfirmModal,
    ButtonPrimary,
    EventUserList,
    ParticipantsCount,
    EventInfo,
    Creator,
    DetailHeader,
    Loader
  },
  emits: ['close'],
  props: {
    id: String
  },

  setup(props) {

    const eventStore = useEventStore();
    const buttonStatus = ref(false);
    const isActive = ref(false);
    const loader = loaderStore();
    const iAmCreator = ref();

    watchEffect(() => {
      iAmCreator.value = eventStore.getManagerData?.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    function toggleModal(param) {
      isActive.value = param;
    }

    function ToggleButton(param) {
      buttonStatus.value = param;
    }

    onBeforeMount(() => {
      eventStore.setEventDetails(props.id);
      eventStore.setParticipantsList(props.id);
      loader.toggleLoader(true);
    })

    watchEffect(() => {
      buttonStatus.value = eventStore.getAlreadyOnEvent;
    })

    return {
      alert,
      eventStore,
      buttonStatus,
      isActive,
      toggleModal,
      ToggleButton,
      iAmCreator,
    };
  },
}
</script>

<style>

.event-detail {
  height: 100vh;
  padding-bottom: 120px;
  overflow: scroll;
}

.button-position {
  position: sticky;
  top: 66px;
  padding: 0 20px 20px;
  background: #1C1C1C;
}

.event-detail::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.event-detail {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

</style>