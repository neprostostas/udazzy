<template>
  <div class="creator">
    <img class="creator-avatar"
         :src="store.getManagerData?.image || require('../../../../public/img/default-ava-default.jpg')" alt="src">
    <div class="creator-info">
      <span class="creator-name">{{ store.getManagerData?.name || 'Morpheus' }}</span>
      <span class="creator-type">Promoter</span>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {useEventStore} from "@/modules/eventDetail/store/event";

export default defineComponent({
  setup() {
    const store = useEventStore();

    return {
      store,
    }
  }
})

</script>

<style scoped>
.creator {
  display: flex;
  padding: 16px 20px
}

.creator-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}

.creator-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
}

.creator-name {
  font-weight: 500;
  line-height: 20px;
  color: #FFFFFF;
}

.creator-type {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

/*.star-wrap {*/
/*  display: flex;*/
/*  gap: 2px;*/
/*}*/

/*.star {*/
/*  width: 24px;*/
/*  height: 24px;*/
/*}*/
</style>