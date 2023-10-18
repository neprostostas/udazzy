<template>
  <div class="wrapper-container">
    <div class="container">
      <div class="top-nav">
        <div class="header-container">
          <router-link to="/events" class="top-bar">
            <div class="go-back absolute"><img src="../assets/img/icons/chevron-left-icon.svg" alt="go-back"></div>
          </router-link>
          <div class="title-text">Create Event</div>
        </div>
      </div>

      <form>
        <div v-if="!placeState.selected">

          <div class="where-text">Where will this event take place?</div>
          <div class="top-wrapper">
            <div class="form-wrapper">
              <div class="row mb-30">
                <div class="input-group w50">
                  <Loader v-if="!cities.length"></Loader>
                  <select v-model="placeState.city" class="custom-input" :disabled="!cities.length" @change="getPlaces">
                    <option value="" disabled hidden>City*</option>
                    <option v-for="city in cities" :key="city.id" :value="{ id: city.id, name: city.name }">
                      {{ city.name }}
                    </option>
                  </select>
                </div>
                <div class="input-group w50">
                  <Loader v-if="!cities.length"></Loader>
                  <select v-model="placeState.type" class="custom-input" :disabled="!cities.length" @change="getPlaces">
                    <option value="" disabled hidden>Type*</option>
                    <option v-for="type in types" :key="type.id"
                            :value="{ id: type.id, name: type.name, type_google: type.type_google }">
                      {{ type.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="placeState.type && placeState.city">
                <div class="h5 title mb-10">Enter Venue Name</div>
                <div class="row mb-10">
                  <div class="input-group w100">
                    <input v-model="placeState.name" @input="[filterPlacesBySearch(), unsetPlace()]"
                           :class="v$.value.place_id.$error ? 'danger' : ''" @keydown.enter.prevent class="custom-input"
                           type="text" autocomplete="off" placeholder="Venue Name*">

                    <div class="places-list" :class="places_loading ? 'places_loading' : ''">
                      <Loader v-if="places_loading" class="loader-on-block bg-dark"></Loader>

                      <div v-for="place in placesFiltered" :key="place.id" @click="setPlaceById(place.id, place.name)"
                           class="item">
                        <svg style="width:16px;height:16px; margin-bottom: -1px;" viewBox="0 0 24 24">
                          <path fill="currentColor"
                                d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z"/>
                        </svg>
                        <span class="color-secondary text-md">{{ place.name }}</span> <span
                          class="color-light-05 text-sm">{{ place.address }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!placesFiltered.length" class="row mb-30">
                  <div class="w60">
                    <div class="h5 mb-10">If there is no place you are looking for, you can add it:</div>
                  </div>
                  <div class="w40 pl-15">
                    <div class="btn btn-sm btn-secondary" @click="addPlaceModal.status = true">Add Place</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row v-center">
            <div class="h4 title w66 pr-15">
              <div class="color-secondary">{{ placeState.name }}</div>
              <div class="h6 color-gray">{{ placeState.type.name }}, {{ placeState.city.name }}</div>
            </div>
            <div @click="placeState.selected = false" class="btn btn-secondary btn-sm w33">Edit</div>
          </div>
        </div>
      </form>

      <form v-if="state.place_id && placeState.type.id && placeState.city.id" class="p-relative mt-60">

        <Loader v-if="!sources_loaded"></Loader>

        <div v-if="sources_loaded">
          <div v-for="input in apiState" :key="input" class="row">
            <div v-if="input.type === 'text'" class="input-group mb-15 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <input v-model="state[input.name]" :class="v$.value[input.name].$error ? 'danger' : ''"
                     @keydown.enter.prevent class="custom-input" type="text" autocomplete="off"
                     :placeholder="input.title">
              <div v-if="v$.value[input.name].$errors[0]" class="mt-5 color-red">
                {{ v$.value[input.name].$errors[0].$message }}
              </div>
            </div>
            <div v-if="input.type === 'number'" class="input-group mb-15 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <input v-model="state[input.name]" :class="v$.value[input.name].$error ? 'danger' : ''"
                     @keydown.enter.prevent class="custom-input" type="number" autocomplete="off"
                     :placeholder="input.title">
              <div v-if="v$.value[input.name].$errors[0]" class="mt-5 color-red">
                {{ v$.value[input.name].$errors[0].$message }}
              </div>
            </div>
            <div v-if="input.type === 'select'" class="input-group mb-15 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <select @change="state[input.name] = $event.target.value"
                      :class="v$.value[input.name].$error ? 'danger' : ''" class="custom-input">
                <option value hidden>{{ input.title }}</option>
                <option v-for="val in input.value" :key="val" :value="val.id" :selected="val.selected">{{
                    val.name
                  }}
                </option>
              </select>
              <div v-if="v$.value[input.name].$errors[0]" class="mt-5 color-red">
                {{ v$.value[input.name].$errors[0].$message }}
              </div>
            </div>
            <div v-if="input.type === 'textarea'" class="input-group mb-15 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <textarea v-model="state[input.name]" :class="v$.value[input.name].$error ? 'danger' : ''"
                        @keydown.enter.prevent class="custom-input" :placeholder="input.title"/>
              <div v-if="v$.value[input.name].$errors[0]" class="mt-5 color-red">
                {{ v$.value[input.name].$errors[0].$message }}
              </div>
            </div>
            <div v-if="input.type === 'datetime'" class="input-group mb-15 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>

              <InputTypeDate :value="state[input.name]" :class="v$.value[input.name].$error ? 'danger' : ''"
                             @keydown.enter.prevent @input="(val) => state[input.name] = val.getTime()-tzoffset"
                             :min="new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(':'))"/>
              <div v-if="v$.value[input.name].$errors[0]" class="mt-5 color-red">
                {{ v$.value[input.name].$errors[0].$message }}
              </div>
            </div>
            <div v-if="input.type === 'checkbox'" class="input-group mb-30 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <div>
                <div v-for="music in input.value" :key="music.id" class="input-group pr-15"
                     style="display: inline-flex">
                  <input type="checkbox"
                         @change="state[input.name][state[input.name].indexOf(music)].checked = $event.target.checked"
                         :id="music.id" class="input">
                  <label :for="music.id">{{ music.name }}</label>
                </div>
              </div>
            </div>

            <div v-if="input.type === 'file'" class="input-group mb-30 w100">
              <div class="title mb-10">{{ input.title }} <span v-if="input.required">*</span></div>
              <div class="row">
                <div class="input-group w100">
                  <input
                      type="file"
                      :accept="input.accept"
                      @change="uploadAvatar"
                      :id="'upload_'+input.title"
                      class="hide"
                      :name="input.name"
                  />
                  <label :for="'upload_'+input.title"
                         :class="[v$.value[input.name].$error ? 'danger' : '', state[input.name].length ? 'success' : '']"
                         class="btn btn-icon custom-input photo-input">
                    <span>{{ input.title }}</span>
                  </label>
                </div>
              </div>
            </div>

          </div>


          <!--      <div class="row mb-10">-->
          <!--        <div class="input-group w100 checkbox text-left">-->
          <!--          <input v-model="state.withoutAlcohol" :class="v$.value.withoutAlcohol.$error ? 'danger' : ''" id="without_alcohol" name="remember" class="input" type="checkbox">-->
          <!--          <label class="for_checkbox" for="without_alcohol">Without alcohol <span v-if="v$.value.withoutAlcohol.$error" style="margin-left: 5px;" class="color-red"> - {{ v$.value.withoutAlcohol.$errors[0].$message }} </span></label>-->
          <!--        </div>-->
          <!--      </div>-->

          <div class="bottom-wrapper mt-40">
            <div class="input-group m-auto">
              <div @click="submitForm" class="btn btn-primary w100">Create Event</div>
            </div>
          </div>

        </div>
      </form>

    </div>
  </div>

  <div v-if="addPlaceModal.status" class="modal p-relative" :class="addPlaceModal.status ? 'show' : ''">
    <Loader v-if="!addPlace_loaded" class="loader-on-block bg-dark"></Loader>

    <div class="container pt-80 pb-60">
      <AddNewPlace :placeState="placeState" :types="types" @push-new-venue="pushNewVenue"
                   @close="addPlaceModal.status = false" @loader-off="addPlace_loaded = true"
                   @loader-on="addPlace_loaded = false"
                   @show-success-alert="alert.showAlert('Your venue has been added', 'success')"/>
    </div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>


  <Loader v-if="loader_active" class="loader-on-block bg-dark"></Loader>

</template>

<script>

import {defineComponent, onBeforeMount, ref} from "vue";
import Loader from "@/modules/loader/components/Loader";
import InputTypeDate from "@/components/InputTypeDate";
import InfoMessage from "@/components/InfoMessage";
import AddNewPlace from "@/components/AddNewPlace";
import {helpers, maxLength, minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import {filterBySearch} from "@/components/js/filterBySearch";
import {useRouter} from "vue-router";

export default defineComponent({
  components: {Loader, InputTypeDate, InfoMessage, AddNewPlace},
  setup() {

    const router = useRouter()

    const alert = ref({})

    const loader_active = ref(false)
    const places_loading = ref(true)
    const sources_loaded = ref(false)
    const addPlace_loaded = ref(true);
    const createButtonStatus = ref(false);

    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    const addPlaceModal = ref({
      status: false
    })

    const placeExists = ref(true);
    const placeState = ref({
      selected: false,
      name: '',
      city: '',
      type: '',
    });

    const apiState = ref([])

    const state = ref({
      place_id: '',
      images: [],
      withoutAlcohol: false,
    });

    const rules = ref({
      place_id: {required, minLength: minLength(1)},
      images: {},
      withoutAlcohol: {},
    })

    const v$ = ref({});

    v$.value = useValidate(rules, state);


    onBeforeMount(() => {
      axios.post(process.env.VUE_APP_API_URL + 'events/config_form', {},
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            if (res.data.status === 'success') {
              res.data.response.forEach((input) => {

                if (input.type === 'select') {
                  // state.value[input.name] = input.value[0]
                } else {
                  state.value[input.name] = input.value
                }

                if (input.required) {
                  if (input.type === 'select') {
                    // TO DO
                    rules.value[input.name] = {
                      required: helpers.withMessage('Select something from the list', required),
                      maxLength: maxLength(99)
                    }
                  }
                  if (input.type === 'text') {
                    rules.value[input.name] = {
                      required: helpers.withMessage('Please enter at least 2 characters', required),
                      minLength: minLength(2),
                      maxLength: maxLength(40)
                    }
                  } else if (input.type === 'textarea') {
                    rules.value[input.name] = {
                      required: helpers.withMessage('Please enter at least 10 characters', required),
                      minLength: minLength(10),
                      maxLength: maxLength(200)
                    }
                  } else {
                    rules.value[input.name] = {required}
                  }
                } else {
                  rules.value[input.name] = {}
                }
              })

              v$.value = useValidate(rules, state)
              sources_loaded.value = true

              apiState.value = res.data.response
            }


          })


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

              cities.value = res.data.response.cities

              types.value = res.data.response.types
            }

          })
          .catch((err) => {
            if (err.response.status === 401)
              userLogout()
          });
    })

    function submitForm() {
      this.v$.value.$validate() // checks all inputs

      if (!createButtonStatus.value) {
        createButtonStatus.value = true;
        if (!this.v$.value.$error) {

          loader_active.value = true

          axios.post(process.env.VUE_APP_API_URL + 'events/create', qs.stringify(
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

                  createButtonStatus.value = false;

                  router.push({path: "/event-" + res.data.response.id});

                } else {
                  alert.value.showAlert(res.data.title, 'danger')
                }

                loader_active.value = false
              })
              .catch((err) => {
                alert.value.showAlert(err.response.data.title, 'danger')

                loader_active.value = false

                if (err.response.status === 401)
                  userLogout()
              });

        } else {
          createButtonStatus.value = false;
          // console.log('Form failed validation')
        }
      }

    }

    const cities = ref([])
    const types = ref([])
    const places = ref([])
    const placesFiltered = ref([])

    function getPlaces() {
      places_loading.value = true

      axios.post(process.env.VUE_APP_API_URL + 'places/list', qs.stringify({
            type_id: placeState.value.type.id,
            city_id: placeState.value.city.id
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
              places.value = res.data.response
              filterPlacesBySearch()

              places_loading.value = false
            }
          })
          .catch((err) => {
            if (err.response.status === 401)
              userLogout()
          });
    }

    function filterPlacesBySearch() {
      placesFiltered.value = filterBySearch(places.value, placeState.value.name)
    }

    function setPlaceById(id, name) {
      placeState.value.name = name
      state.value.place_id = id;
      placeState.value.selected = true
      placeExists.value = true
    }

    function unsetPlace() {
      state.value.place_id = null;
      placeState.value.selected = false
      placeExists.value = false
    }

    function pushNewVenue(venue) {
      places.value.push(venue)

      placeState.value.name = venue.name
      state.value.place_id = venue.id;
      placeState.value.selected = true
      placeExists.value = true
    }

    function uploadAvatar(input) {
      const file = input.target.files[0]
      const reader = new FileReader()

      let rawImg
      reader.onloadend = () => {
        rawImg = reader.result
        state.value.images[0] = rawImg
      }
      reader.readAsDataURL(file)
    }

    return {
      alert,
      loader_active,
      places_loading,
      sources_loaded,
      addPlace_loaded,
      addPlaceModal,
      apiState,
      state,
      v$,
      getPlaces,
      unsetPlace,
      submitForm,
      filterPlacesBySearch,
      setPlaceById,
      pushNewVenue,
      uploadAvatar,
      placeExists,
      placeState,
      cities,
      types,
      placesFiltered,
      tzoffset
    }
  },
})
</script>


<style scoped>

.top-nav {
  position: relative;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 50px;
  background: var(--color-bg) !important;
}

.go-back.absolute {
  left: -15px;
}

.places-list {
  margin-top: 15px;
  position: relative;
  z-index: 0;
  overflow: scroll;
}

.places-list .item {
  font-size: 18px;
  margin-bottom: 6px;
  text-transform: capitalize;
}

.places-list .item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  padding-bottom: 6px;
}

.places-list.places_loading {
  overflow: hidden;
  max-height: 200px;
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

.container {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.header-container {
  margin-bottom: 30px;
  text-align: center;
}

.wrapper-container {
  padding-bottom: 120px;
  overflow-y: scroll;
  height: -webkit-fill-available;
  min-height: 100%;
}

.title-text {
  color: #fff;
  font-weight: 700;
  letter-spacing: 0;
  font-size: 1.4em;
  line-height: 1.4em;
}

.where-text {
  font-size: 1em;
  line-height: 1.4em;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0;
  margin-bottom: 15px;
}

.mb-30 {
  margin-bottom: 30px
}

.row {
  display: flex;
}

.row .input-group:first-child {
  margin-left: 0;
}

.row .input-group:last-child {
  margin-right: 0;
}

</style>