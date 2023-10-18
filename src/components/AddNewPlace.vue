<template>
  <div class="header mb-30 text-center">
    <a @click="$emit('close')" class="top-bar">
      <div class="go-back absolute"><img src="../assets/img/icons/chevron-left-icon.svg" alt=""></div>
    </a>
    <div class="h4 title">Add New Place</div>
  </div>

  <div class="row mb-30">
    <div class="input-group w50">
      <input :value="placeState.city.name" @keydown.enter.prevent class="input disabled" type="text" disabled>
    </div>
    <div class="input-group w50">
      <input :value="placeState.type.name" @keydown.enter.prevent class="input disabled" type="text" disabled>
    </div>
  </div>

  <div v-if="!addressEdit">
    <div v-if="!addressNotEmpty" class="mb-10">
      <div class="text h5 mb-10">Venue Name</div>
      <div v-for="type in types" :key="type" class="input-group w100">
        <vue-google-autocomplete v-if="type.id == placeState.type.id"
            ref="autocomplete"
            :id="'autocomplete_'+type.id"
            classname="input"
            placeholder="Enter venue name"
            :class="v$.route.$error ? 'danger' : ''"
            v-on:placechanged="getAddressData"
            @change="getVenueData($event)"
            :types="type.type_google"
            :enable-geolocation="true"
            @keydown.enter.prevent
        >
        </vue-google-autocomplete>
      </div>
    </div>
    <div v-else>
      <div class="row v-center">
        <div class="h4 title w66 pr-15"><div class="color-secondary">{{ state.placeName }}</div> <div class="h6 color-gray">{{ placeState.type.name }}, {{ placeState.city.name }}</div></div>
        <div @click="addressEdit = true" class="btn btn-secondary btn-sm w33">Edit</div>
      </div>
    </div>
  </div>

  <div v-if="addressEdit">
    <div class="text h5 mb-10">Venue Name</div>
    <div class="row mb-10">
      <div class="input-group w100">
        <input v-model="state.placeName" :class="v$.placeName.$error ? 'danger' : ''" @keydown.enter.prevent class="input" type="text"
               autocomplete="off" placeholder="Venue Name*">
      </div>
    </div>
    <div class="row mb-10">
      <div class="input-group w33">
        <div class="text h5 mb-10">Address Building</div>
        <input v-model="state.street_number" :class="v$.street_number.$error ? 'danger' : ''" @keydown.enter.prevent class="input" type="text"
               autocomplete="off" placeholder="Building*">
      </div>
      <div class="input-group w66">
        <div class="text h5 mb-10">Address Street</div>
        <input v-model="state.route" :class="v$.route.$error ? 'danger' : ''" @keydown.enter.prevent class="input" type="text"
               autocomplete="off" placeholder="Street*">
      </div>
    </div>
  </div>

  <div @click="submitForm" class="btn btn-primary mt-60">Create</div>

  <InfoMessage ref="alert"></InfoMessage>

</template>

<script>

import {computed, defineComponent, ref} from "vue"
import VueGoogleAutocomplete from "vue-google-autocomplete";
import {minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import InfoMessage from "@/components/InfoMessage";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  components: {VueGoogleAutocomplete, InfoMessage},
  props: {
    placeState: Object,
    types: Array
  },
  emits: ['close', 'loader-off', 'loader-on', 'show-success-alert', 'push-new-venue'],
  setup(props, { emit }) {

    const autocomplete = ref({});

    const alert = ref({})

    const addressNotEmpty = ref(false)
    const addressEdit = ref(false)

    const state = ref({
      placeName: '',
      addressLat: 0,
      addressLng: 0,
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      country: '',
    });

    const rules = computed(() => {
      return {
        placeName: {required, minLength: minLength(2)},
        street_number: {required, minLength: minLength(1)},
        route: {required, minLength: minLength(4)},
      }
    })

    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        emit('loader-on')
        axios.post(process.env.VUE_APP_API_URL + 'places/create', qs.stringify(
                {
                  type_id: props.placeState.type.id,
                  city_id: props.placeState.city.id,
                  name: state.value.placeName,
                  address: (() => {
                      return state.value.street_number + ', ' + state.value.route + ', ' + state.value.locality + ', ' + state.value.administrative_area_level_1 + ', ' + state.value.country;
                  })(),
                  lat: state.value.addressLat,
                  lng: state.value.addressLng,
                }),
            {
              headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              }
            })
            .then((res) => {
              if (res.data.status === 'success') {
                emit('push-new-venue', res.data.response)
                emit('loader-off')
                emit('show-success-alert', res.data.title)
                emit('close')
              } else {
                alert.value.showAlert(res.data.title, 'danger')
                emit('loader-off');
              }

            })
            .catch((err) => {
              // alert.value.showAlert(err.data.title, 'danger')

              if(err.response.status === 401)
                userLogout();
            });

      } else {
        // console.log('Form failed validation')
      }
    }

    function getAddressData(addressData) {

      state.value.street_number = addressData.street_number;
      state.value.route = addressData.route;
      state.value.locality = addressData.locality;
      state.value.administrative_area_level_1 = addressData.administrative_area_level_1;
      state.value.country = addressData.country;
      state.value.addressLat = addressData.latitude;
      state.value.addressLng = addressData.longitude;

      addressNotEmpty.value = true
    }
    function getVenueData(input) {
      if(typeof input == 'string') {
        state.value.placeName = input.split(',')[0];
      }
    }

    return {alert, autocomplete, addressNotEmpty, addressEdit, state, v$, submitForm, getAddressData, getVenueData}
  },
})
</script>

<style scoped>
.message-popup {
  opacity: 0;
  visibility: hidden;
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all .2s ease-in-out;
}

.message-popup.active {
  opacity: 1;
  visibility: visible;
}

.message-popup.big:before {
  content: '';
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 21, 21, 0.7);
  backdrop-filter: blur(5px);
  transition: 0s;
}

.message {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 85%;
  transform: translate(-50%, 0);
  background: linear-gradient(86.18deg, #979797 4.98%, #6CABBF 51.62%, #5FA785 99.05%);

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(40px);

  border-radius: 12px;
}

.message-popup.small .message {
  text-align: center;
  padding: 10px 25px;
  padding-left: 50px;
}

.message-popup.big .message img {
  margin: auto;
  margin-bottom: 10px;
}

.message-popup.small .message img {
  position: absolute;
  left: 15px;
  top: 50%;
  margin-top: -12px;
}

.message .text {
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
}

.message-popup.big .message {
  padding: 30px;
}

.message.success {
  background: linear-gradient(86.18deg, #979797 4.98%, #6CABBF 51.62%, #5FA785 99.05%);
}

.message.danger {
  background: linear-gradient(88.08deg, #979797 3.6%, #C089BA 49.28%, #FB6767 104.16%);
}
</style>