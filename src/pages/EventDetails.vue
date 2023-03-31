<template>
  <div class="event-detail">
    <DetailHeader :id="id"/>
    <Creator/>
    <EventInfo/>

    <vue-picture-swipe class="wrapper" :class="{ hide: hide }" :items="images" :options="{shareEl: false}"></vue-picture-swipe>

    <div class="images-panel">
      <div class="left-part">
        <label v-if="eventStore.getEventData.ImAParticipant || iAmCreator" class="upload-image" for="uploadImage">Add photos</label>
        <input
            class="hide"
            ref="fileInput"
            type="file"
            accept="image/jpeg/*"
            @change="uploadImage"
            id="uploadImage"
            multiple
        />
      </div>
      <div class="right-part">
        <p v-if="eventStore.getEventData.ImAParticipant || iAmCreator" class="show-edit" @click="edit = !edit">{{edit ? "Done" : "Edit"}}</p>
        <p class="show-more" :class="{ hide: hide, pd: eventStore.getEventData.ImAParticipant || iAmCreator }" @click="hide = !hide">{{hide ? "Show more" : "Show less"}}</p>
      </div>
    </div>

    <ParticipantsCount/>

    <div v-if="!iAmCreator" class="button-position">
      <ButtonPrimary v-if="buttonStatus" @click="isActive = true">Leave</ButtonPrimary>
      <ButtonPrimary v-if="!buttonStatus && eventStore.getFullParty && !eventStore.getEventCreator" @click="isActive = true">Join the event</ButtonPrimary>
    </div>
    <EventUserList/>
    <Loader/>
    <ConfirmModal @eventAction="ToggleButton" @toggleModal="toggleModal" :buttonStatus="buttonStatus" :isActive="isActive"/>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, ref, watchEffect} from "vue";
import VuePictureSwipe from 'vue-picture-swipe';
import DetailHeader from "@/modules/eventDetail/components/Header/DetailHeader";
import Creator from "@/modules/eventDetail/components/Creator";
import EventInfo from "@/modules/eventDetail/components/EventInfo";
import ParticipantsCount from "@/modules/eventDetail/components/ParticipantsCount";
import EventUserList from "@/modules/eventDetail/components/EventUserList";
import ButtonPrimary from "@/components/base/ButtonPrimary";
import {useEventStore} from "@/modules/eventDetail/store/event";
import Loader from "@/modules/loader/components/Loader";
import ConfirmModal from "@/modules/eventDetail/components/ConfirmModal";
import {loaderStore} from "@/modules/loader/store/loader";
import removeCross from "../assets/img/icons/remove.png";

