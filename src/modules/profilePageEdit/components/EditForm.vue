<template>
  <div>

    <Loader />

    <div class="swap-buttons">

      <div class="edition-button" @click="[edition = true, view = false]">
        <p :class="{ grey: !edition }">Edition</p>
        <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !edition }"/>
      </div>

      <div class="view-button" @click="[edition = false, view = true]">
        <p :class="{ grey: !view }">View</p>
        <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !view }" />
      </div>

    </div>

    <div v-if="edition" class="edition-form scroll-area">

      <div class="form-wrapper">

        <div class="text">About</div>
        <div class="row">
          <div class="input-group w100">
            <textarea @keydown.enter="submitForm" v-model="state.about" :class="v$.about.$error ? 'danger' : ''" @keydown.enter.prevent class="custom-input w100" type="text" autocomplete="off" placeholder="About me" />
          </div>
        </div>

        <div class="text">Name</div>
        <div class="row">
          <div class="input-group w50">
            <input  @keydown.enter="submitForm" v-model="state.firstName" :class="v$.firstName.$error ? 'danger' : ''" @keydown.enter.prevent class="custom-input" type="text" autocomplete="off" placeholder="First name*">
          </div>
          <div class="input-group w50">
            <input  @keydown.enter="submitForm" v-model="state.lastName" :class="v$.lastName.$error ? 'danger' : ''" @keydown.enter.prevent class="custom-input" type="text" autocomplete="off" placeholder="Last name*">
          </div>
        </div>

        <div class="text">Sex</div>
        <div class="row">
          <div class="input-group w100">
            <select v-model="state.sex" :class="v$.sex.$error ? 'danger' : ''" class="custom-input">
              <option value="" disabled hidden>Sex*</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="text">Date of birth</div>
        <div class="row">
          <div class="input-group w50">
            <select v-model="state.dobMonth" :class="v$.dobMonth.$error ? 'danger' : ''" class="custom-input">
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
            <select v-model="state.dobDay" :class="v$.dobDay.$error ? 'danger' : ''" class="custom-input">
              <option value="" disabled hidden>Day*</option>
              <option v-for="day in days" :key="day" :value="day">
                {{ day }}
              </option>
            </select>
          </div>

          <div class="input-group w33">
            <select v-model="state.dobYear" :class="v$.dobYear.$error ? 'danger' : ''" class="custom-input">
              <option value="" disabled hidden>Year*</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <div class="text">User photo</div>
        <div v-if="!state.photo?.length" class="row">
          <div class="input-group w100">
            <input
                type="file"
                accept="photo/jpeg/*"
                @change="uploadAvatar"
                id="uploadAvatar"
                class="hide"
            />
            <label for="uploadAvatar"
                   :class="[v$.photo.$error ? 'danger' : '', state.photo?.length ? 'success' : '']"
                   class="btn btn-icon custom-input photo-input">
              <span>Upload Avatar Picture</span>
            </label>
          </div>
        </div>

        <div v-else class="row">
          <div class="input-group w100">
            <input
                type="file"
                accept="photo/jpeg/*"
                @change="uploadAvatar"
                id="changeAvatar"
                class="hide"
            />
            <label for="changeAvatar"
                   :class="[v$.photo.$error ? 'danger' : '', state.photo !== user.photo ? 'success' : '']"
                   class="btn btn-icon custom-input photo-input">
              <span>Change Avatar Picture</span>
            </label>
          </div>
        </div>
      </div>

      <div class="text">Instagram (Optional)</div>
      <div class="input-group row">
        <input  @keydown.enter="submitForm" v-model="state.instagram" class="custom-input" placeholder="Username" />
      </div>

      <div class="bottom-wrapper mt-40">
        <div class="input-group m-auto">
          <div @click="submitForm" class="btn btn-secondary w100">Save</div>
        </div>
      </div>
    </div>

    <div v-if="view">
      <div class="preview-container">

        <div class="preview-center">
          <div class="item photo-preview">
            <img v-if="state.photo" :src="`${ state.photo }`"  alt="preview-photo"/>
            <img v-if="!state.photo && state.sex === 'male'" :src="require('@/../public/img/default-ava-male.jpg')" alt="male-photo">
            <img v-if="!state.photo && state.sex === 'female'" :src="require('@/../public/img/default-ava-female.jpg')" alt="female-photo">
            <img v-if="!state.photo && state.sex === 'other'" :src="require('@/../public/img/default-ava-other.jpg')" alt="other-photo">

            <div class="info-wrapper">

              <div class="info-block">
                <p class="user-name">{{ state.firstName + " " + state.lastName }}</p>
                <GenderIcon :sex="state.sex" />
              </div>

            </div>

          </div>
        </div>

        <InfoBlock :state="state" :phone="user.phone" :yearsOld="yearsOld" />

      </div>
    </div>

  </div>

</template>

