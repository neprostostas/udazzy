<template>
  <div class="header-bar">
    <a @click="$emit('close')">
      <div class="go-back absolute"><img src="../assets/img/icons/chevron-left-icon.svg" alt="back-arrow"></div>
    </a>
    <div class="text-title">Delete Account</div>
  </div>

  <div class="text-confirm">To confirm the deletion of the account, enter the code that was sent by SMS to the number:
  </div>
  <div class="text-phone">{{ state.phone }}</div>
  <div class="text-phone-container">
    <input v-model="state.code" required class="input" type="number" autocomplete="off" name="code"
           placeholder="Code form SMS" @keydown.enter.prevent maxlength="4">
  </div>
  <div class="text-delete-container">
    <div class="submit-button" @click="submitForm">Delete</div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

  <Loader v-if="loader_active" class="loader-on-block bg-dark"></Loader>
</template>

<script>

import {computed, defineComponent, ref, watch} from "vue"
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import InfoMessage from "@/components/InfoMessage";
import Loader from "@/modules/loader/components/Loader";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  components: {InfoMessage, Loader},
  emits: ['close'],
  props: {
    isActive: Boolean
  },
  setup(props, {emit}) {
    const alert = ref({})

    const loader_active = ref(false)

    const isActive = computed(() => {
      return props.isActive
    })

    const state = ref({
      phone: JSON.parse(localStorage.getItem('user_data')).phone,
      code: ''
    });

    const rules = computed(() => {
      return {
        code: {
          required: helpers.withMessage('Enter code from SMS you received', required),
          minLength: minLength(4),
          maxLength: maxLength(4)
        },
      }
    })

    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        if (confirm('You really want to delete your account?')) {

          loader_active.value = true
          axios.post(process.env.VUE_APP_API_URL + 'user/delete', qs.stringify(
                  {
                    code: state.value.code
                  }),
              {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token'),
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
              })
              .then((res) => {
                if (res.data.status === 'success') {
                  userLogout();

                  emit('close');
                } else {
                  loader_active.value = false
                  alert.value.showAlert(res.data.title, 'danger')
                }

              })
              .catch((err) => {
                // alert.value.showAlert(err.data.title, 'danger')

                if (err.response.status === 401)
                  userLogout();
              });
        }
      } else {
        alert.value.showAlert('Enter code from SMS you received', 'danger')
      }
    }

    watch(isActive, (active) => {
      if (active)
        sendCode()
    })

    function sendCode() {
      axios.post(process.env.VUE_APP_API_URL + 'user/delete', qs.stringify(
              {
                code: 0
              }),
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })
          .then((res) => {

            if (res.data.status === 'success') {
              alert.value.showAlert('Confirmation code sent by SMS', 'success')
            } else {
              alert.value.showAlert(res.data.title, 'danger')
            }
          })
          .catch((err) => {

            if (err.response.status === 401)
            userLogout();
          });
    }

    return {alert, loader_active, state, v$, submitForm}
  },
})
</script>

<style scoped>

.text-phone-container, .text-delete-container {
  margin-top: 30px;
  text-align: left;
}

.text-phone, .text-confirm {
  font-size: 1em;
  line-height: 1.4em;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0;
}

.text-phone {
  margin-top: 15px;
}

.text-confirm {
  font-weight: 500;
  margin-top: 60px;
  color: #858585;

}

.text-title {
  font-size: 1.4em;
  line-height: 1.4em;
}

.header-bar {
  margin-bottom: 30px;
  text-align: center;
}

.submit-button {
  height: 56px;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  font-size: 1.35em;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-weight: 700;
  transition: all .3s linear;
  position: relative;
  z-index: 1;
  background: linear-gradient(269.98deg, #E914E1 1.49%, #4A2FE7 97.33%);
  border-radius: var(--radius);
  line-height: 56px;
}

.submit-button:before {
  position: absolute;
  z-index: -1;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  content: '';
  background-color: var(--color-dark);
  border-radius: calc(var(--radius) * .75);
  box-shadow: inset 0 0 8px 8px rgba(147, 35, 228, 0.1);
}

.submit-button:after {
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
  border-radius: var(--radius);
}

</style>