<template>

  <div class="user-panel" v-if="isItMe">

    <router-link to="/profile-edit" class="item edit">
      <GradientIcon class="but-panel caption2"
                    :width="'40'"
                    :height="'40'"
                    box-shadow=20
                    :src="require('../../eventDetail/assets/icons/ic_editBtn.svg')"
      />
    </router-link>

  </div>

  <div class="panel-fixed" v-if="!isItMe">

  </div>

</template>

<script>

import {computed, defineComponent} from "vue";
import GradientIcon from "@/components/base/GradientIcon";

export default defineComponent({

  props: {
    user: {
      name: String,
      id: String
    },
    uri: String,
  },

  components: {
    GradientIcon
  },

  setup(props) {

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    const backPath = window.location.pathname;


    return {
      isItMe,
      backPath
    }
  }
})

</script>

<style scoped>


.caption1 {
  transform: translateX(-130px);
  animation: move-up1 .5s ease-in-out forwards;
}

@keyframes move-up1 {
  to {
    transform: translateX(0px);
  }
}

.caption2 {
  transform: translateX(190px);
  animation: move-up2 .7s ease-in-out forwards;
}

@keyframes move-up2 {
  to {
    transform: translateY(0px);
  }
}

.caption3 {
  transform: translateX(130px);
  animation: move-up3 .5s ease-in-out forwards;
}

@keyframes move-up3 {
  to {
    transform: translateX(0px);
  }
}

.panel-fixed {
  display: grid;
  gap: 10px;
  position: absolute;
  right: 0;
  top: 40%;
}

.user-panel {
  position: absolute;
  top: 15%;
  right: 0;
  display: grid;
  gap: 40px;
  transition: .5s all ease-in-out;
}

.but-panel {
  cursor: pointer;
  min-width: 85px;
}

@media (max-width: 425px) {
  .user-panel {
    transition: .5s all ease-in-out;
    gap: 20px;
  }
}

</style>