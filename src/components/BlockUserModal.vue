<template>

<div class="wrapperBlocked">

    <div class="user-block">
        <div class="firstPart">
        <UserAvatar :img="user.photo" class="ava" />
        <h2>The account is blocked</h2>
        <p>Unblock {{user.name}}?</p>
        </div>
    </div>

    <div class="cancelGroup">

      <button v-if="!back"
          class="unblock-modal-button"
          @click="[$emit('unblock'), unblockUser(user.uri), backToProfile()]">Unblock</button>

      <button v-if="back"
              class="unblock-modal-button"
              @click="[$emit('unblock'), unblockUser(user.uri)]">Unblock</button>

        <!-- if user blocked and click button 'Cancel' then route to chat list -->
        <router-link v-if="isBlocked" to="/chats" class="top-bar">
          <button
          class="cancel-modal-button"
          @click="[$emit('closeBlockModal')]">Cancel</button>
        </router-link>

        <button v-if="!isBlocked"
        class="cancel-modal-button"
        @click="[$emit('closeBlockModal')]">Cancel</button>

    </div>

    </div>

</template>

<script>

import {defineComponent} from "vue";
import UserAvatar from "@/components/UserAvatar";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import router from "@/router";

export default defineComponent({
  components: {
    UserAvatar
},
  props: {
    user: {
      photo: String,
      name: String,
      uri: String
    },
    isBlocked: Boolean,
    back: Boolean
  },
  emits: ['unblock', 'closeBlockModal'],
  setup() {

    function backToProfile() {
      router.push({path: "/profile"});
    }

    function unblockUser(uri) {
      axios.post(process.env.VUE_APP_API_URL+'user/unblock', qs.stringify(
              {
                user_uri: uri,
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then(() => {})
          .catch((err) => {
            if(err.response.status === 401)
              console.log(err)
            userLogout();
          });
    }

    return {
      unblockUser,
      backToProfile
    };
  },
})
</script>


<style scoped>

.wrapperBlocked {
    padding: 0 20px;
    display: grid;
    align-content: space-around;
    z-index: 990;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
}

.reportMainButton h1, .reportCommentMainButton h2 {
  padding: 34px 12px 9px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #FFFFFF;
}

.reportMainButton p {
  padding-bottom: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}

.reportCommentMainButton p {
  padding-bottom: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #FF5151;
}

.complaint-input input {
    width: 100%;
    color: #fff;
    height: 48px;
    padding: 15px 35px 15px;
    background: #1C1C1C;
    display: block;
    margin-right: auto;
    margin-left: auto;
}

.complaint-input input::placeholder {
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.4);
}

.complaint-input svg {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
}

.complaint-input svg:hover {
  cursor: pointer;
}

.complaint-input svg:hover path {
  fill: #FF5151;
}

.firstPart {
    display: grid;
    justify-content: center;
    align-items: center;
    justify-items: center;
}

.firstPart h2, .firstPart p {
  text-align: center;
  font-style: normal;
  font-weight: 400;
}

.firstPart h2, .info h2 {
  padding-top: 42px;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
}

.info h2 {
  padding-top: 5px!important;
}

.firstPart p, .info p {
  padding: 20px 0 0;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.5);
}

.info p {
  padding: 0!important;
}

.cancelGroup {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
}

.ava {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.unblock-modal-button, .cancel-modal-button {
  height: 48px;
  line-height: 48px;
  font-size: 1.1em;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-weight: 700;
  transition: all .3s linear;

  position: relative;
  z-index: 1;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.cancel-modal-button:before {
  position: absolute;
  z-index: -1;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  content: '';
  background-color: #1A1F21;
  border-radius: calc(14px * .75);
  box-shadow: inset 0 0 8px 8px rgba(147, 35, 228, 0.1);
}

.cancel-modal-button:after {
  opacity: 0.8;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: linear-gradient(94.01deg, rgba(73, 47, 231, 0.5) 16.65%, rgba(247, 21, 237, 0.46) 83.76%);
  filter: blur(8px);
  border-radius: 14px;
}


</style>