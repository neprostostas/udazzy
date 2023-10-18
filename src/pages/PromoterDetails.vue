<template>

  <Loader />

  <ReportUserModal :isHiddenModal="isHiddenModalMore" :user="user" @close="isHiddenModalMore = true" />

  <div class="bg-container">

    <HeaderBackButton />

    <div class="bg-wrapper">

      <UserAvatar class="avatar" v-if="!isItMe" :img="user.photo" :sex="user.sex" />

      <GradientIcon v-if="isItMe" :src="user.photo" :width="'124'" :height="'124'"
                    :width-img="'124'" :height-img="'124'" :border-radius="'50'"
                    class="gradient-icon"/>

      <ThreeDots :uri="uri" @close="isHiddenModalMore = false" />

      <div class="img-shadows1"></div>

      <UserNameGender :uri="uri" :user="user" />

      <UserPanel :user="user" :uri="uri" />

    </div>

    <DescriptionPromouter :user="user" :uri="uri" />

  </div>

</template>

<script>

import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {profileStore} from "@/modules/profilePage/store/profile";
import moment from 'moment'
import ReportUserModal from "../components/ReportUserModal.vue";
import GradientIcon from "@/components/base/GradientIcon";
import UserAvatar from "@/components/UserAvatar";
import UserNameGender from "@/modules/profilePage/components/UserNameGender";
import ThreeDots from "@/modules/profilePage/components/ThreeDots";
import HeaderBackButton from "@/modules/profilePage/components/HeaderBackButton";
import UserPanel from "@/modules/profilePage/components/UserPanel";
import DescriptionPromouter from "@/modules/promouterPage/components/DescriptionPromouter";

export default defineComponent({
  components: {
    UserPanel,
    HeaderBackButton,
    ThreeDots,
    UserNameGender,
    UserAvatar,
    GradientIcon,
    ReportUserModal,
    DescriptionPromouter
  },
  props: {
    uri: String
  },
  setup(props) {
    const deleteUserModal_loader = ref(false);

    const deleteUserModal = ref({
      status: false
    });

    const profile = profileStore()

    const online = ref(true)

    const isHiddenModalMore = ref(true);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const user = ref(JSON.parse(localStorage.getItem('user_data')));

    const descriptionExpanded = ref(false);

    const yearsOld = computed(() => {
      return moment().diff(moment(user.value.dob, "MM-DD-YYYY"), 'years', false)
    })

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    watch(isItMe, () => {
      profile.getUserData(props.uri, isItMe.value, user.value)

      if(isItMe.value) {
        user.value = JSON.parse(localStorage.getItem('user_data'))
      }
    })

    onMounted(() => {
      profile.getUserData(props.uri, isItMe, user)
    })

    return {
      isHiddenModalMore,
      deleteUserModal_loader, deleteUserModal, user, online,
      months, isItMe, yearsOld, descriptionExpanded };
  },
})
</script>

<style scoped>

.bg-container {
  background: #1C1C1C;
  padding-bottom: 120px;
  position: relative;
  z-index: 0;
  min-height: 100%;
  height: -webkit-fill-available;
  overflow: scroll;
}

.bg-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.bg-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.bg-wrapper {
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-radius: 0 0 50% 50% / 10% 10% 15% 15% ;
  padding-bottom: 380px;
  border-radius: 0;
}

.bg-wrapper .avatar {
  position: absolute;
  z-index: -1;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.bg-wrapper .img-shadows1 {
  position: absolute;
  z-index: 0;
  left: -60px;
  right: -60px;
  bottom: -60px;
  height: 40%;
  background: #2d2d2d;
  opacity: 0.5;
  filter: blur(46px);
}

.bg-wrapper .gradient-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: -1;
  top: 22%;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  object-fit: cover;
}

.star {
  position: absolute;
  margin-left: 20px;
  left: 0;
  transform: unset;
  bottom: 17%;
  justify-content: left;
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

</style>