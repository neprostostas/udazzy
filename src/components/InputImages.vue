<template>
  <div class="images-wrapper">
    <div v-for="image in imagesNew" :key="image">
      <div class="gallery">
        <img class="image-input" :src="image" alt="">
        <img :class="{ disable: imagesNew?.length === 1 }" @click="removeImage(image)" class="handle-image" src="../assets/img/icons/remove.png" alt="remove">
      </div>
    </div>

    <label :class="{ one: imagesNew?.length === 0 || imagesNew?.length >= 3 }" class="upload-image" for="uploadImage">
      <img class="handle-image" src="../assets/img/icons/add.png" alt="add">
    </label>
    <input
        class="hide"
        type="file"
        accept="image/jpeg/*"
        @change="uploadImage"
        id="uploadImage"
    />
  </div>

</template>

<script>

import {defineComponent, ref} from "vue"

export default defineComponent( {
  components: {},
  props: {
    images: Array,
  },
  emits: ['update'],
  setup(props, {emit}) {

    const imagesNew = ref(props.images[0])

    function removeImage(image) {
      imagesNew.value = imagesNew.value.filter(img => img !== image);
      emit('update', imagesNew.value)
    }

    function uploadImage(input) {
      const file = input.target.files[0]

      const reader = new FileReader()

      let rawImg
      reader.onloadend = () => {
        rawImg = reader.result

        imagesNew.value.push(rawImg)

      }
      reader.readAsDataURL(file)

      emit('update', imagesNew.value)
    }

    return { uploadImage, removeImage, imagesNew }
  }
})
</script>

<style scoped>

.images-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  justify-items: center;
  gap: 12px;
  padding-bottom: 15px;
}

.image-input {
  border-radius: 10px;
  object-fit: cover;
}

.disable {
  display: none;
}

.gallery {
  position: relative;
  background: rgba(217, 217, 217, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}

.upload-image {
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  position: relative;
  background: rgba(217, 217, 217, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
}

.upload-image.one {
  height: 105px;
}

.handle-image {
  cursor: pointer;
  z-index: 3;
  position: absolute;
  bottom: -10px;
  right: -10px;
}

</style>