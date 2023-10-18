<template>

  <div class="bg-decor1"></div>
  <div class="bg-decor2"></div>
  <div class="bg-decor3"></div>

  <BlockUserTooModal v-if="i_was_blocked" :user="chatInfo?.user" :is_blocked="chatInfo?.user.in_blacklist" @clicked="i_was_blocked = false"/>

  <BlockUserModal v-if="chatInfo?.user.in_blacklist" :user="chatInfo?.user" :back="true"
                  @unblock="[chatInfo.user.in_blacklist = false]"
                  @closeBlockModal="[backToProfile()]"/>

  <ReportUserModal :isHiddenModal="isHiddenModalMore" :user="chatInfo?.user"
                   @close="isHiddenModalMore = true"/>

  <div class="wrapper">

    <div ref="header" :class="{active:headerStatus}" class="header header-chat chat-header text-center">
      <div class="header-bcg"></div>
      <router-link :to="back" class="arrow-back">
        <img src="../assets/img/icons/chevron-left-icon.svg" alt=""/>
      </router-link>
      <div class="title h-100 d-flex column h-center">
        <div class="h4">
          <router-link v-if="chatInfo" :to="{ name: 'UserPage', params: { uri: chatInfo.user.uri }}">
            {{ chatInfo.user.name }}
          </router-link>
          <span v-else class="status_updating color-white">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"/>
          </svg>
          Updating...</span>
        </div>
        <div v-if="chatInfo" class="h6 color-white sub_title">
          <div class="d-flex v-center h-center">
          <span v-if="chatStatus === 'updating'" class="status_updating thin">
            <svg style="width:16px;height:16px" viewBox="0 0 24 24">
                <path fill="currentColor"
                      d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"/>
            </svg>
            Updating...
          </span>
            <span v-else class="thin">{{ userLastOnline }}</span>
          </div>

        </div>
      </div>
      <div @click="isHiddenModalMore = false; isMainBlockOpen = true" class="more-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12.5" cy="4.5" r="1.5" fill="white"/>
          <circle cx="12.5" cy="11.5" r="1.5" fill="white"/>
          <circle cx="12.5" cy="18.5" r="1.5" fill="white"/>
        </svg>
      </div>
    </div>

    <div
        id="chat_wrapper"
        ref="chat_wrapper"
        @scroll="handleScroll"
        class="container bottom-nav-padd overflow-hidden chat-container"
    >
      <div ref="chat_wrapper" class="scroll-area">
        <div :key="group"
             v-for="group in sortedByGroupsMessages"
             class="messages-group">
          <div :key="index" v-for="(message, index) in group">
            <template v-if="!message.isMine">
              <div v-if="index === 0" class="avatar-wrapper">
                <router-link v-if="chatInfo" :to="{ name: 'UserPage', params: { uri: chatInfo.user.uri }}">
                  <UserAvatar :img="chatInfo.user.photo"/>
                </router-link>
              </div>
              <div v-else style="width: 55px; min-width: 55px"></div>
            </template>

            <ChatMessage
                :text="message.message"
                :isMine="message.isMine"
                :newMessage="message.flag_new"
                :dateSent="message.created_at"
            />


          </div>
        </div>
        <div v-if="messagesSeen.active" class="messages-read">
          <svg style="width: 14px; height: 14px" viewBox="0 0 24 24">
            <path
                fill="currentColor"
                d="M23.5,17L18.5,22L15,18.5L16.5,17L18.5,19L22,15.5L23.5,17M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.75,12.65 22.44,13.26 22.08,13.85C21.5,13.5 20.86,13.25 20.18,13.12L20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12C4.83,15.36 8.24,17.5 12,17.5L13.21,17.43C13.07,17.93 13,18.46 13,19V19.46L12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5Z"
            />
          </svg>
          <span class="text">seen by Robbie Hills</span>
        </div>
      </div>
    </div>

    <div class="bottom-panel">
      <div class="bottom-panel-bcg"></div>
      <div class="input-group">
        <div class="message-input-wrapper"
            :class="{active: messageInput.active, false: !messageInput.active }">

          <textarea
              :value="messageInput.text"
              id="message_input"
              @focus="scrollChat"
              @keyup="resizeInput"
              @input="[messageInput.text = $event.target.value]"
              @keydown.enter="sendMessage()"
              class="message-input"
              placeholder="Message"
          />
          <div @click="sendMessage()" class="send">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                  d="M1.46224 0.114594C0.79649 -0.232443 0 0.250577 0 1.00135V6.17485C0 7.2338 0.825431 8.10921 1.88256 8.1714L12.1517 9.50433C12.7325 9.57972 12.7325 10.4206 12.1517 10.496L1.88256 11.8289C0.82543 11.8911 0 12.7665 0 13.8255V18.999C0 19.7498 0.79649 20.2328 1.46224 19.8858L18.7255 10.8869C19.4425 10.5132 19.4425 9.48719 18.7255 9.11343L1.46224 0.114594Z"
                  fill="black"
                  fill-opacity="0.2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {defineComponent, ref, onBeforeMount, onMounted, computed, onUnmounted, watchEffect, watch} from "vue";
