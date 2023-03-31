<template>

  <div v-if="itemsComputed.length" class="sort-wrapper">
    <div class="text">{{itemsComputed.length}} Promoters in your city</div>
  </div>

  <div v-else class="not-found">
    <div class="h4 text">There are no promoters matching your search query :(</div>
    <div @click="$emit('filterReset')" class="btn btn-sm btn-primary">Reset search</div>
  </div>

  <div class="list">
    <ul>
      <ListItem :key="index" v-for="(item, index) in itemsComputed"
                :type="'Promoter'"
                :title="item.name"
                :info="item.info"
                :icon="{url: item.photo}"
                :rating="item.rating"
                :uri="item.uri"
      />
    </ul>
  </div>

</template>

<script>

import ListItem from "@/modules/eventsMap/components/ListItem";
import {defineComponent, watch, ref, computed} from "vue";

export default defineComponent({
  components: {ListItem},
  props: {
    items: Object,
    currPos: Object
  },
  emits: ['filterReset'],
  setup(props) {

    const userData = ref(JSON.parse(localStorage.getItem('user_data')));
    const itemsComputed = computed(() => props.items.filter((item => item.uri !== userData.value.uri)))

    const sortOptions = [
      'By Rate'
    ]

    const sortOptionsSelected = ref(sortOptions[0])

    function sortBy(val) {
      if(val === 'Recommended') {
        itemsComputed.value.sort( ( a, b ) => {
          if ( a.rating < b.rating ){
            return -1;
          }
          if ( a.rating > b.rating ){
            return 1;
          }
          return 0;
        });
      }
      if(val === 'By Rate') {
        itemsComputed.value.sort( ( a, b ) => {
          if ( a.rating > b.rating ){
            return -1;
          }
          if ( a.rating < b.rating ){
            return 1;
          }
          return 0;
        });
      }
    }

    watch(itemsComputed.value, () => {
      sortBy(sortOptionsSelected.value)
    })

    return {sortBy, itemsComputed, sortOptions, sortOptionsSelected}
  },
})

</script>

<style scoped>
  li:not(:last-child) .desc {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
  li:not(:last-child) {
    margin-bottom: 15px;
  }

  .sort-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
  }
  .sort-wrapper .text {
    font-size: 0.95em;
    color: rgba(255, 255, 255, 0.5);
  }
  .not-found {
    height: 100%;
    padding-bottom: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .not-found .text {
    margin-bottom: 30px;
    text-align: center;
  }
</style>