<template>

  <div v-if="participants.length">

    <div class="list">
      <ul>
        <template :key="index" v-for="(item, index) in participants">
          <li v-if="item.user.uri && (itIsMyEvent || item.status === 'confirmed')" class="Participant" :class="item.status === 'rejected' ? 'rejected' : ''">
            <div class="wrapper">
              <div class="icon-wrapper">
                <router-link :to="{ name: 'UserPage', params: { uri: item.user.uri }}" class="img-wrapper promoter">
                  <UserAvatar :img="item.user.photo" :sex="item.user.sex" />
                </router-link>

                <div v-if="itIsMyEvent && item.status === 'confirmed'">
                  <img src="img/icons/icon-confirmed.svg" alt="" class="status-marker">
                </div>
                <div v-else-if="itIsMyEvent">
                  <img src="img/icons/icon-canceled.svg" alt="" class="status-marker">
                </div>
              </div>
              <div class="desc">
                <div class="title">{{ item.user.name }}, {{ yearsOld(item.user.dob) }} <GenderIcon :gender="item.user.sex" /></div>
                <router-link v-if="itIsMyEvent" class="color-primary chat-link" :to="{ name: 'ChatPrivat', params: { toUserUri: item.user.uri }}"><img src="../assets/img/icons/chat-icon.svg" alt="">Chat with</router-link>
              </div>
              <div v-if="itIsMyEvent" class="action-btns">
                <div v-if="item.status === 'confirmed'" @click="participantReject(item.id, item.user.id)" class="button">Kick</div>
                <div v-else-if="item.status === 'rejected'" @click="participantConfirm(item.id, item.user.id)" class="button">Return</div>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
  <div v-else class="not-found text-center">
    <div class="h6 text color-gray mb-15">No one has joined this event yet. <br>
    </div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

</template>

<script>

import {defineComponent, watch, watchEffect, ref} from "vue";
import InfoMessage from "@/components/InfoMessage";
import UserAvatar from "@/components/UserAvatar";
import GenderIcon from "@/modules/eventsMap/components/GenderIcon";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import moment from "moment/moment";

export default defineComponent({
  components: {InfoMessage, UserAvatar, GenderIcon},
  props: {
    eventId: String,
    items: Object,
    itIsMyEvent: Boolean
  },
  emits: ['filterReset'],
  setup(props) {

    const alert = ref({})

    const participants = ref(props.items)

    watch(props, () => {
      participants.value = props.items
    })

    function yearsOld(dob) {
      return moment().diff(moment(dob, "MM-DD-YYYY"), 'years', false)
    }

    const sortOptions = [
      'Default'
    ]

    const sortOptionsSelected = ref(sortOptions[0])

    function sortBy(val) {
      if(val === 'Default') {
        participants.value.sort(( a, b ) => {
          if ( a.status === 'confirmed' && b.status === 'rejected' ){
            return -1;
          }
          if ( a.status === 'rejected' && b.status === 'confirmed' ){
            return 1;
          }
          return 0;
        });
      }
    }

    watchEffect(() => {
      sortBy(sortOptionsSelected.value)
    })

    function participantReject(participant_id, user_id) {

      participants.value.find(o => o.id === participant_id).status = "rejected"

      axios.post(process.env.VUE_APP_API_URL+'events/participants/update/'+props.eventId, qs.stringify(
              {
                user_id: user_id,
                action: 'decline'
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then(() => {

          })
          .catch((err) => {
            alert.value.showAlert(err.response.data.title, 'danger')

            if(err.response.status === 401)
              userLogout();
          });
    }

    function participantConfirm(participant_id, user_id) {

      participants.value.find(o => o.id === participant_id).status = 'confirmed'

      axios.post(process.env.VUE_APP_API_URL+'events/participants/update/'+props.eventId, qs.stringify(
              {
                user_id: user_id,
                action: 'accept'
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then(() => {

          })
          .catch((err) => {
            alert.value.showAlert(err.response.data.title, 'danger')

            if(err.response.status === 401)
              userLogout();
          });
    }

    return {alert, sortBy, yearsOld, participantReject, participantConfirm, participants, sortOptions, sortOptionsSelected}
  },
})

</script>

<style scoped>
  .sexUser {
    text-transform: capitalize;
  }

  .list {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 100px;
  }

  .sort-wrapper .text {
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.5);
  }
  .not-found .text {
    text-align: center;
  }

  li {
    position: relative;
    list-style: none;
    padding-top: 7px;
    padding-bottom: 7px;
  }

  li.active {
    background: rgba(255, 255, 255, 0.05);
  }

  li.rejected .icon-wrapper,
  li.rejected .desc {
    opacity: 0.5;
    filter: grayscale(1);
  }

  li .wrapper .icon-wrapper {
    display: block;
    position: relative;
  }

  li .wrapper .icon-wrapper .status-marker {
    position: absolute;
    bottom: -5px;
    right: 5px;
    width: 20px;
    height: 20px;
  }

  li .title {
    font-size: 14px;
    line-height: 1em;
    margin-bottom: 0;
  }

  li .desc {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  li .action-btns {
    display: flex;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  li .action-btns .button {
    font-weight: 400;
    font-size: 13px;
    line-height: 1em;
    letter-spacing: 0.02em;
    text-decoration-line: underline;

    color: #FFFFFF;
  }

  li .action-btns .item {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-left: 10px;
    backdrop-filter: blur(10px);
  }
  li .action-btns .item.success {
    background: linear-gradient(90deg, rgba(147, 153, 155, 0.9) 10.71%, rgba(108, 171, 191, 0.9) 49.62%, rgba(96, 168, 140, 0.9) 100%);
  }
  li .action-btns .item.danger {
    background: linear-gradient(90deg, rgba(154, 150, 154, 0.9) 0%, rgba(194, 136, 183, 0.9) 42.4%, rgba(241, 109, 118, 0.9) 83.93%);
  }
  li .action-btns .item.danger svg {
    transform: rotate(45deg);
  }
</style>