import ChatMessage from "@/components/ChatMessage";
import UserAvatar from "@/components/UserAvatar";
import BlockUserTooModal from "@/components/BlockUserTooModal.vue";
import BlockUserModal from '@/components/BlockUserModal'
import ReportUserModal from "../components/ReportUserModal.vue";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import {printDate} from "@/components/js/printDate";
import {profileStore} from "@/modules/profilePage/store/profile";
import router from "@/router";

export default defineComponent({
  components: {BlockUserModal, ChatMessage, UserAvatar, ReportUserModal, BlockUserTooModal},
  props: {
    toUserUri: String,
    backLink: String
  },

  setup(props) {

    /* import instance of profileStore */
    const profile = profileStore()

    const chatInfo = ref(null);

    const me = ref(JSON.parse(localStorage.getItem('user_data')));

    const i_was_blocked = ref(false);

    function backToProfile() {
      router.push({path: "/profile"});
    }

    onMounted(()=>{
      profile.getMeData(me)
    })

    watchEffect(()=>{

      if(chatInfo.value?.user !== undefined) {
        if (me?.value?.is_blocked_by?.some(element => element === chatInfo.value?.user.uri)) {
          // console.log("im blocked");
          i_was_blocked.value = true;
        } else {
          // console.log("im not blocked");
          i_was_blocked.value = false;
        }
      }

    })

    const back = window.history.state.back;

    const checked = ref(false);

    const isHiddenModalMore = ref(true);

    function getBlockedUser() {
      axios.post(process.env.VUE_APP_API_URL + 'user/block', qs.stringify(
              {
                user_uri: props.user.uri,
              }),
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            console.log("block: ", res)
          })
          .catch((err) => {
            if (err.response.status === 401)
              // console.log(err)
            userLogout();
          });
    }

    const chatStatus = ref('updating');
    const userLastOnline = computed(() => {
      if (new Date(chatInfo.value.user.last_login) > new Date(new Date() - 5 * 60000))
        return 'Online'
      else {
        return 'last online ' + printDate(new Date(chatInfo.value.user.last_login), true)
      }
    });

    const messageInput = ref({
      text: "",
      active: false,
    });
    const allMessages = ref([]);
    const sortedByGroupsMessages = ref([]);
    const messagesSeen = ref({
      active: false,
    });

    const headerStatus = ref(false);

    function groupMessages(messages) {
      if (messages.length) {
        let sortedArray = [];
        let newGroup = [];
        let lastIsMine = null;
        messages.forEach((message) => {

          message['isMine'] = isMine(message);

          if (lastIsMine === message.isMine || lastIsMine === null) {
            newGroup.push(message);
          } else {
            sortedArray.push(newGroup);
            newGroup = [];
            newGroup.push(message);
          }
          lastIsMine = message.isMine;


        });
        sortedArray.push(newGroup); // push last group

        return sortedArray;
      }
    }

    function isMine(message) {
      return message.created_by == JSON.parse(localStorage.getItem('user_data')).id
    }

    function onlySpaces(str) {
      return /^\s*$/.test(str)
    }

    watch(messageInput.value, (message) => {
      message.active = message.text.length > 0 && !onlySpaces(message.text);
    });

    watch(() => [...allMessages.value], (all) => {
      if (all.length) {
        sortedByGroupsMessages.value = groupMessages(all);
        messagesSeen.value.active = all.reverse()[0].isMine && all[0].read;
      }
    });

    function updateMessages() {
      chatStatus.value = 'updating'

      axios.post(process.env.VUE_APP_API_URL + 'chats/' + props.toUserUri, {},
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            if (res.data.status === 'success') {
              chatInfo.value = res.data.chat

              if (allMessages.value.length !== res.data.messages.length) {
                allMessages.value = res.data.messages

              }
              chatStatus.value = 'ready'

            }
          })
          .catch((err) => {
            if (err.response.status === 401)
              userLogout()
          });
    }

    onBeforeMount(() => {
      updateMessages()
    });

    let updateMessages_interval = null
    onMounted(() => {
      updateMessages_interval = setInterval(() => {
        updateMessages()
      }, 10000)
    })

    onUnmounted(() => {
      clearInterval(updateMessages_interval)
    })

    //вішає активний клас на хеадер
    function handleScroll() {
      this.headerStatus = this.$refs.chat_wrapper.scrollTop !== 0;
    }

    function resizeInput() {
      let input = document.getElementById('message_input')
      let chatContainer = document.getElementById('chat_wrapper')

      if (messageInput.value.text.length <= 0) {
        chatContainer.style.paddingBottom = 100 + "px";
        input.style.height = "1.5em";
      } else {
        if (input.style.height.replace(/\D/g, '') > 200) {
          return 0
        } else {
          input.style.height = "1.5em";
          input.style.height = input.scrollHeight + "px";

          chatContainer.style.paddingBottom = input.scrollHeight + 79 + "px";
          // Scroll to the bottom
          // chatContainer.scrollTo(0, chatContainer.height)

        }
      }
    }

    function sendMessage() {

      if (messageInput.value.text && messageInput.value.active) {

        clearInterval(updateMessages_interval)

        allMessages.value.push({
          created_at: new Date().getTime(),
          created_by: JSON.parse(localStorage.getItem('user_data')).id,
          flag_new: true,
          isMine: true,
          message: messageInput.value.text
        });

        axios.post(process.env.VUE_APP_API_URL + 'chats/message', qs.stringify({
              to_user_uri: props.toUserUri,
              message: messageInput.value.text
            }),
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-version': process.env.VUE_APP_VERSION
              }
            })
            .then((res) => {
              if (res.data.status === 'success') {

                // scroll to bottom
                let chatContainer = document.getElementById('chat_wrapper')
                chatContainer.scrollIntoView(false);

                updateMessages_interval = setInterval(() => {
                  updateMessages()
                }, 10000)
              }
            })
            .catch((err) => {
              if (err.response.status === 401)
                userLogout()
            });

        messageInput.value.text = ''
        resizeInput()
      }
    }

    function scrollChat () {
      setTimeout(() => {
        document.getElementById('chat_wrapper').scrollIntoView(false)
      }, 1000)
    }

    return {
      scrollChat,
      messageInput, resizeInput, messagesSeen, sortedByGroupsMessages, handleScroll,
      chatInfo, chatStatus, userLastOnline, headerStatus, sendMessage,
      isHiddenModalMore, checked, getBlockedUser, onlySpaces, back, backToProfile, i_was_blocked
    };
  },
});
</script>