<script>

import {computed, defineComponent, ref} from "vue";
import {loaderStore} from "@/modules/loader/store/loader";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import {minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import router from "@/router";
import ButtonPrimary from "@/components/base/ButtonPrimary";
import GenderIcon from "@/modules/profilePageEdit/components/GenderIcon";
import moment from "moment";
import InfoBlock from "@/modules/profilePageEdit/components/InfoBlock";

export default defineComponent({

  components: {InfoBlock, GenderIcon, ButtonPrimary},

  setup() {

    const alert = ref({})

    const loader = loaderStore()

    loader.toggleLoader(false);

    const online = ref(true)

    const edition = ref(true)
    const view = ref(false)

    /* get user data from localStorage */
    const user = ref(JSON.parse(localStorage.getItem('user_data')));

    /* describing state for validation fields */
    const state = ref({
      firstName: user.value.name.split(' ')[0],
      lastName: user.value.name.split(' ')[1],
      sex: user.value.sex,
      dobMonth: user.value.dob.split('-')[0],
      dobDay: user.value.dob.split('-')[1],
      dobYear: user.value.dob.split('-')[2],
      photo: user.value?.photo,
      about: user.value.info?.about,
      instagram: user.value.info?.instagram,
    });

    /* a function that calculates the age of the user, based on data about his
   date of birth returned from the backend via the api endpoint */
    const yearsOld = computed(() => {
      const dob = `${state.value.dobMonth}-${state.value.dobDay}-${state.value.dobYear}`
      return moment().diff(moment(dob, "MM-DD-YYYY"), 'years', false)
    })

    /* describing rules of validation for fields of the state */
    const rules = computed(() => {
      return {
        firstName: { required, minLength: minLength(2) },
        lastName: { required, minLength: minLength(2) },
        sex: { required },
        dobMonth: { required },
        dobDay: { required },
        dobYear: { required },
        photo: { },
        about: { },
        instagram: { }
      }
    })

    /* create instance of validation rules and state */
    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {

        loader.toggleLoader(true);

        axios.post(process.env.VUE_APP_API_URL+'user/save', qs.stringify(
                state.value),
            {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
            .then((res) => {
              if(res.data.status === 'success') {

                localStorage.setItem('user_data', JSON.stringify(res.data.user))

                router.push({ path: "/profile" });

                loader.toggleLoader(false);

              } else {
                alert.value.showAlert(res.data.title, 'danger', 'small')

                loader.toggleLoader(false);


              }
            })
            .catch((err) => {

              alert.value.showAlert(err.response.data.title, 'danger', 'small')

              if(err.response.status === 401)
                userLogout()
            });

      } else {
        // console.log('Form failed validation')
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

    const years = computed(() => {
      let year = new Date().getFullYear() - 18
      return Array.from({length: year - 1900}, (value, index) => 1901 + index).reverse()
    })

    const days = computed(() => {
      return Array.from({length: 31}, (value, index) => {
        let val = 1 + index
        if(val.toString().length <= 1) {
          val = '0' + val.toString()
        }
        return val
      })
    })

    return {user, state, v$, uploadAvatar, submitForm, years, days, edition, view, online, yearsOld};
  },
})

</script>

<style scoped>

.row {
  display: flex;
  margin-bottom: 15px;
}

.row .input-group:first-child {
  margin-left: 0;
}
.row .input-group:last-child {
  margin-right: 0;
}

.w33 { width: 33%; }
.w50 { width: 50%; }
.w100 { width: 100%; }

.text {
  text-align: left;
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.5);
}

.edition-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.preview-center {
  display: flex;
  justify-content: center;
}

.photo-preview {
  position: relative;
}

.info-wrapper {
  position: absolute;
  bottom: 10px;
  left: 15px;
}

.info-block {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px;
  align-items: center;
  justify-content: start;
}

.preview-container {
  justify-content: start;
  justify-items: start;
  text-align: left;
}

.photo-preview img {
  border-radius: 10px;
  width: 100vw;
  max-height: 380px;
  object-fit: cover;
}

.user-name {
  font-weight: 800;
  line-height: 0.9em;
  font-size: 1.2rem;
  padding: 5px 0;
}

.active {
  display: none;
}

.grey {
  color: #8d8d8d;
}

.swap-buttons {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  cursor: pointer;
}

.text {
  color: #FFFFFF;
}

textarea.custom-input {
  padding: 15px;
  height: 80px;
}

.custom-input {
  height: 48px;
  width: 100%;
  background: #252525;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 12px !important;
  padding-left: 10px;
  padding-right: 10px;
  text-indent: 5px;
  font-size: 1em;
  font-weight: 500;
  transition: all .3s linear;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.12);
}

#app.android-keyboard-active .edition-form {
  padding-bottom: var(--data-android-keyboard-height);
  transition: all .2 ease-in;
}

</style>