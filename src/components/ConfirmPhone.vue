<template>
  <div class="header mb-30 text-center">
    <router-link to="/profile" class="top-bar">
      <div class="go-back absolute">
        <img src="../assets/img/icons/chevron-left-icon.svg" alt=""/>
      </div>
    </router-link>
    <div class="h4 title">Confirm Phone</div>
  </div>

  <div class="form-wrapper">
    <div class="h5 color-gray title mb-30 mt-60 text-center">
      {{ !state.email ? 'Enter your email and confirm it by entering code you will receive' : 'Confirm your email' }}

    </div>
    <form>
      <div class="input-group text-left">
        <vue-tel-input :class="v$.phone.$error ? 'danger' : ''" @input="onInput" :props="'US'"
                       class="input" :value="state.phone"></vue-tel-input>
        <div v-if="v$.phone.$error" class="mt-5 color-red">{{ v$.phone.$errors[0].$message }}</div>
      </div>

      <!-- show after SMS is sent START-->
      <div v-if="codeSent" class="input-group text-left mt-10">
        <input v-model="state.code" :class="v$.phone.$error ? 'danger' : ''" class="input" type="number"
               autocomplete="off" name="code" placeholder="Code form SMS" maxlength="4"
               @input="submitForm">
      </div>
      <!-- show after SMS is sent END-->
      <div class="send_again-wrapper" v-if="resend.status !== 0 || resend.counter === 0">
        <div class="send_again"><span v-if="resend.counter > 0">You will be able to resend code in <b>{{
            resend.counter
          }}</b> seconds</span>
          <div v-else class="button" @click="sendCode">Resend code</div>
        </div>
      </div>
      <div class="input-group mt-30">
        <div v-if="codeSent" class="submit btn btn-primary w100" @click="submitForm">Confirm</div>
        <div v-else class="submit btn btn-primary w100" @click="submitForm">Get Code</div>
      </div>
    </form>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

</template>

<script>

import {computed, defineComponent, ref} from "vue";
import qs from 'qs'
import axios from 'axios'
import InfoMessage from "@/components/InfoMessage";
import useValidate from '@vuelidate/core';
import {required, minLength, maxLength, helpers, email} from '@vuelidate/validators';
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  components: {InfoMessage},
  emits: ['hide', 'loader-off', 'loader-on', 'update-user-data'],
  setup(props, {emit}) {
    const alert = ref({})

    const codeSent = ref(false);
    const resend = ref({
      status: 0,
      counter: 60
    })
    const state = ref({
      phone: '',
      code: '',
    });

    const rules = computed(() => {
      return {
        phone: {
          required: helpers.withMessage('Please enter your phone number', required),
          minLength: minLength(10)
        },
        email: {required: helpers.withMessage('PLease enter your email', required), email},
        code: {
          required: helpers.withMessage('Enter code from Email you received', required),
          minLength: minLength(4),
          maxLength: maxLength(4)
        },
        $validationGroups: {
          email: ['email'],
          code: ['code'],
          phone: ['phone',],
        },
      }
    })

    const v$ = useValidate(rules, state)

    function onInput(tel, phoneObject) {
      if (phoneObject?.number)
        state.value.phone = phoneObject.number

      codeSent.value = false

      clearInterval(interval)
      interval = null
      resend.value.status = 0
    }

    let interval = null

    function countDown() {
      resend.value.status = 2
      resend.value.counter = 60

      if (interval === null) {
        interval = setInterval(() => {
          if (resend.value.counter <= 0) {
            resend.value.status = 1
            clearInterval(interval)
            interval = null
          } else {
            resend.value.counter--
          }
        }, 1000)
      }
    }

    function submitForm() {
      this.v$.$validate().then(() => {
        if (!codeSent.value) { // send code
          if (!this.v$.$validationGroups['phone'].$error) {  // if email is valid
            sendCode(this)
          }
        } else { // check code
          if (!this.v$.$validationGroups['code'].$error) {
            checkCode('', this)
          } else {
            // console.log('sss')
            alert.value.showAlert('Enter the code', 'success')
          }
        }
      })

    }

    function sendCode() {

      if (resend.value.status !== 2) {
        emit('loader-on');

        axios.post(process.env.VUE_APP_API_URL + 'user/get_code', qs.stringify(
                {
                  phone: state.value.phone,
                  // access_key: localStorage.getItem('os') || '9MPPR)F(rk%bZKJq',
                  access_key: '9MPPR)F(rk%bZKJq',
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
                countDown()

                alert.value.showAlert(res.data.title, 'success')
                codeSent.value = true
              } else {
                alert.value.showAlert(res.data.title, 'danger')
              }

              emit('loader-off');
            })
            .catch((err) => {
              emit('loader-off');

              if (err.response.status === 401)
                userLogout()
            });
      }
    }


    function checkCode(mode) {
      if (state.value.code && state.value.code.toString().length === 4) {
        alert.value.hideAlert()

        emit('loader-on');
        axios.post(process.env.VUE_APP_API_URL + 'user/check-code', qs.stringify(
                state.value),
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-version': process.env.VUE_APP_VERSION
              }
            })
            .then((res) => {

              if (res.data.status === 'success') {
                localStorage.setItem('user_data', JSON.stringify(res.data.user))
                emit('hide');
                emit('update-user-data', res.data.user);
                emit('loader-off');

                alert.value.showAlert(res.data.title, 'success')
                codeSent.value = true
              } else {
                alert.value.showAlert(res.data.title, 'danger')
              }

              emit('loader-off');
            })
            .catch((err) => {
              alert.value.showAlert(err.data.title, 'danger')

              emit('loader-off');

              if (err.response.status === 401)
                userLogout();
            });

      } else {
        if (mode !== 'on-input') {

          alert.value.showAlert('Enter the code you received in SMS', 'danger')
        }
      }
    }


    return {alert, onInput, submitForm, sendCode, checkCode, codeSent, state, v$, resend}
  },
})
</script>

<style scoped>

.logo {
  width: 40%;
}

.logo img {
  max-height: 100%;
}

.logo-mini {
  width: 130px;
}

.send_again {
  font-size: 14px;
  color: #666666;
  text-align: center;
}

.send_again.timeout {
  font-size: 0;
}

.send_again .button {
  color: var(--color-white);
  font-size: 1.2em;
  text-decoration: underline;
}

.send_again.timeout .button {
  display: block;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  padding: 0;
}

.send_again-wrapper {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>