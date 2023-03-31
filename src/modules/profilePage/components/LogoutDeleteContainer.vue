<template>

  <div v-if="isItMe" class="container">
    <hr v-if="!isItMe">
    <div class="row">
      <div class="row-container">
        <div class="delete-button">
          <img style="width:18px;height:18px" :src="require('@/modules/profilePage/assets/icons/bin.svg')" alt="bin-img">
          <div @click="$emit('delete')" class="color-red">Delete account</div>
        </div>
      </div>
      <div class="row-container">
        <div @click="askLogout()" class="logout-button">
          <img style="width:18px;height:18px" :src="require('@/modules/profilePage/assets/icons/logout.svg')" alt="logout-img">
          <p>Logout</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isItMe" class="modal-delete" :class="status ? 'show' : ''">
    <div class="modal-delete-container">
      <DeleteUserModal :isActive="status" @close="closeModal()" />
    </div>
  </div>

</template>

<script>

import {computed, defineComponent} from "vue";
import DeleteUserModal from "@/components/DeleteUserModal";
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  components: {DeleteUserModal},
  props: {
    uri: String,
    status: Boolean
  },

  emits: ['delete', 'close', 'refresh'],

  setup(props, {emit}) {

    const isItMe = computed(() => {
      return !props.uri || props.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    function askLogout () {
      if(confirm('You want to log out?'))
        userLogout()
    }

    function closeModal() {
      emit('refresh');
    }

    return {
      isItMe,
      askLogout,
      closeModal
    }
  }
})

</script>

<style scoped>

.delete-button {
  gap: 5px;
}

.delete-button, .logout-button {
  cursor: pointer;
  color: #fff;
  text-align: center;
  border: none;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-weight: 700;
  transition: all .3s linear;
  height: 42px;
  line-height: 42px;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-button {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 5px;
}

.row {
  display: flex;
  margin-bottom: 15px;
}

.row-container {
  width: 50%;
}

.modal-delete {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 99;
  background: var(--color-bg);
  color: #fff;
}

.modal-delete {
  display: none;
}

.modal-delete.show {
  display: block;
}

.modal-delete-container {
  width: 100%;
  padding: 60px 20px;
}

</style>