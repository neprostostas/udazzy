<template>

  <div class="wrapper-details">
    <div class="container">

      <router-link :to="{ name: 'EventDetails', params: { id: id }}" class="go-back absolute">
        <img src="../assets/img/icons/chevron-left-icon.svg" alt="">
      </router-link>

      <div class="top-wrapper">
        <div class="wrapper-edit">
          <div class="edit-event-text">Edit Event</div>
        </div>
      </div>

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

      <div v-if="edition" class="block-details">

        <div>

          <div class="text-name bold mb-5 color-light-05 text-left">Name</div>
          <div class="row mb-10">
            <div class="input-group w100">
              <Loader v-if="!sources_loaded" />
              <input v-model="state.name" :class="v$.name.$error ? 'danger' : ''" class="custom-input" type="text" autocomplete="off" placeholder="Name*">
            </div>
          </div>

          <div class="text bold mb-5 color-light-05 text-left">Description</div>
          <div class="row mb-10">
            <div class="input-group w100">
              <Loader v-if="!sources_loaded" />
              <textarea v-model="state.description" :class="v$.description.$error ? 'danger' : ''" class="custom-input w100" type="text" autocomplete="off" placeholder="Description" />
            </div>
          </div>

          <div class="text bold mb-5 color-light-05 text-left">Date</div>
          <div class="row mb-10">
            <div class="input-group w100">
              <Loader v-if="!sources_loaded" />
              <InputTypeDate :value="state.datetime" :class="v$.datetime.$error ? 'danger' : ''" @input="(val) => state.datetime = val.getTime()" :min="new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(':'))"/>
            </div>
          </div>

          <div class="text bold mb-5 color-light-05 text-left">Event Picture</div>
          <div class="row mb-10">
            <div class="input-group w100">

              <Loader v-if="!sources_loaded" />

              <div class="row">
                <div class="input-group w100">
                  <input
                      type="file"
                      accept="image/jpeg/*"
                      @change="uploadAvatar"
                      id="changeAvatar"
                      class="hide"
                  />
                  <label for="changeAvatar"
                         :class="[v$.image.$error ? 'danger' : '', loaded ? 'success' : '']"
                         class="btn btn-icon custom-input photo-input">
                    <span>{{!state.image?.length ? 'Upload Event Picture' : 'Change Event Picture' }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="text bold mb-5 color-light-05 text-left">Event Status</div>
          <div class="row mb-10">
            <div class="input-group w100">
              <Loader v-if="!sources_loaded" />
              <select v-model="state.status" :class="v$.status.$error ? 'danger' : ''" class="custom-input">
                <option value hidden >Status</option>
                <option value="published">Published</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>

          <div class="input-group m-auto mt-40">
            <div @click="submitForm" class="btn btn-secondary w100">Save</div>
          </div>

        </div>

      </div>

      <div v-if="view">

        <div :class="{ disabled: state.status === 'disabled' }"></div>

        <div class="preview-container">
          <div class="preview-center">
            <div class="item photo-preview">

              <EventEditBackgroundFilter />
              <Loader v-if="!sources_loaded" />
              <img v-if="state.image" class="preview-image" :src="`${ state.image }`"  alt="preview-image"/>
              <img v-if="!state.image" :src="require('@/../public/img/event1.jpg')" alt="event-photo">

              <div class="info-wrapper">
                <div class="info-block">
                  <HeaderInfo :name="state.name" />
                </div>
              </div>

            </div>
          </div>

          <div class="info-participants">
            <EventInfo :date="state.datetime" :description="state.description"/>
            <ParticipantsCount/>
          </div>

        </div>
      </div>

    </div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

  <Loader v-if="loader_active" class="loader-on-block bg-dark"></Loader>

</template>

<script>

import {computed, defineComponent, watch, onBeforeMount, ref, onMounted} from "vue";
import Loader from "@/modules/loader/components/Loader";
import EventEditBackgroundFilter from "@/modules/eventDetailEdit/components/EventEditBackgroundFilter";
import InputTypeDate from "@/components/InputTypeDate";
import InfoMessage from "@/components/InfoMessage";
import {minLength, required} from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import ButtonPrimary from "@/components/base/ButtonPrimary";
import router from "@/router";
import {useEventStore} from "@/modules/eventDetail/store/event";
import EventInfo from "@/modules/eventDetail/components/EventInfo";
import ParticipantsCount from "@/modules/eventDetail/components/ParticipantsCount";
import HeaderInfo from "@/modules/eventDetail/components/Header/HeaderInfo";

export default defineComponent({
  props: {
    id: String,
    event: String
  },
  components: {
    HeaderInfo,
    ParticipantsCount, EventInfo, ButtonPrimary, Loader, InputTypeDate, InfoMessage, EventEditBackgroundFilter },
  setup(props) {
    const alert = ref({})

    const loaded = ref(false)

    const edition = ref(true)
    const view = ref(false)

    const event_store = useEventStore();

    onMounted(() => {
      event_store.setEventDetails(props.id);
      event_store.setParticipantsList(props.id);
    })

    const loader_active = ref(false)
    const sources_loaded = ref(false)

    const event_data = ref(null);

    const state = ref({
      name: '',
      description: '',
      datetime: '',
      image: '',
      status: '',
    });

    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(2) },
        description: { required, minLength: minLength(2) },
        datetime: { required, minLength: minLength(2) },
        image: { required, minLength: minLength(2) },
        status: { required, minLength: minLength(2) },
      }
    })

    watch(event_data, () => {
      Object.keys(state.value).forEach((val) => {
        state.value[val] = event_data.value[val]
      })

      sources_loaded.value = true
    })

    const v$ = useValidate(rules, state)

    function submitForm() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {

        loader_active.value = true
        axios.post(process.env.VUE_APP_API_URL+'events/update/'+props.id, qs.stringify(
                state.value
            ),
            {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
            .then((res) => {

              if(res.data.status === 'success') {

                router.push({ path: `/event-${props.id}` })

                loader_active.value = false
              } else {
                alert.value.showAlert(res.data.title, 'danger', 'small')

                loader_active.value = false
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

    onBeforeMount(() => {
      if(props.event) {
        event_data.value = JSON.parse(props.event)
      } else {
        axios.post(process.env.VUE_APP_API_URL+'events/detail', qs.stringify(
                {
                  id: props.id
                }),
            {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
            .then((res) => {
              if(res.data.status === 'success') {
                event_data.value = res.data.response
              } else {
                alert.value.showAlert(res.data.title, 'danger')
              }
            })
            .catch((err) => {
              alert.value.showAlert(err.response.data.title, 'danger')

              if(err.response.status === 401)
                userLogout()
            });
      }
    })

    function uploadAvatar(input) {
      const file = input.target.files[0]
      const reader = new FileReader()

      let rawImg
      reader.onloadend = () => {

        rawImg = reader.result

        state.value.image = rawImg
        loaded.value = true

      }
      reader.readAsDataURL(file)
    }

    return { alert, event_data, loader_active, sources_loaded, state, v$, submitForm, uploadAvatar, loaded, edition, view, event_store }
  },
})
</script>

<style scoped>

.preview-image {
  height: 400px;
  width: 375px;
  object-fit: cover;
}

.photo-preview img {
  border-radius: 10px;
  width: 100vw;
  max-height: 380px;
  object-fit: cover;
}


.disabled {
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: #a7b9c161;
  left: 0;
  right: 0;
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

.wrapper-details {
  height: -webkit-fill-available;
  min-height: 100%;
  text-align: center;
  background: #1C1C1C;
  overflow-y: scroll;
}

.container {
  width: 100%;
  padding: 60px 20px 120px 20px;
  position: relative;
  z-index: 0;
  overflow: scroll;
}

.block-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.wrapper-edit {
  margin-bottom: 50px;
}

.edit-event-text {
  margin-bottom: 10px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0;
  font-size: 1.4em;
  line-height: 1.4em;
}

.text-name {
  font-size: 1em;
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

.photo-preview {
  position: relative;
}

.info-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}

.info-block {
  position: relative;
  top: 30px;
  left: 20px;
}

.preview-container {
  justify-content: start;
  justify-items: start;
  text-align: left;
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

.info-participants {
  padding-top: 20px;
}

</style>