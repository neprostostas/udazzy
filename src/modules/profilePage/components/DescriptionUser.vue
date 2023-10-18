<template>

  <div class="description">
    <div class="container">
      <div class="info">
        <div v-if="user.info?.about" class="item">
          <div class="title">About</div>
          <div class="text">{{ user.info?.about }}</div>
        </div>
        <div class="item">
          <div class="title">Sex</div>
          <div class="text">{{ user.sex.charAt(0).toUpperCase() + user.sex.slice(1) }}</div>
        </div>
        <div class="item">
          <div class="title">Age</div>
          <div class="text">{{ yearsOld }} y.o.</div>
        </div>
        <div class="item" v-if="user.info?.instagram">
          <div class="title">Instagram</div>
          <div class="text">{{ user?.info.instagram }}</div>
        </div>
        <div class="item" v-if="user.phone">
          <div class="title">Mobile</div>
          <div class="text">{{ user.phone }}</div>
        </div>
        <div class="item" v-if="user.email">
          <div class="title">Email</div>
          <div class="text">{{ user.email }}</div>
        </div>
        <div class="item" v-if="user.type_name">
          <div class="title">User type</div>
          <div class="text">{{ user.type_name }}</div>
        </div>
      </div>

      <router-link to="/upgrade" v-if="isItMe && user?.type_id >= '7'" class="mb-20">
        <div class="btn btn-primary mt-40">Upgrade Account</div>
      </router-link>

    </div>
  </div>

</template>

<script>

import {computed, defineComponent} from "vue";
import moment from "moment/moment";

export default defineComponent({

  props: {
    user: {
      name: String,
      id: String,
      phone: String,
      sex: String,
      type_name: String,
      info: {
        instagram: String,
        about: String,
      }
    },
    uri: String,
  },

  components: {},

  setup(props) {

    const yearsOld = computed(() => {
      return moment().diff(moment(props.user.dob, "MM-DD-YYYY"), 'years', false)
    })

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    return {
      isItMe,
      yearsOld
    }
  }
})

</script>

<style scoped>

.description .info {
  margin-bottom: 15px;
  padding-top: 15px;
}

.description .info .item {
  padding-bottom: 20px;
}

.description .info .item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 15px;
}

.description .info .item .title {
  margin-bottom: 5px;
  font-size: 13px;
}

.description .info .item .text {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
}

.top-action-btns .item {
  padding: 10px;
  position: relative;
}

.top-action-btns .item:before {
  content: '';
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  opacity: 0.3;
  filter: blur(18px);
}

</style>