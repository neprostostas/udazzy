<template>

  <InfoMessage ref="alert"></InfoMessage>

  <div class="modale-wrapper" :class="{ activeModale: !isHiddenModalMore }">
    <div v-if="!isHiddenModalMore" class="modalMore" :class="{ isThanksForReport: isThanksForReport || isBlockOpen || isUserBlock}">

      <div
          class="overlay"
          :class="{ none: isThanksForReport || isBlockOpen || isUserBlock}"
          @click="[$emit('close'), closePartModal()]"></div>

      <div class="modalButtonGroup" :class="{ isThanksForReportGroup: isThanksForReport || isBlockOpen || isUserBlock }">

        <div v-if="isUserBlock">
          <div class="firstPart">
            <UserAvatar :img="user.photo" class="ava" />
            <h2>The account is blocked</h2>
            <p>Unblock {{user.name}}?</p>
          </div>
        </div>

        <div class="cancelGroup" v-if="isUserBlock">
          <button
              class="unblock-modal-button"
              @click="[$emit('close'), unblockUser()]">Unblock</button>
          <button
              class="cancel-modal-button"
              @click="[$emit('close'), closePartModal()]">Cancel</button>
        </div>

        <template v-if="!isUserBlock">

          <div v-if="isMainBlockOpen" class="mainButton">
            <button @click="[isMainBlockOpen = false, isBlockOpen = true]" class="modalButton">Block</button>
            <button @click="[isMainBlockOpen = false, isReportBlockOpen = true]" class="modalButton">Report</button>
            <button @click="[$emit('close'), copyProfileLink('https://udazzy.com/redirect.php?user-'+ user.uri)]" class="modalButton last">Copy link of profile</button>
          </div>

          <div v-if="isBlockOpen" class="blockButton">
            <p>You want to block:</p>
            <h2>{{user?.name}}</h2>
          </div>

          <div v-if="isReportBlockOpen" class="reportMainButton">
            <h1>Why are you complaining about this account?</h1>
            <p>Your complaint remains anonymous</p>

            <div class="buttons-group" v-for="(text, id) in arrText" :key="id">
              <button @click="chooseReportType(id)" class="modalButton white">{{text}}</button>
            </div>

          </div>

          <div v-if="isReportCommentBlockOpen" class="reportCommentMainButton">

            <h2>Reporting {{user?.name}}</h2>
            <p v-if="complaint === 'spam'" >Spam</p>
            <p v-if="complaint === 'fake_account'" >Fake account</p>
            <p v-if="complaint === '18+'" >Pornography</p>
            <p v-if="complaint === 'harassment'" >Harassment</p>
            <p v-if="complaint === 'illegal_activity'" >Illegal activity</p>

            <div class="more-text">You can give more information about your complaint</div>

            <div class="input-group">
              <div class="complaint-input">
                <input v-model="inputtedText" type="text" placeholder="Comment..." />
                <img class="clear-svg" @click="inputtedText = ''" :src="require('@/assets/img/icons/clear.svg')" alt="clear">
              </div>
            </div>

            <button @click="[getReportedUser(), closePartModalButton()]" class="send-report-button">Send report</button>

          </div>

          <div v-if="isThanksForReport" class="thanksReportMainButton">

            <div class="firstPart">
              <img class="okeyButton" src="../assets/img/icons/okey.png" alt="okey">
              <h2>Thank you for your message</h2>
              <p>We will review your report and take action if we find a violation of our rules</p>
            </div>

            <hr>

            <div class="secondPart">

              <div class="info">
                <p>You also can block:</p>
                <h2>{{user.name}}</h2>
              </div>

              <label class="switch">
                <input id="checkbox_block" type="checkbox" v-model="checked">
                <span class="slider round"></span>
              </label>

            </div>

          </div>

          <template v-if="isThanksForReport">
            <button  v-if="checked" class="block-modal-button" @click="[$emit('close'), getBlockedUser(), closePartModal(), showAlertBlock()]">Block</button>
            <button v-if="!checked" class="close-modal-button" @click="[$emit('close'), closePartModal(), showAlertReport()]">Close</button>
          </template>

          <div v-if="isBlockOpen" class="cancelGroup">
            <button class="block-modal-button"  @click="[$emit('close'), getBlockedUser()]">Confirm</button>
            <button class="cancel-modal-button" @click="[$emit('close'), closePartModal()]">Cancel</button>
          </div>

          <template v-if="!isThanksForReport && !isBlockOpen">
            <button class="cancel-modal-button" @click="[$emit('close'), closePartModal()]">Cancel</button>
          </template>

        </template>

      </div>
    </div>
  </div>

</template>

<script>

import {defineComponent, ref, watchEffect} from "vue";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import UserAvatar from "@/components/UserAvatar";
import InfoMessage from "@/components/InfoMessage";

