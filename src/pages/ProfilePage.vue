<template>

  <Loader />

  <BlockUserTooModal v-if="i_was_blocked" :user="user" :is_blocked="user?.in_blacklist" @clicked="i_was_blocked = false"/>

  <BlockUserModal v-if="user?.in_blacklist" :user="user"
                  @unblock="[user.in_blacklist = false]"
                  @closeBlockModal="[back()]"/>

  <ReportUserModal :isHiddenModal="isHiddenModalMore" :user="user" @close="isHiddenModalMore = true" />

  <div class="bg-container">

    <HeaderBackButton />

    <div class="bg-wrapper">

      <UserAvatar class="avatar" :img="user?.photo" :sex="user?.sex" />

      <ThreeDots :uri="uri" @close="isHiddenModalMore = false" />

      <div class="img-shadows1"></div>

      <UserNameGender :uri="uri" :user="user" />

      <UserPanel :user="user" :uri="uri" />

    </div>

    <DescriptionUser :user="user" :uri="uri" />

    <LogoutDeleteContainer :uri="uri" :status="deleteUserModal.status" @delete="deleteUserModal.status = true" @refresh="deleteUserModal.status = false" />

  </div>

</template>

<script>

import {computed, defineComponent, onMounted, ref, watch, watchEffect} from "vue";
import {profileStore} from "@/modules/profilePage/store/profile";
import moment from 'moment'
import ReportUserModal from "../components/ReportUserModal.vue";
import UserAvatar from "@/components/UserAvatar";
import UserNameGender from "@/modules/profilePage/components/UserNameGender";
import ThreeDots from "@/modules/profilePage/components/ThreeDots";
import HeaderBackButton from "@/modules/profilePage/components/HeaderBackButton";
import UserPanel from "@/modules/profilePage/components/UserPanel";
import DescriptionUser from "@/modules/profilePage/components/DescriptionUser";
import LogoutDeleteContainer from "@/modules/profilePage/components/LogoutDeleteContainer";
import BlockUserTooModal from "@/components/BlockUserTooModal";
import BlockUserModal from "@/components/BlockUserModal";
import {useRouter} from "vue-router";
import {loaderStore} from "@/modules/loader/store/loader";

export default defineComponent({
  components: {
    BlockUserModal, BlockUserTooModal, DescriptionUser, LogoutDeleteContainer, UserPanel,
    HeaderBackButton, ThreeDots, UserNameGender, UserAvatar, ReportUserModal
  },
  props: {
    uri: String
  },
  setup(props) {
    const deleteUserModal_loader = ref(false);

    const deleteUserModal = ref({
      status: false
    });

    const router = useRouter()
    const profile = profileStore()
    const loader = loaderStore()
    const online = ref(true)
    const isHiddenModalMore = ref(true);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const user = ref(JSON.parse(localStorage.getItem('user_data')));
    const me = ref(JSON.parse(localStorage.getItem('user_data')));

    const i_was_blocked = ref(false);

    function back() {
      router.push({path: "/profile"});
    }

    const descriptionExpanded = ref(false);

    const yearsOld = computed(() => {
      return moment().diff(moment(user.value.dob, "MM-DD-YYYY"), 'years', false)
    })

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    watch(isItMe, () => {
      if(isItMe.value) {
        user.value = JSON.parse(localStorage.getItem('user_data'))
      }
    })

    onMounted(() => {
      profile.getUserData(props.uri, isItMe, user);
      profile.getMeData(me);
    })

    watchEffect(()=>{
      if((user.value.name === undefined || user.value.name === "") ||
         (user.value.sex  === undefined || user.value.sex === "" ) ||
         (user.value.dob  === undefined || user.value.dob === "")) {
        router.push({path: "/signup"});
      }
    })

    watchEffect(()=>{

      loader.toggleLoader(true);

      if(props.uri !== undefined) {
        if (me?.value?.is_blocked_by?.some(element => element === props?.uri)) {
          // console.log("im blocked");
          i_was_blocked.value = true;
        } else {
          // console.log("im not blocked");
          i_was_blocked.value = false;
        }
      }

      setTimeout(() => {
        loader.toggleLoader(false);
      }, 1100)

    })

    return {
      isHiddenModalMore, deleteUserModal_loader, deleteUserModal, user, online,
      months, isItMe, yearsOld, descriptionExpanded, i_was_blocked, me, back };
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