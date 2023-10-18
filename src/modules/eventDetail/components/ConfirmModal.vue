<template>
  <div v-if="isActive" class="confirm-modal">
  </div>
  <Transition name="slide-fade">
    <div v-if="isActive" class="modal-wrap">
      <div class="confirm-text">{{ buttonStatus ? 'Leave the event?' : 'Join the event?' }}</div>
      <div class="confirm-modal_button-wrap">
        <ButtonSecondary @click="toggleModal">
          Cancel
        </ButtonSecondary>
        <ButtonPrimary v-if="buttonStatus" @click="toggleModal(); eventAction('leave')">Leave</ButtonPrimary>
        <ButtonPrimary v-else @click="toggleModal() ;eventAction('join') ">join</ButtonPrimary>
      </div>
    </div>
  </Transition>
  <InfoMessage ref="alert"></InfoMessage>
</template>

<script>
import  userLogout from "@/components/js/userLogout";
import ButtonSecondary from "@/components/base/ButtonSecondary";
import ButtonPrimary from "@/components/base/ButtonPrimary";
import {useEventStore} from "@/modules/eventDetail/store/event";
import InfoMessage from "@/components/InfoMessage";
import {ref} from "vue";

export default {
  name: "ConfirmModal",
  props: {
    buttonStatus: Boolean,
    isActive: Boolean
  },
  emits: ['toggleModal', 'eventAction', 'close'],
  components: {
    ButtonPrimary,
    ButtonSecondary,
    InfoMessage
  },

  setup(props, context) {
    const eventStore = useEventStore();
    const alert = ref({});
    const user = {
      status: "confirmed",
      user: {
        photo: JSON.parse(localStorage.getItem('user_data')).photo,
        sex: JSON.parse(localStorage.getItem('user_data')).sex,
        name: JSON.parse(localStorage.getItem('user_data')).name,
        dob: JSON.parse(localStorage.getItem('user_data')).dob,
        id: JSON.parse(localStorage.getItem('user_data')).id,
      }
    };

    function toggleModal() {
      context.emit('toggleModal', false);
    }

    function eventAction(action) {
      if (action === 'leave') {
        eventStore.leaveEvent().then((res) => {
          // console.log(res);
          if (res.data.status === 'success') {
            alert.value.showAlert('You have left the event', 'success');

            eventStore.removeUser(user.user.id);
            eventStore.recountJoinedParticipants('leave', user.user.sex)
            context.emit('eventAction', false);

          }
        })
            .catch((err) => {
              alert.value.showAlert(err.response.data.title, 'danger')

              if (err.response.status === 401)
                userLogout();
            });
      }
      if (action === 'join') {
        eventStore.joinEvent().then((res) => {
          // console.log(res);
          if (res.data.status === 'success') {
            alert.value.showAlert('You have joined the event', 'success');
            eventStore.setNewUser(user);
            eventStore.recountJoinedParticipants('join', user.user.sex);
            context.emit('eventAction', true);
          }
        })
            .catch((err) => {
              if (err.response.status === 401)
                userLogout();
            });
      }
    }

    return {
      toggleModal,
      eventAction,
      alert
    }
  }
}
</script>

<style>

.confirm-modal {
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding-bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
}


.modal-wrap {
  flex-direction: column;
  padding: 24px 24px 70px;
  border-radius: 14px 14px 0 0;
  width: 100%;
  background-color: #151515;
  position: fixed;
  bottom: 80px;
  z-index: 5;
}

.confirm-modal_button-wrap {
  display: flex;
  gap: 16px;
  width: 100%;
}

.confirm-text {
  text-align: center;
  font-size: 21px;
  padding-bottom: 68px;
}

.slide-fade-enter-active {
  transition: all 0.4s;
}

.slide-fade-leave-active {
  transition: all 0.4s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>