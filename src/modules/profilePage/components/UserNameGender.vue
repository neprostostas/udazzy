<template>
  <div class="container" :class="{ notMe: !isItMe }">
    <h2 class="user-name">{{ user.name }} {{ yearsOld }} {{!isItMe ? user.type_name : ''}}</h2>
    <template v-if="user.sex === 'male'">
      <img class="sex-icon" :src="require('@/modules/profilePage/assets/icons/ic_male-participants.svg')" alt="male-icon">
    </template>
    <template v-if="user.sex === 'female'">
      <img class="sex-icon" :src="require('@/modules/profilePage/assets/icons/ic_female-participants.svg')" alt="female-icon">
    </template>
    <template v-if="user.sex === 'other'">
      <img class="sex-icon" :src="require('@/modules/profilePage/assets/icons/ic_other-participants.svg')" alt="other-icon">
    </template>
  </div>
</template>

<script>

import {computed, defineComponent} from "vue";
import moment from 'moment'

export default defineComponent({

  props: {
    uri: String,
    user: {
      name: String,
      type_name: String,
      dob: String,
    }
  },

  setup(props) {

    const yearsOld = computed(() => {
      return moment().diff(moment(props.user.dob, "MM-DD-YYYY"), 'years', false)
    })

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })


    return {
      isItMe,
      yearsOld,
    }
  }
})

</script>

<style scoped>

.container {
  position: absolute;
  bottom: 46%;
  height: auto;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.container {
  bottom: 9%;
  justify-content: start;
}

.user-name {
  font-weight: 800;
  line-height: 0.9em;
  font-size: 1.4rem;
}

</style>