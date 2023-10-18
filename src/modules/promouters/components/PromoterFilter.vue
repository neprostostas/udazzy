<template>
  <div class="filter">
    <span class="filter-text">{{ state.promotersList.length }} promoters in your city</span>
    <div class="filter-by">
      <!-- add function to filter -->
    </div>
  </div>
</template>

<script>

import {promotersState} from "@/modules/promouters/store/promotersState";

export default {
  name: "PromoterFilter",

  setup() {
    const state = promotersState();

    return {
      state
    }
  }

}
</script>

<style scoped>
.filter {
  background-color: #1c1c1c;
  position: fixed;
  left: 0;
  right: 0;
  top: 98px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  z-index: 2;
}

.filter-text, .filter-by-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.filter-by {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>