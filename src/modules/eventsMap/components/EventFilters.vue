<template>
  <div class="top-bar">
    <div class="search">
      <SearchBar
          :search="filter_params.search"
          @input="(val) => filter_params.search = val"
      />
    </div>
    <div
        @click="uiVisibility.filtersShown = true"
        class="show-filters-btn bg-blur"
    >
      <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="currentColor"
      >
        <path
            d="M4 11C4 11.5523 3.55228 12 3 12C2.44772 12 2 11.5523 2 11C2 10.4477 2.44772 10 3 10C3.55228 10 4 10.4477 4 11ZM5.82929 10C5.41746 8.83481 4.30622 8 3 8C1.34315 8 0 9.34315 0 11C0 12.6569 1.34315 14 3 14C4.30622 14 5.41746 13.1652 5.82929 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H5.82929Z"
            fill="currentColor"
        />
        <path
            d="M14 3C14 3.55228 13.5523 4 13 4C12.4477 4 12 3.55228 12 3C12 2.44772 12.4477 2 13 2C13.5523 2 14 2.44772 14 3ZM10.1707 4C10.5825 5.16519 11.6938 6 13 6C14.6569 6 16 4.65685 16 3C16 1.34315 14.6569 0 13 0C11.6938 0 10.5825 0.834808 10.1707 2H1C0.447715 2 0 2.44772 0 3C0 3.55228 0.447715 4 1 4H10.1707Z"
            fill="currentColor"
        />
      </svg>
    </div>
  </div>
  <div class="filters">
    <div class="filters-panel">
      <div class="quick-filters">

        <div
            class="item"
            :class="activeQuickFilters.today ? 'active' : ''"
        >
          <button @click="filterByDateRange(new Date(), 1)">Today</button>
          <div
              @click="filterByDateRange(new Date(), 60)"
              class="cancel"
          ><img
              src="@/assets/img/icons/cross-icon.svg"
              alt=""
          ></div>
        </div>

        <div
            class="item"
            :class="activeQuickFilters.thisWeek ? 'active' : ''"
        >
          <button @click="filterByDateRange(new Date(), 7)">This week</button>
          <div
              @click="filterByDateRange(new Date(), 60)"
              class="cancel"
          ><img
              src="@/assets/img/icons/cross-icon.svg"
              alt=""
          ></div>
        </div>

      </div>
    </div>
    <div
        :class="uiVisibility.filtersShown ? 'active' : ''"
        class="filters-block"
    >
      <div class="p-relative">
        <div class="header">
          <div class="container">
            <div
                @click="uiVisibility.filtersShown = false"
                class="close"
            >
              <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
              >
                <path
                    d="M2.22495 15.1752L0.824951 13.7752L6.59995 8.0002L0.824951 2.2252L2.22495 0.825195L7.99995 6.6002L13.775 0.825195L15.175 2.2252L9.39995 8.0002L15.175 13.7752L13.775 15.1752L7.99995 9.4002L2.22495 15.1752Z"
                    fill="white"
                />
              </svg>
            </div>
            <div class="title">Filter</div>
          </div>
        </div>
        <div class="filters-form">
          <div class="container">
            <div class="quick-filters">
              <div
                  class="item"
                  :class="activeQuickFilters.today ? 'active' : ''"
              >
                <button @click="filterByDateRange(new Date(), 1)">Today</button>
                <div
                    @click="filterByDateRange(new Date(), 60)"
                    class="cancel"
                ><img
                    src="@/assets/img/icons/cross-icon.svg"
                    alt=""
                ></div>
              </div>
              <div
                  class="item"
                  :class="activeQuickFilters.thisWeek ? 'active' : ''"
              >
                <button @click="filterByDateRange(new Date(), 7)">This week</button>
                <div
                    @click="filterByDateRange(new Date(), 60)"
                    class="cancel"
                ><img
                    src="@/assets/img/icons/cross-icon.svg"
                    alt=""
                ></div>
              </div>

            </div>
            <div class="filter-group">
              <div class="event-date">
                <div class="input-group">
                  <div class="title">From:</div>
                  <InputTypeDate
                      :value="filter_params.dateRange.from"
                      @input="(val) => filter_params.dateRange.from = val"
                  />
                </div>
                <div class="input-group">
                  <div class="title">To:</div>
                  <InputTypeDate
                      :value="filter_params.dateRange.to"
                      @input="(val) => filter_params.dateRange.to = val"
                  />
                </div>
              </div>
            </div>
            <div class="filter-group"
                 :key="filterGroupKey"
                 v-for="(filterGroup, filterGroupKey) in filter_params.checkboxes"
            >
              {{ filterGroup.checkboxes }}
              <div v-if="Object.keys(filterGroup).length !== 0">
                <hr>
                <div
                    class="title"
                    v-if="filterGroupKey !== 'other'"
                >
                  {{ filterGroupKey }}
                </div>
                <div
                    v-if="filterGroup.length !== 0"
                    :class="(filterGroupKey === 'event types' || filterGroupKey === 'music genres') ? 'two-cols' : ''"
                >
                  <div
                      :key="paramKey"
                      v-for="(param, paramKey) in filterGroup"
                      class="input-group row"
                  >
                    <input
                        type="checkbox"
                        v-model="filter_params.checkboxes[filterGroupKey][paramKey]"
                        :id="paramKey"
                        class="input"
                    >
                    <label :for="paramKey">{{ paramKey }}</label>
                  </div>
                </div>
              </div>

            </div>
            <hr>
            <div class="input-group two-cols row">
              <div class="row">
                <input
                    type="radio"
                    v-model="filter_params.timeOfDay"
                    value="only night"
                    name="timeOfDay"
                    id="only-night"
                ><label for="only-night">Only night</label>
              </div>
              <div class="row">
                <input
                    type="radio"
                    v-model="filter_params.timeOfDay"
                    value="only day"
                    name="timeOfDay"
                    id="only-day"
                ><label for="only-day">Only day</label>
              </div>
              <div class="row">
                <input
                    type="radio"
                    v-model="filter_params.timeOfDay"
                    value="all"
                    name="timeOfDay"
                    id="all"
                ><label for="all">All the time</label>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="btn btn-primary btn-group-double">
              <button
                  @click="[$emit('filterReset'), alert.showAlert('Default filters are set', 'success', 'small', 1000), uiVisibility.filtersShown = false]">
                Reset
              </button>
              <button @click="uiVisibility.filtersShown = false">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

