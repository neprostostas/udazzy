<template>

  <div class="description">
    <div class="container">

      <div class="info">

        <router-link :to="{ name: 'ChatPrivat', params: { toUserUri: user.uri, backLink:backPath }}"
                     class="chat-wrap">
          <img src="../../promouters/assets/icons/ic_chat.svg" alt="chat">
        </router-link>

        <div class="item">
          <img src="../assets/icons/promouter.svg" alt="promouter">
          <p class="text">{{ user.type_name }}</p>
        </div>

        <div class="item">
          <img style="width: 14px" src="../assets/icons/study.svg" alt="study">
          <p class="text">{{ user.city_name }}</p>
        </div>

        <div class="item">
          <img src="../assets/icons/live.svg" alt="live">
          <p class="text">{{ "Lives in " +  user.city_name }}</p>
        </div>

      </div>

      <div v-if="user.info?.about" class="about-item about">
        <p class="about-text">{{ user.info?.about }}</p>
      </div>

      <router-link :to="{ name: 'PromoterEvents', params: { managerId: user.id, managerName: user.name }}" class="event-link">
        <template v-if="user.sex === 'male'"><ButtonPrimary>His Events</ButtonPrimary></template>
        <template v-if="user.sex === 'female'"><ButtonPrimary>Her Events</ButtonPrimary></template>
        <template v-if="user.sex === 'other'"><ButtonPrimary>They Events</ButtonPrimary></template>
      </router-link>

    </div>
  </div>

</template>

<script>

import {defineComponent} from "vue";
import ButtonPrimary from "@/components/base/ButtonPrimary";

export default defineComponent({

  props: {
    user : {
      name: String,
      id: String,
      phone: String,
      sex: String,
      city_name: String,
      info: {
        instagram: String,
        about: String,
      }
    },
    uri: String,
  },

  components : {ButtonPrimary},

  setup() {

    const backPath = window.location.pathname;

    return { backPath }
  }
})

</script>

<style scoped>

.chat-wrap {
  position: absolute;
  right: 15px;
}

.container {
  padding: 15px;
}

.info {
  display: grid;
  gap: 5px;
  padding: 0 0 10px 0;
}

.item {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;
  justify-content: start;
  align-items: center;
}

.item p {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.7);
}

.event-link {
  padding-top: 20px;
}

.about-item.about {
  padding-top: unset!important;
  border-top: unset!important;
}

.about-item {
  display: grid;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 15px 0;
}

.about-text {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.7);

}

</style>