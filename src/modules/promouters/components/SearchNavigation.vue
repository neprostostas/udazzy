<template>
  <div class="wrap">
    <router-link to="/" class="back-btn">
      <img class="arrow-back" src="../assets/icons/ic_arrow-back.svg" alt="back">
    </router-link>
    <div class="search">
      <img class="search-icon" src="../assets/icons/ic_search-icon.svg" alt="search-icon">
      <input v-model="searchParam" placeholder="Search" type="text">
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from "vue";
import {promotersState} from "@/modules/promouters/store/promotersState";

export default defineComponent({
      name: "HeaderSearch",

      setup() {
        const state = promotersState();
        const searchParam = ref('');

        watch(searchParam, () => {
          state.filterBySearch(
              state.promotersList,
              searchParam.value,
              ['name', 'type_name', 'sex', 'city_name']
          )
        })
        return {
          searchParam
        }
      }
    },
)
</script>

<style scoped>

.wrap {
  background-color: #1c1c1c;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 3;
  top: 0;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 50px 20px 0;
}

.arrow-back {
  width: 14px;
  height: 14px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  background-color: #151515;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 24px;
  height: 40px;
}

.search input {
  flex-grow: 1;
  height: max-content;
  color: white;
}

.search-icon {
  width: 24px;
  height: 24px;
}

.search input:focus::placeholder {
  color: transparent;
}

.search input::placeholder {
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

</style>