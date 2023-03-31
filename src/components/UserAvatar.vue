<template>

  <carousel :items-to-show="1">

    <template v-if="img.length > 0">
      <slide v-for="slide in img" :key="slide">
        <img :src="slide" alt="">
      </slide>
    </template>

    <template v-if="img.length === 0 && sex">
      <slide>
        <img v-if="sex === 'other'" :src="'../img/default-ava-other.jpg'" alt="">
        <img v-else :src="sex === 'male' ? '../img/default-ava-male.jpg' : '../img/default-ava-female.jpg'" alt="">
      </slide>
    </template>

    <template v-else>
      <slide>
        <img :src="'../img/default-ava-default.jpg'" alt="">
      </slide>
    </template>

    <template #addons>
      <pagination v-if="img.length > 1" />
    </template>
  </carousel>

</template>

<script>
import {defineComponent} from "vue"
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination} from 'vue3-carousel'

export default defineComponent({
  components: { Carousel, Slide, Pagination },
  props: {
    img: Array,
    sex: String
  },
  setup() {

    return {}
  },
})

</script>

<style>
.carousel__slide, .carousel__pagination-item {
  padding: 0;
}
.carousel__pagination {
  z-index: 2;
  margin-top: 0;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%,-50%);
}
.carousel__pagination-button::after {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 3px 1px #f2e1f2;
  -moz-box-shadow: 0 0 3px 1px #f2e1f2;
  box-shadow: 0 0 3px 1px #f2e1f2;
  background-color: #5d5d5d;
}
.carousel__pagination-button--active::after {
  background-color: #000000;
}
.carousel__viewport, .carousel__track {
  height: 100%;
}
.carousel li img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.bg-wrapper .img-shadows1{
  pointer-events: none;
}
</style>