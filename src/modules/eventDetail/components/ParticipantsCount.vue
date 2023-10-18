<template>
  <div class="participants">
    <span class="participants-title">Participants</span>
    <div class="count-wrap">
      <div v-if="store.getParticipants.male !== 0" class="count-block">
        <img src="../assets/icons/ic_male-participants.svg" alt="male-icon">
        <span :class="store.getParticipantsJoined.male ===  store.getParticipants.male && 'full'">
          <span class="current-count">{{ store.getParticipantsJoined.male }}</span>
          /
          <span class="total-count">{{
              store.getParticipants.male === -1 ? '∞' : store.getParticipants.male
            }}</span>
        </span>
      </div>
      <div v-if="store.getParticipants.female !== 0" class="count-block">
        <img src="../assets/icons/ic_female-participants.svg" alt="male-icon">
        <span :class="store.getParticipantsJoined.female ===  store.getParticipantsJoined.female && 'full'">
                <span class="current-count">{{ store.getParticipantsJoined.female }}</span>
                /
                <span class="total-count">{{
                    store.getParticipants.female === -1 ? '∞' : store.getParticipants.female
                  }}</span>
              </span>
      </div>
      <div v-if="store.getParticipants.other !== 0" class="count-block">
        <img src="../assets/icons/ic_other-participants.svg" alt="male-icon">
        <span :class="store.getParticipantsJoined.other ===  store.getParticipants.other && 'full'">
                <span class="current-count">{{ store.getParticipantsJoined.other }}</span>
                /
                <span class="total-count">{{
                    store.getParticipants.other === -1 ? '∞' : store.getParticipants.other
                  }}</span>
              </span>
      </div>
    </div>
  </div>
</template>

<script>

import {useEventStore} from "@/modules/eventDetail/store/event";
// import {computed, ref, watchEffect} from "vue";

export default {
  name: "ParticipantsCount",

  setup() {
    const store = useEventStore();

    return {
      store
    }
  }
}
</script>

<style scoped>
.participants {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 24px 20px;
  background: #1C1C1C;
}

.participants-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.current-count, .total-count {
  font-size: 13px;
}

.current-count {
  color: #FFFFFF;
}

.total-count {
  color: rgba(255, 255, 255, 0.5);
}

.count-block {
  display: flex;
  align-items: center;
  gap: 5px;
}

.full .current-count, .full .total-count {
  color: white;
}

.count-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
}

</style>