export default {
  components: {
    VuePictureSwipe,
    ConfirmModal,
    ButtonPrimary,
    EventUserList,
    ParticipantsCount,
    EventInfo,
    Creator,
    DetailHeader,
    Loader
  },
  emits: ['close'],
  props: {
    id: String
  },

  setup(props) {

    const eventStore = useEventStore();
    const buttonStatus = ref(false);
    const isActive = ref(false);
    const loader = loaderStore();
    const iAmCreator = ref();
    const galleryThumbnails = ref(null);


    // const getGalleryThumbnails = () => {
    //   galleryThumbnails.value = document.querySelectorAll('.gallery-thumbnail');
    // };
    //
    // const insertImgElement = () => {
    //   galleryThumbnails.value.forEach((thumbnail, ind) => {
    //     const wrapperFigure = document.createElement('div');
    //     wrapperFigure.classList.add('wrapper-figure');
    //
    //     const removeImage = document.createElement('img');
    //     removeImage.classList.add('handle-image');
    //     removeImage.src = removeCross;
    //     removeImage.alt = 'remove';
    //     removeImage.setAttribute('id', ind);
    //
    //     thumbnail.parentNode.insertBefore(wrapperFigure, thumbnail);
    //     wrapperFigure.appendChild(thumbnail);
    //     wrapperFigure.appendChild(removeImage);
    //   });
    // };



    const getGalleryThumbnails = () => {
      galleryThumbnails.value = document.querySelectorAll(".gallery-thumbnail");
    };

    const insertImgElement = () => {
      for (let i = 0; i < galleryThumbnails.value.length; i++) {
        const imgElement = document.createElement("img");
        imgElement.classList.add("handle-image");
        imgElement.src = removeCross;
        imgElement.alt = "remove";
        galleryThumbnails.value[i].appendChild(imgElement);
        imgElement.addEventListener('click', test)
      }
    };

    function test(e) {
      e.stopPropagation()
      console.log('click')
    }

    onMounted(() => {
      getGalleryThumbnails();
      insertImgElement();
    });

    const hide = ref(true)
    const edit = ref(false)

    watchEffect(() => {
      const handleImageElements = document.querySelectorAll('.handle-image');
      if (edit.value === true) {
        handleImageElements.forEach(el => {
          el.classList.add('edit')
        });
      } else {
        handleImageElements.forEach(el => {
          el.classList.toggle('edit')
        });
      }
    });

    const fileInput = ref(null);

    const images = ref(JSON.parse(localStorage.getItem('images')) || [
      {src: 'https://placekitten.com/801/800', thumbnail: 'https://placekitten.com/801/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/802/800', thumbnail: 'https://placekitten.com/802/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/803/800', thumbnail: 'https://placekitten.com/803/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/804/800', thumbnail: 'https://placekitten.com/804/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/805/800', thumbnail: 'https://placekitten.com/805/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/806/800', thumbnail: 'https://placekitten.com/806/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/807/800', thumbnail: 'https://placekitten.com/807/800', w: 2000, h: 2000},
      {src: 'https://placekitten.com/808/800', thumbnail: 'https://placekitten.com/808/800', w: 2000, h: 2000},
    ]);

    const uploadImage = async () => {
      const files = fileInput.value.files;
      if (!files) return;

      for (const file of Array.from(files)) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          images.value.unshift({
            src: e.target.result,
            thumbnail: e.target.result,
            w: 2000,
            h: 2000
          });
          localStorage.setItem('images', JSON.stringify(images.value));
        };
      }
    };

    watchEffect(() => {
      iAmCreator.value = eventStore.getManagerData?.uri === JSON.parse(localStorage.getItem('user_data')).uri;
    })

    function toggleModal(param) {
      isActive.value = param;
    }

    function ToggleButton(param) {
      buttonStatus.value = param;
    }

    onBeforeMount(() => {

      eventStore.setEventDetails(props.id);
      eventStore.setParticipantsList(props.id);
      loader.toggleLoader(true);

    })

    watchEffect(() => {
      buttonStatus.value = eventStore.getAlreadyOnEvent;
    })

    return {
      alert,
      eventStore,
      buttonStatus,
      isActive,
      toggleModal,
      ToggleButton,
      iAmCreator,
      images,
      hide, edit,
      uploadImage,
      fileInput,
    };
  },
}
</script>

<style>

.gallery-thumbnail {
  position: relative;
}

.wrapper-figure {
  position: relative;
}

.handle-image {
  display: none;
  z-index: 9;
  cursor: pointer;
  position: absolute;
  bottom: -5px;
  right: -5px;
}

.handle-image.edit {
  display: unset;
  animation: fadeIn 1s;
}

.images-panel {
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
}

.right-part {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: end;
  align-items: center;
  gap: 16px;
}

.show-more, .show-edit, .upload-image {
  display: block;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
}

.upload-image {
  padding-left: 20px;
}

.show-more {
  padding-right: 0;
}

.show-more.pd {
  padding-right: 20px;
}

.show-more.hide {
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
  margin-left: auto;
}

.my-gallery {
  margin: 16px 16px 10px 16px;
  display: grid;
  grid-template-columns: repeat(3, auto);
}

.wrapper .my-gallery > *:nth-child(n + 4) {
  display: block;
  animation: fadeIn 1s;
}

.wrapper.hide .my-gallery > *:nth-child(n + 4) {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.event-detail {
  height: 100vh;
  padding-bottom: 120px;
  overflow: scroll;
}

.button-position {
  position: sticky;
  top: 66px;
  padding: 0 20px 20px;
  background: #1C1C1C;
}

.event-detail::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.event-detail {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

</style>