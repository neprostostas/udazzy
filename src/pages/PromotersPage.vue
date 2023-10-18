<template>
  <SearchNavigation/>
  <PromoterFilter/>
  <PromoterList/>
</template>

<script>
import {defineComponent} from "vue";
import SearchNavigation from "@/modules/promouters/components/SearchNavigation";
import PromoterFilter from "@/modules/promouters/components/PromoterFilter";
import PromoterList from "@/modules/promouters/components/PromoterList";
import {promotersState} from "@/modules/promouters/store/promotersState";

export default defineComponent({
  components: {
    PromoterList,
    PromoterFilter,
    SearchNavigation,
  },

  setup() {
    const state = promotersState();
    state.getPromoters();
  }
})

</script>

<style scoped>

</style>