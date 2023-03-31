<template>
  <div class="event-info">
    <div class="text-info">
      <div class="info-wrap">
        <GradientIcon
            width="48"
            height="48"
            box-shadow="12"
            :src="require('../assets/icons/ic_cloac.svg')"
        />
        <span class="info-text">{{ setEventTime(store.getEventData.datetime) }}</span>

      </div>
      <div class="info-wrap">
        <GradientIcon
            width="48"
            height="48"
            box-shadow="12"
            :src="require('../assets/icons/ic_location.svg')"
        />
        <span class="info-text">{{ store.getEventData.place?.address }}</span>
      </div>
      <div class="info-wrap">
        <GradientIcon
            width=48
            height=48
            box-shadow="12"
            :src="require('../assets/icons/ic_pay.svg')"
        />
        <span class="info-text">{{ store.getEventData.price }}</span>
      </div>
    </div>
    <div class="description">
      <span class="description-title">Description</span>
      <span class="description-text">{{ store.getEventData.description }}</span>
    </div>
  </div>
</template>

<script>
import GradientIcon from "@/components/base/GradientIcon";
import {useEventStore} from "@/modules/eventDetail/store/event";
import moment from "moment";

export default {
  name: "EventInfo",
  components: {GradientIcon},

  setup() {
    const store = useEventStore();

    function setEventTime(value) {
      return moment(value).format("MMMM Do YYYY, h:mm a");
    }

    return {
      event,
      store,
      setEventTime
    }
  }
}
</script>

<style scoped>

.event-info {
  padding: 16px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.text-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px 16px;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 20px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  word-break: break-word;
}

.description-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.description-text {
  font-size: 13px;
  color: #FFFFFF;
}

.info-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.info-text {
  font-weight: 500;
  line-height: 20px;
  color: #FFFFFF;
}

</style>