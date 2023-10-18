<template>
  <div class="header">
    <img
      class="header-img" :src="
        state?.allEventData.image
          ? state?.allEventData.image
          : require('../../../../../public/img/event1.jpg')" alt="img" />

    <HeaderBackgroundFilter />

    <HeaderNavigation :id="id" />
    <HeaderInfo />

    <router-link
      :to="{
        name: 'EventDetailsPageEdit',
        params: {
          id: +state.allEventData.id,
          event: JSON.stringify(state.allEventData),
        },
      }"
    >
      <HeaderEditBtn
        v-if="state.eventCreator"
        class="header-btn-position"
        width="64"
        height="64"
        box-shadow="20"
        :src="require('../../assets/icons/ic_editBtn.svg')"
      />
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HeaderBackgroundFilter from "@/modules/eventDetail/components/Header/HeaderBackgroundFilter";
import HeaderNavigation from "@/modules/eventDetail/components/Header/HeaderNavigation";
import HeaderInfo from "@/modules/eventDetail/components/Header/HeaderInfo";
import HeaderEditBtn from "@/components/base/GradientIcon";
import { useEventStore } from "@/modules/eventDetail/store/event";

export default defineComponent({
  components: {
    HeaderEditBtn,
    HeaderBackgroundFilter,
    HeaderNavigation,
    HeaderInfo,
  },

  props: {
    id: String
  },

  setup() {
    const state = useEventStore();

    return {
      state,
    };
  },
});
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 450px;
  padding: 50px 20px 48px;
  overflow: hidden;
}

.header-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}

.header-btn-position {
  position: absolute;
  right: 20px;
  bottom: 16px;
  z-index: 2;
}
</style>