export default defineComponent({
  components: { InfoMessage, UserAvatar },
  props: {
    user: {
      photo: String,
      name: String,
      uri: String,
      in_blacklist: Boolean,
      in_report: Boolean,
      im_blocked: Boolean,
    },
    isHiddenModal: Boolean,
  },
  emits: ['close'],
  setup(props) {

    const alert = ref({})

    const isHiddenModalMore = ref(props.isHiddenModal);
    const isUserBlock = ref(props.user?.in_blacklist);
    const amIBlock = ref(props.user?.im_blocked);

    const isMainBlockOpen = ref(true);
    const isReportBlockOpen = ref(false);
    const isReportCommentBlockOpen = ref(false);
    const isThanksForReport = ref(false);
    const isBlockOpen = ref(false);

    const checked = ref(false);

    const inputtedText = ref('');
    const complaint = ref('');
    const complaints = ["spam", "fake_account", "18+", "harassment", "illegal_activity"];
    const arrText    = ["Spam", "Fake account", "Pornography", "Harassment", "Illegal activity"];

    watchEffect(() => {
      isHiddenModalMore.value = props.isHiddenModal;
      isUserBlock.value = props.user?.in_blacklist;
    });

    function closeFirst() {
      isReportBlockOpen.value = false;
      isReportCommentBlockOpen.value = false;
      isBlockOpen.value = false;
    }

    function closePartModal() {
      closeFirst()
      isThanksForReport.value = false;
      isMainBlockOpen.value = true;
    }

    function closePartModalButton() {
      closeFirst()
      isThanksForReport.value = true;
    }

    function chooseReportType(ind) {
      isReportCommentBlockOpen.value = true;
      isReportBlockOpen.value = false;

      complaint.value = complaints[ind];
    }

    function showAlertReport () {
      alert.value.showAlert('Reported!', 'success')
    }

    function showAlertBlock () {
      alert.value.showAlert('Blocked!', 'success')
    }

    function copyProfileLink(url) {
        // Copy the text inside the text field
        navigator.clipboard.writeText(url);
        // Alert the copied text
        alert.value.showAlert('Link has been copied', 'success')
    }

    function getReportedUser() {
      axios.post(process.env.VUE_APP_API_URL+'user/report', qs.stringify(
              {
                user_uri: props.user.uri,
                message: inputtedText.value,
                reason_status: complaint.value,
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then((res) => {
            console.log("reported: ", res)
            inputtedText.value = '';
          })
          .catch((err) => {
            if(err.response.status === 401)
              userLogout();
          });
    }

    function getBlockedUser() {
      axios.post(process.env.VUE_APP_API_URL+'user/block', qs.stringify(
              {
                user_uri: props.user.uri,
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then((res) => {
            console.log("block: ", res)

          })
          .catch((err) => {
            if(err.response.status === 401)
              console.log(err)
            userLogout();
          });
    }

    function unblockUser() {
      axios.post(process.env.VUE_APP_API_URL+'user/unblock', qs.stringify(
              {
                user_uri: props.user.uri,
              }),
          {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
          .then((res) => {
            console.log("unblockUser: ", res)

          })
          .catch((err) => {
            if(err.response.status === 401)
              // console.log(err)
            userLogout();
          });
    }

    return {isMainBlockOpen, isHiddenModalMore,
      isReportBlockOpen, isReportCommentBlockOpen, complaints,
      complaint, inputtedText, isThanksForReport, isBlockOpen, alert,
      getReportedUser, getBlockedUser, unblockUser, closePartModal,
      closePartModalButton, chooseReportType, arrText, copyProfileLink,
      checked, isUserBlock, amIBlock, showAlertReport, showAlertBlock
    };
  },
})
</script>


<style scoped>

.unblock-modal-button, .block-modal-button, .cancel-modal-button, .close-modal-button {
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 48px;
  line-height: 48px;
  font-size: 1.1em;
  transition: all .3s linear;
}

.unblock-modal-button, .block-modal-button, .close-modal-button {
  position: relative;
  z-index: 1;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: 14px;
}


.cancel-modal-button {
  position: relative;
  z-index: 1;
  background: linear-gradient(269.98deg, #E914E1 1.49%, #4A2FE7 97.33%);
  border-radius: 14px;
  line-height: 56px;
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

.modale-wrapper {
  z-index: 4;
}

.modalMore {
  display: grid;
  align-items: end;
  padding-bottom: 110px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(28, 28, 28, 0.8);
  width: 100%;
  height: 100%;
  z-index: 99;
}

.mainButton, .reportMainButton {
  background: #2C2C2C;
  border-radius: 10px;
  margin-bottom: 11px;
}

.blockButton {
  background: #000000;
}

.modalButton {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  height: 56px;
  text-align: center;
  cursor: pointer;
  color: #FF5151;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  letter-spacing: 0.02em;
  transition: all .3s linear;
}

.modalButton.white {
  color: #FFFFFF;
}

.modalButton.last {
  border-bottom: none;
  color: #FFFFFF;
}

.modalButtonGroup {
  margin: 0 20px;
  display: grid;
}

.modalButton:hover {
  background: rgba(255, 255, 255, 0.05);
}

.more-text {
  color: #858585;
  text-align: center;
  margin-bottom: 15px;
  font-size: 0.9em;
  font-weight: 300;
  line-height: 1.5em;
  padding-left: 15px;
  padding-right: 15px;
}

.send-report-button {
  width: auto;
  height: 56px;
  margin: 15px;
  line-height: 56px;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  width: -webkit-fill-available;
  font-size: 1.35em;
  letter-spacing: 0.02em;
  font-weight: 700;
  transition: all .3s linear;
  position: relative;
  z-index: 1;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: 14px;
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

.reportCommentMainButton {
  border-radius: 10px;
  background: #2C2C2C;
  margin-bottom: 11px;
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

.input-group {
  margin: 0 20px 5px;
}

.complaint-input {
  border-radius: var(--radius-sm);
  height: 50px;
  background: transparent;
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

.clear-svg {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
}

.isThanksForReport {
  padding-top: 160px;
  background: #000000;
  align-items: unset;
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

.isThanksForReportGroup {
  align-content: space-between;
}

.activeModale {
  overflow-y: hidden;
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

.overlay {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.overlay.none {
  display: none;
}

.secondPart {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  align-items: center;
}

.okeyButton {
  width: 54px;
  height: 54px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(217, 217, 217, 0.2);
  -webkit-transition: .4s;
  transition: all .4s easy;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #000000;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  transition: 0.5s all ease-in-out;
  background: linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);
}

input:focus + .slider {
  transition: 0.5s all ease-in-out;
  box-shadow: 0 0 1px linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>