</template>

<script>

import {computed, defineComponent, ref, watch} from "vue"
import InputTypeDate from "@/components/InputTypeDate";
import SearchBar from "@/components/SearchBar.vue";
import InfoMessage from "@/components/InfoMessage";
import {dateNowPlusIncrement} from "@/components/js/dateNowPlusIncrement";

export default defineComponent({

  components: {InputTypeDate, SearchBar, InfoMessage},
  props: {
    filterParams: Object,
    promoterName: String
  },
  emits: ['filterReset', 'filter-by-date-range'],
  setup(props, {emit}) {

    const alert = ref(null)

    const uiVisibility = ref({
      filtersShown: false
    })

    const activeQuickFilters = ref({
      today: false,
      thisWeek: false
    })

    const filter_params = computed(() => props.filterParams)

    function filterByDateRange(fromDate, toDate) {
      emit("filter-by-date-range", fromDate, toDate)
    }

    watch(filter_params.value.dateRange, (dateRange) => {
      let today = new Date().setHours(0, 0, 0, 0)
      let fromDate = dateRange.from
      let toDate = dateRange.to
      fromDate = fromDate.setHours(0, 0, 0, 0)
      toDate = toDate.setHours(0, 0, 0, 0)

      if (fromDate === today && toDate === dateNowPlusIncrement(1).setHours(0, 0, 0, 0)) {
        activeQuickFilters.value.today = true
        activeQuickFilters.value.thisWeek = false
      } else if (fromDate === today && toDate === dateNowPlusIncrement(7).setHours(0, 0, 0, 0)) {
        activeQuickFilters.value.today = false
        activeQuickFilters.value.thisWeek = true
      } else {
        activeQuickFilters.value.today = false
        activeQuickFilters.value.thisWeek = false
      }
    })

    return {alert, uiVisibility, activeQuickFilters, filter_params, filterByDateRange}
  },
})
</script>


