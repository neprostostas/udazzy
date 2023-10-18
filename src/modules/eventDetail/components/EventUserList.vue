<template>
  <div class="user-list-wrap">
    <TransitionGroup name="list">
      <template :key="user.user.id" v-for="user in store.getEventUserList">
        <div v-if="user?.user?.length !== 0 && showUser(store.eventCreator, user.status)"
             class="user"
             :class="user.status">
          <div class="user-avatar-wrap">
            <img class="user-avatar" :src="setPhoto(user.user.photo, user.user.sex)" alt="user-avatar">
            <div class="user-sex" :class="user.user.sex"></div>
            <div v-if="store.getEventCreator && user.status === 'confirmed'" class="user-status user-confirmed"></div>
            <div v-if="store.getEventCreator && user.status === 'rejected'" class="user-status user-rejected"></div>
          </div>
          <div class="name-wrap">
            <span class="user-name">{{ user?.user?.name }}, {{ birthday(user.user.dob) }}</span>
            <span class="user-time-status">Member since {{ dateTime(user.updated_at) }}</span>
          </div>
          <div v-if="store.eventCreator && user.status === 'confirmed'" class="action-wrap">
          <span
              @click="store.setUserStatus(user.user.id, 'rejected', store.eventUserList, store.allEventData.id, user.user.sex)">Kick</span>
          </div>
          <div v-if="store.eventCreator && user.status === 'rejected'" class="action-wrap">
          <span @click=" store.setUserStatus(user.user.id, 'confirmed', store.eventUserList, store.allEventData.id, user.user.sex)"
                class="">Add to the lis</span>
          </div>
        </div>
      </template>
    </TransitionGroup>

  </div>
</template>

<script>
import {useEventStore} from "@/modules/eventDetail/store/event";
import moment from "moment";

export default {
  name: "EventUserList",

  setup() {
    const store = useEventStore();

    function showUser(creatorStatus, userStatus) {
      let status = false;

      if (creatorStatus) {
        status = true;
      }

      if (userStatus === 'confirmed') {
        status = true;
      }

      return status;
    }

    function dateTime(value) {
      return moment(value).format("YYYY");
    }

    /*
      set user year age
      value - user dob
    */
    function birthday(value) {
      return moment().diff(moment(value, "MM-DD-YYYY"), 'years', false)
    }

    function setPhoto(photo, sex) {

      if (photo === null) {
        switch (sex) {
          case 'male':
            return require('../../../../public/img/default-ava-male.jpg');

          case 'female':
            return require('../../../../public/img/default-ava-female.jpg');

          case 'other':
            return require('../../../../public/img/default-ava-other.jpg');

        }
      } else {
        return photo;
      }
    }


    return {
      store,
      dateTime,
      birthday,
      showUser,
      setPhoto
    }
  },

  computed: {}
}
</script>

<style>

.user-avatar-wrap {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  z-index: -1;
}

.user-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;

}

.user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-sex {
  position: absolute;
  right: -5px;
  top: 1px;
  width: 16px;
  height: 16px;
}

.user-sex.male {
  background: url("../assets/icons/ic_male-participants.svg");
}

.user-sex.female {
  background: url("../assets/icons/ic_female-participants.svg");
}

.user-sex.other {
  background: url("../assets/icons/ic_other-participants.svg");
}

.user-list-wrap {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 20px 56px;
  transition: 1s;
}

.user-name {
  font-weight: 500;
  color: #FFFFFF;
}

.name-wrap {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.user-time-status {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.action-wrap {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
}

.action-wrap {
  text-decoration: underline;
}

.user-status {
  position: absolute;
  bottom: 0;
  right: -10px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
}

.user-confirmed {
  background: #60C550 url("../assets/icons/ic_confirmed.svg") no-repeat center center;
}

.user-rejected {
  background: #595959 url("../assets/icons/ic_rejected.svg") no-repeat center center;
}

.rejected img, .rejected .name-wrap span {
  filter: brightness(0.4);
}

.list-enter-active,
.list-leave-active {
  transition: 0.5s 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}


</style>