<style scoped>

.header-chat {
  display: grid;
  grid-template-columns: auto 1fr auto;
}

.arrow-back {
  width: 60px;
  height: 50px;
  display: grid;
  justify-content: center;
  align-items: center;
  margin-left: -10px;
}

.more-button {
  cursor: pointer;
  margin-right: -10px;
  width: 60px;
}

.bottom-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.bg-decor1 {
  position: fixed;
  z-index: -1;
  right: -25%;
  bottom: 20%;
  width: 100%;
  height: 40%;
  background: #fa00ff;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(66px);
}

.bg-decor2 {
  position: fixed;
  z-index: -2;
  left: -10%;
  top: 10%;
  width: 80%;
  height: 40%;
  background: #80e5b6;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(66px);
}

.bg-decor3 {
  position: fixed;
  z-index: -3;
  right: -50%;
  top: 10%;
  width: 100%;
  height: 40%;
  background: #492fe7;
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(66px);
}

.header {
  position: fixed;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 40px 20px 0;
  transition: 0.2s;
  z-index: 5;
}

.header .header-bcg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  filter: blur(8px);
  background: rgba(0, 0, 0, 0.1);
}

.bottom-panel {
  padding: 30px 20px;
}

.bottom-panel .message-input-wrapper {
  background: #f7f7f7;
  border-radius: 28px !important;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 15px 5px;
  line-height: 0;
}

.bottom-panel .message-input {
  background: #f7f7f7;
  padding-left: 20px;
  padding-right: 55px;
  width: 100%;
  line-height: 1.3em;
  height: 1.5em;
  font-size: 14px;
}

.bottom-panel .message-input::placeholder {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.35);
  line-height: 1.3em;
}

.bottom-panel .input-group {
  position: relative;
  line-height: 0;
}

.bottom-panel .input-group .send {
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -10px;
  height: 20px;
  width: 20px;
  transition: all 0.25s ease-out;
}

.message-input-wrapper.active .send svg {
  display: none;
}

.bottom-panel .input-group .send svg {
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
}

.message-input-wrapper.active .send:before {
  content: "Send";
  position: absolute;
  left: -20px;
  color: var(--color-primary-middle);
  font-size: 16px;
  line-height: 18px;
  font-weight: 700;
}

.chat-container {
  width: 100%;
  padding: 100px 20px 100px;
}

.bottom-panel-bcg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  filter: blur(20px);
  box-shadow: 5px 57px 37px 27px var(--color-bg);
}

.messages-group {
  margin-top: 15px;
  margin-bottom: 15px;
}

.messages-group > div {
  display: flex;
}

.messages-group .avatar-wrapper {
  margin-right: 15px;
  height: 40px;
  width: 40px;
  min-width: 40px;
}

.messages-group .avatar-wrapper > a {
  height: 100%;
}

.messages-group .avatar-wrapper img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}

.messages-read {
  padding-right: 5px;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.messages-read svg {
  margin-right: 5px;
}

.status_updating {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status_updating svg {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#app.android-keyboard-active .bottom-panel {
  bottom: var(--data-android-keyboard-height);
  transition: all .2s ease-in;
}
#app.android-keyboard-active .chat-container > .scroll-area {
  margin-bottom: calc(var(--data-android-keyboard-height));
  transition: all .2s ease-in;
}


</style>