<style>
.top-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.top-bar .search {
  width: 100%;
}

.filters-block {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background: var(--color-bg);
  color: #fff;
}

.show-filters-btn {
  height: 50px;
  width: 50px;
  min-width: 50px;
  margin-left: 10px;
  background: #151515;
  display: flex;
  border-radius: var(--radius-sm);
}

.show-filters-btn svg {
  width: 16px;
  height: 16px;
  margin: auto;
}

.filters-block .header {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-bg);
  text-align: center;
  padding-top: 40px;
  padding-bottom: 20px;
  font-size: 21px;
  font-weight: 700;
}

.close {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 20px;
  top: 35px;
}

.filters-form {
  padding-top: 66px;
}

.filters-form .container {
  padding-top: 30px;
  padding-bottom: 180px;
  overflow-x: scroll;
  height: 100vh;
}

.filter-group {
  margin-bottom: 10px;
}

.filter-group .title {
  margin-bottom: 15px;
  width: 100%;
  text-transform: capitalize;
}

.filter-group label {
  text-transform: capitalize;
}

.two-cols > div {
  display: inline-flex;
  width: 50%;
}

.two-cols > .input-group:nth-child(2n) {
  padding-left: 6px;
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--color-bg);
  padding: 20px;
  z-index: 10;
}

.quick-filters .item {
  position: relative;
  display: inline-flex;
  background: rgba(255, 255, 255, 0.12);
  font-size: 1em;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 20px;
  margin-bottom: 6px;
  overflow: hidden;

  border-radius: var(--radius-sm);
  transition: all .2s ease-out;
}

.quick-filters .item:not(:last-child) {
  margin-right: 6px;
}

.quick-filters .item img {
  height: 0.8em;
}

.quick-filters .item small {
  font-weight: 400;
  font-size: 12px;
  opacity: 0.8;
}

/*show/hide filters*/
.filters-block {
  opacity: 0;
  visibility: hidden;
  z-index: -2;
  transform: translateY(10%);
  transition: all .15s ease-out;
}

.filters-block.active {
  opacity: 1;
  visibility: visible;
  z-index: 9;
  transform: translateY(0);
  transition: all .25s ease-out;
}

/*panel*/
.filters-panel {
  overflow-x: scroll;
  padding-top: 8px;
  margin-left: -30px;
  margin-right: -30px;
  padding-left: 30px;
  padding-right: 30px;
}

.filters-panel .quick-filters {
  width: max-content;
  white-space: nowrap;
  display: flex;
}

.filters-panel .quick-filters > .item {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
  background: rgba(55, 55, 55, 0.8);
  min-height: 100%;
  line-height: 1em;
  position: relative;
  overflow: hidden;
}

.filters-panel .quick-filters > .item:not(:last-child) {
  margin-right: 6px;
}

.filters-panel .quick-filters img {
  height: 0.7em;
}

.quick-filters .item.active {
  padding-right: 30px;
  background: var(--color-primary-middle);

  transition: all .2s ease-in;
}

.quick-filters .cancel {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 1;
  top: 0;
  right: -30px;
  width: 30px;
  padding-right: 11px;

  transition: all .2s ease-in;
}

.quick-filters > .item.active .cancel {
  opacity: 1;
  visibility: visible;
  right: 0;
  width: 100%;
}

.event-date {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

@media (max-width: 375px) {
  .event-date {
    /*grid-template-columns: 1fr;*/
  }
}

.event-date .title {
  margin-bottom: 6px;
}

.event-date .input-group {
  padding: 0;
  width: 100%;
}

.filters-form .quick-filters {
  margin-bottom: 30px;
}

.p-relative {
  overflow: scroll;
}

.filter-group input {
  font-size: 13px;
}

.input-group input[type="radio"] {
  display: block;
  margin-right: 10px;
}

.input-group row row {
  display: grid;
  align-items: center;
}
</style>