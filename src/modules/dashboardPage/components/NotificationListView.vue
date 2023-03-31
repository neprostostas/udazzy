<template>

  <div class="sort-by">
    <div class="select-wrapper">
      <select class="sort">
        <option v-for="(item, ind) in sortOptions" :key="ind">{{ item }}</option>
      </select>
    </div>
  </div>

  <div v-if="!notifications.length" class="not-found">
    <div class="h4 text">There are no notifications(</div>
  </div>

  <div class="list">
    <ul>
      <NotificationListItem :key="index" v-for="(notify, index) in notifications"
                :text="notify.text"
                :img="notify.img"
                :icon="notify.icon"
                :time="notify.time"
      />
    </ul>
  </div>
</template>

<script>

import {defineComponent, ref} from "vue";
import NotificationListItem from "@/modules/dashboardPage/components/NotificationListItem";

export default defineComponent({
  components: { NotificationListItem },
  props: {},
  setup() {

    const sortOptions = ['Sort by date', 'New First', 'Sort by priority']

    const notifications = ref([]);

    notifications.value = [
      {
        id: 1,
        text: 'Congratulations! Your request to event “SUMMER NEVER ENDS” has been approved!',
        time: 3,
        img: '../img/promoter-ava1.jpg',
        icon: 'accept'
      },
      {
        id: 2,
        time: 12,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s read more',
        img: '../img/promoter-ava2.png',
        icon: 'decline'
      },
      {
        id: 3,
        time: 3,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s read more',
        img: '../../img/promoter-ava3.png',
        icon: 'pause'
      },
      {
        id: 4,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'share'
      },
      {
        id: 5,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'chat'
      },
      {
        id: 6,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'love'
      },
      {
        id: 7,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'share'
      },
      {
        id: 8,
        time: 29,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'chat'
      },
      {
        id: 9,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'accept'
      },
      {
        id: 10,
        time: 11,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'like'
      },
      {
        id: 11,
        time: 7,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'like'
      },
      {
        id: 12,
        time: 8,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'share'
      },
      {
        id: 13,
        time: 2,
        text: 'It was a great time, new acquaintances and a lot of positive emotions, I look forward to the next events and news!',
        img: '../img/promoter-ava1.jpg',
        icon: 'pause'
      }
    ]

    return {
      notifications,
      sortOptions
    }
  },
})

</script>

<style>
  .list {
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 200px;
    margin-left: -20px;
    margin-right: -20px;
  }

  .sort-by {
    margin-top: 20px;
    height: 22px;
    background: #1c1c1c;
  }

  .sort {
    background: transparent;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.9em;
    font-weight: 400;
    position: absolute;
    right: 0;
    top: -7px;
  }

  .sort option {
    color: #1A1F21;
  }

  .select-wrapper:after {
    content: "";
    position: absolute;
    background-image: url("../../../../src/assets/img/icons/chevron-bottom-wthite.svg");
    background-size: contain;
    height: 8px;
    width: 14px;
    right: 0;
    top: 50%;
    transform: translate(0, -25%);
  }

  li:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    margin-bottom: 15px;
  }

  .not-found {
    padding-top: 30px;
  }

</style>