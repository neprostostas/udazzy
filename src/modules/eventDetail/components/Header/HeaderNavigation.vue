<template>

  <InfoMessage ref="alert"></InfoMessage>

  <div class="header-navigation">
    <router-link :to="back" class="header-back-arrow">
      <img src="../../assets/icons/ic_arrow-back.svg" alt="icon">
    </router-link>

    <a @click="copyProfileLink('https://udazzy.com/redirect.php?event-'+ id)" class="header-share">
      <img src="../../assets/icons/ic_share.svg" alt="icon">
    </a>

  </div>
</template>

<script>
import InfoMessage from "@/components/InfoMessage";
import {ref} from "vue";

export default {
  name: "HeaderNavigation",
  components: {InfoMessage},
  props: {
    id: String
  },
  setup() {
    const back = window.history.state.back;
    const alert = ref({})

    function copyProfileLink(url) {

      // Copy for Android & iOS
      window.cordova?.plugins.clipboard.copy(url);

      // Alert the copied text
      alert.value.showAlert('Link has been copied', 'success')

    }


    return {copyProfileLink, alert, back}
  }
}
</script>

<style scoped>

.header-navigation {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
}

.header-back-arrow, .header-share {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}
</style>