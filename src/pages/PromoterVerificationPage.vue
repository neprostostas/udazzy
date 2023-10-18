<template>
  <Loader v-if="!resources_loaded" class="loader-on-block bg-dark"></Loader>

  <div class="h100 overflow-scroll p-relative bottom-nav-padd pt-80">
    <div class="top-nav">
      <div class="container">
        <router-link to="/events">
          <div class="go-back absolute"><img src="../assets/img/icons/chevron-left-icon.svg" alt=""></div>
        </router-link>
        <div class="header text-center">
          <div class="h4 title">Account Upgrade</div>
        </div>
      </div>
    </div>
    <div class="d-flex column pt-30 h-center">
      <div class="container">
        <div>
          <div class="input-group mb-30 w100">
            <div class="h4 title mb-10">I wanna be a:</div>
            <div class="row h-between">
              <div class="input-group row pr-15">
                <input type="radio" v-model="state.type_id" value="6" id="type_id_6" class="input">
                <label for="type_id_6">Promoter</label>
              </div>
              <div class="input-group row disabled pr-15">
                <input type="radio" v-model="state.type_id" value="7" id="type_id_7" disabled class="input">
                <label for="type_id_7" class="d-iflex column" style="align-items: flex-start">
                  <div>Public User</div>
                  <div class="thin text-sm color-light-05"> (Model, Photographer, .....)</div>
                </label>
              </div>
            </div>
          </div>

          <hr>

          <div class="h5 title mb-10">Select your city</div>
          <div class="input-group row mb-15">
            <Loader v-if="!cities.length"></Loader>
            <select v-model="state.city_id" :class="v$.city_id.$error ? 'danger' : ''" class="input"
                    :disabled="!cities.length">
              <option value="" disabled hidden>City*</option>
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>

          <div class="h5 title mb-10">Write a description about yourself</div>
          <div class="input-group row mb-15">
            <textarea @keydown.enter="submitForm" v-model="state.about" :class="v$.about.$error ? 'danger' : ''"
                      class="input"
                      placeholder="About me..."/>
          </div>

          <div class="h5 title mb-10">Instagram (Optional)</div>
          <div class="input-group row mb-15">
            <input @keydown.enter="submitForm" v-model="state.instagram" :class="v$.instagram.$error ? 'danger' : ''"
                   class="input"
                   placeholder="inst_name123"/>
          </div>
          <div v-if="!userHasAvatar" class="mb-15">
            <div class="h5 title mb-10">Upload profile picture</div>
            <div class="input-group w100">
              <input
                  type="file"
                  accept="image/jpeg/*"
                  @change="uploadAvatar"
                  id="uploadAvatar"
                  class="hide"
              />
              <label for="uploadAvatar"
                     :class="[v$.photo.$error ? 'danger' : '', v$.photo.$invalid ? '' : 'success']"
                     class="btn btn-icon input photo-input">
                <span>Select Photo</span>
              </label>
            </div>
          </div>

          <button type="button" class="btn btn-primary mt-60 submit-btn" @click="submitForm">Upgrade</button>
        </div>

      </div>
    </div>
  </div>

  <div v-if="confirmEmailModal.status" class="modal p-relative show">
    <Loader v-if="false" class="loader-on-block bg-dark"></Loader>

    <div class="container pt-80 pb-60">
      <ConfirmEmail @update-user-data="(user_data) => state.email = user_data.email"
                    @close="confirmEmailModal.status = false" @loader-off="confirmEmail_loaded = true"
                    @loader-on="confirmEmail_loaded = false"/>
    </div>
  </div>

  <div v-if="confirmPhoneModal.status" class="modal p-relative show">
    <div class="container pt-80 pb-60">
      <ConfirmPhone @hide="confirmPhoneModal.status = false"/>
    </div>
  </div>


  <InfoMessage ref=" alert
      "></InfoMessage>
</template>

<script>

import {defineComponent, ref, computed, onMounted} from "vue";
import useValidate from '@vuelidate/core';
import InfoMessage from "@/components/InfoMessage";
import Loader from "@/modules/loader/components/Loader";
import ConfirmEmail from "@/components/ConfirmEmail";
import {minLength, required, email} from "@vuelidate/validators";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import {useRouter} from "vue-router";
import ConfirmPhone from "@/components/ConfirmPhone";

