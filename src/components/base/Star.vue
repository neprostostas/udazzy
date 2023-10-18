<template>
  <div class="star-wrap">
    <template :key="star" v-for="star in rankStars">
      <img class="star" src="../../assets/img/star/ic_star.svg" alt="ic_star">
    </template>
    <template v-if="rankStars !== 5">
      <img :key="star" v-for="star in darkStar" class="star" src="../../assets/img/star/ic_star-dark.svg" alt="ic_star-dark">
    </template>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    rankStars: {
      require: true,
      default: 1,
    },
  },

  setup(props) {
    const darkStar = 5 - props.rankStars;

    return {
      darkStar,
    }
  }
})

</script>

<style scoped>

.star-wrap {
  display: flex;
  flex-shrink: 0;
  gap: 2px;
  width: max-content;
}

.star {
  width: 24px;
  height: 24px;
}
</style>