<template>
  <div class="bg-dark h-100 text-center bottom-nav-padd pt-80">

    <div class="container">
      <div  class="h100">
        <div class="d-flex column h-between h100">
          <div class="top-wrapper">
            <div class="header mb-50">
              <div class="h2 title mb-10">Last Step</div>
              <div class="text p-15">Users must have correct information in their profiles, so we also need correct
                information from you
              </div>
            </div>
            <div class="form-wrapper">
              <div class="row mb-10">
                <div class="input-group w50">
                  <input @keydown.enter="submitForm"  v-model="state.firstName"
                         :class="v$.firstName.$error ? 'danger' : ''" @keydown.enter.prevent
                         class="input" type="text" autocomplete="off" placeholder="First name*">
                </div>
                <div class="input-group w50">
                  <input @keydown.enter="submitForm" :disabled="dataStatus.last_name != ''" v-model="state.lastName"
                         :class="v$.lastName.$error ? 'danger' : ''" @keydown.enter.prevent
                         class="input" type="text" autocomplete="off" placeholder="Last name*">
                </div>
              </div>
              <div class="row mb-10">
                <div class="input-group w100">
                  <select v-model="state.sex" :class="v$.sex.$error ? 'danger' : ''"
                          class="input">
                    <option value="sex" disabled hidden>Sex*</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div class="row mb-10">
                <div class="input-group w50">
                  <select v-model="state.dobMonth"
                          :class="v$.dobMonth.$error ? 'danger' : ''" class="input">
                    <option value="" disabled hidden>Month*</option>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div class="input-group w33">
                  <select
                          v-model="state.dobDay"
                          :class="v$.dobDay.$error ? 'danger' : ''" class="input">
                    <option value="" disabled hidden>Day*</option>
                    <option v-for="day in days" :key="day" :value="day">
                      {{ day }}
                    </option>
                  </select>
                </div>
                <div class="input-group w33">
                  <select
                          v-model="state.dobYear"
                          :class="v$.dobYear.$error ? 'danger' : ''" class="input">
                    <option value="" disabled hidden>Year*</option>
                    <option v-for="year in years" :key="year" :value="year">
                      {{ year }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row mb-15">
                <div class="input-group w100">
                  <input
                      type="file"
                      accept="image/jpeg/*"
                      @change="uploadPhoto"
                      id="uploadPhoto"
                      class="hide"
                  />
                  <label for="uploadPhoto"
                         :class="[v$.photo.$error ? 'danger' : '', state.photo.length ? 'success' : '']"
                         class="btn btn-icon input photo-input">
                    <span>Upload photo Picture</span>
                  </label>
                </div>
              </div>
              <div class="row mb-10">
                <div class="input-group w100 checkbox text-left">
                  <input v-model="state.accept" :class="v$.accept.$error ? 'danger' : ''" id="accept_rules"
                         name="remember" class="input" type="checkbox">
                  <label class="for_checkbox" for="accept_rules"> <a class="link-policy">Accept
                    rules</a> <span v-if="v$.accept.$error" style="margin-left: 5px;"
                                    class="color-red"> - {{ v$.accept.$errors[0].$message }} </span></label>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-wrapper mt-40">
            <div class="input-group m-auto">
              <button @click="submitForm" class="sign-up-button btn btn-primary w100" :disabled="disabled">Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <Loader/>

  <InfoMessage ref="alert"></InfoMessage>

</template>

<script>

import {computed, defineComponent, ref} from "vue";
import 'vue3-tel-input/dist/vue3-tel-input.css';
import useValidate from '@vuelidate/core';
import {required, minLength, sameAs, helpers} from '@vuelidate/validators';
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import InfoMessage from "@/components/InfoMessage";
import {useRouter} from "vue-router";
import {loaderStore} from "@/modules/loader/store/loader";

export default defineComponent({
  components: {
    InfoMessage,
  },
  emits: ['showMessage'],
  setup() {
    const alert = ref({})
    const dataStatus = ref(JSON.parse(localStorage.getItem('user_data')));

    const router = useRouter()
    const loader = loaderStore()

    loader.toggleLoader(false);

    const disabled = ref(false)

    const state = ref({
      firstName: dataStatus.value.first_name == '' ? '' : dataStatus.value.first_name,
      lastName: dataStatus.value.last_name == '' ? '' : dataStatus.value.last_name,
      sex: dataStatus.value.sex == '' ? 'sex' : dataStatus.value.sex,
      dobMonth: dataStatus.value.dob.split('-')[0] != '' ?  dataStatus.value.dob.split('-')[0] : '',
      dobDay: dataStatus.value.dob.split('-')[1] != '' ? dataStatus.value.dob.split('-')[1]  : '',
      dobYear: dataStatus.value.dob.split('-')[2] != '' ? dataStatus.value.dob.split('-')[2] : '',
      photo: '',
      accept: false,
    });

    const rules = computed(() => {
      return {
        firstName: {required, minLength: minLength(2)},
        lastName: {required, minLength: minLength(2)},
        sex: {required},
        dobMonth: {required},
        dobDay: {required},
        dobYear: {required},
        photo: {},
        accept: {sameAs: helpers.withMessage('This is required', sameAs(true))},
      }
    })

    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {

        disabled.value = true;
        loader.toggleLoader(true);

        axios.post(process.env.VUE_APP_API_URL + 'user/save', qs.stringify(
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

                if (res.data.user.status_id > 0) {
                  router.push({path: "/events"});
                } else {
                  if (!res.data.user.confirmed.includes('phone')) {
                    router.push({name: "ConfirmContactsPage"});
                  } else {
                    router.push({path: "/signup"});
                  }
                }

                loader.toggleLoader(false);
              } else {
                alert.value.showAlert(res.data.title, 'danger', 'small')

                loader.toggleLoader(false);
              }
            })
            .catch((err) => {

              alert.value.showAlert(err.response.data.title, 'danger', 'small')

              if (err.response.status === 401)
                userLogout()
            });

      } else {
        // console.log('Form failed validation')
      }
    }

    function uploadPhoto(input) {
      const file = input.target.files[0]
      const reader = new FileReader()

      let rawImg
      reader.onloadend = () => {
        rawImg = reader.result

        state.value.photo = rawImg
      }
      reader.readAsDataURL(file)
    }

    const years = computed(() => {
      let year = new Date().getFullYear() - 18
      return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
    })
    const days = computed(() => {
      return Array.from({length: 31}, (value, index) => {
        let val = 1 + index
        if (val.toString().length <= 1) {
          val = '0' + val.toString()
        }
        return val
      })
    })

    return {alert, state, v$, submitForm, uploadPhoto, years, days, disabled, dataStatus}
  },
})

</script>


<style scoped>

.sign-up-button[disabled] {
  background: #ddd;
  cursor: not-allowed;
}

.link-policy {
  text-decoration: underline;
}

</style>