export default defineComponent({
  components: {ConfirmPhone, Loader, ConfirmEmail, InfoMessage},
  setup() {
    const alert = ref({})
    const router = useRouter()
    const resources_loaded = ref(true)
    const confirmEmail_loaded = ref(true)
    let userHasAvatar = (JSON.parse(localStorage.getItem('user_data')).photo !== null)

    const confirmEmailModal = ref({
      status: function () {
        return (!JSON.parse(localStorage.getItem('user_data')).confirmed.includes('email'))
      }()
    })

    const confirmPhoneModal = ref({
      status: function () {
        return (!JSON.parse(localStorage.getItem('user_data')).confirmed.includes('phone'))
      }()
    })

    const state = ref({
      email: JSON.parse(localStorage.getItem('user_data')).email,
      phone: JSON.parse(localStorage.getItem('user_data')).phone,
      type_id: '6',
      city_id: '',
      about: '',
      instagram: '',
      photo: JSON.parse(localStorage.getItem('user_data')).photo == null ? "" : JSON.parse(localStorage.getItem('user_data')).phone,
    });

    const rules = computed(() => {
      return {
        email: {required, email},
        type_id: {required},
        city_id: {required},
        about: {required, minLength: minLength(10)},
        instagram: {},
        photo: function () {
          if (!userHasAvatar)
            return {required, minLength: minLength(99)}
          else
            return {}
        }(),
      }
    })

    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {

        resources_loaded.value = false
        // console.log('state', state.value)
        axios.post(process.env.VUE_APP_API_URL + 'user/upgrade', qs.stringify(
                state.value,
            ),
            {
              headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                'app-version': process.env.VUE_APP_VERSION
              }
            })
            .then((res) => {
              // console.log('res', res)
              if (res.data.status === 'success') {
                resources_loaded.value = true

                router.push({path: "/profile"});
              }

            })
            .catch((err) => {
              // console.log('error', err)
              alert.value.showAlert('Error', 'danger')
              if (err.response.status === 401)
                userLogout()
            });

      }

    }

    function uploadAvatar(input) {
      const file = input.target.files[0]
      const reader = new FileReader()

      let rawImg
      reader.onloadend = () => {
        rawImg = reader.result

        state.value.photo = rawImg
      }
      reader.readAsDataURL(file)
    }

    const cities = ref([])

    onMounted(() => {

      axios.post(process.env.VUE_APP_API_URL + 'places/prepare-to-create', {},
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            if (res.data.status === 'success') {
              // console.log(res.data);
              cities.value = res.data.response.cities
            }

          })
          .catch((err) => {
            if (err.response.status === 401)
              userLogout()
          });

    })

    return {
      confirmEmailModal,
      confirmEmail_loaded,
      confirmPhoneModal,
      resources_loaded,
      userHasAvatar,
      state,
      v$,
      submitForm,
      uploadAvatar,
      cities,
      alert
    }
  }
})
</script>


<style scoped>

.top-nav {
  position: relative;
  z-index: 10;
  left: 0;
  width: 100%;
  background: var(--color-bg) !important;
}

.go-back.absolute {
  top: -13px;
}

.events-list {
  padding-top: 210px;
  background: var(--color-bg);
}


.vue-map {
  min-height: 100vh;
  width: 100vw;
}

.toggle-view {
  position: relative;
  color: #fff;
  display: flex;
  margin-top: 15px;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.toggle-view div {
  width: 50%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  z-index: 3;
}

.toggle-view .bg:before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(93.85deg, #492FE7 16.7%, rgba(155, 35, 234, 0.962222) 48.06%, rgba(247, 21, 237, 0.92) 83.1%);
  transition: all .3s ease-in-out;
}

.toggle-view.active .bg {
  left: 50%;
}

.toggle-view.active .bg:before {
  left: -50%;
}

.toggle-view .bg {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: var(--radius-sm);
  width: 50%;
  height: 100%;
  transition: all .3s ease-in-out;
}

.not-found-map {
  position: absolute;
  width: calc(100% - 40px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 60px;
  border-radius: 30px;
}

.not-found-map .btn {
  margin-top: 30px;
}

.submit-btn {
  z-index: 12;
}
</style>