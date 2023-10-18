<template>

  <div v-if="itemsComputed.length" class="sort-wrapper">
    <div class="text">{{ itemsComputed.length }} Chats</div>
  </div>

  <div class="list list-chat">
    <ul>
      <template :key="index" v-for="(item, index) in itemsComputed">
        <ListItem
            v-if="item.user.uri"
            :type="'Chat'"
            :title="item.user.name"
            :description="item.last_message"
            :icon="{url: item.user.photo}"
            :datetime="item.last_message_at"
            :uri="item.user.uri"
        />
      </template>

    </ul>
  </div>

</template>

<script>

import {defineComponent, ref} from "vue";
import ListItem from "@/modules/eventsMap/components/ListItem";

export default defineComponent({
  components: {ListItem},
  props: {
    items: Object,
    currPos: Object
  },
  emits: ['filterReset'],
  setup(props) {
    const itemsComputed = ref(props.items)
    // console.log(itemsComputed.value)

    return {itemsComputed}
  },
})

</script>

<style scoped>

.list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.list {
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 100px;
}

.list-chat {
  padding-top: 5px;
}

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
  padding: 0 10px 10px;
}

.sort-wrapper .text {
  font-size: 0.95em;
  color: rgba(255, 255, 255, 0.5);
}

</style>