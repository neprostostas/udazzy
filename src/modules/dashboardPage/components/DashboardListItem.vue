<template>
  <li>
    <div class="wrapper" :class="{ active: downline }" @click="downline = !downline">

      <section>
        <div class="desc">

          <div class="top-info">
            <div class="dashboard_event_manager-name">Promouter <span>{{ managerName }}</span></div>

            <div class="date-group">
              <div class="dashboard_event_date">{{ date }}</div>
              <div class="dashboard_event_hours">{{ hours }}</div>
              <div v-if="days >= 0" class="dashboard_event_days">{{ days }}d left</div>
              <div v-if="days < 0" class="dashboard_event_days">{{ Math.abs(days) }}d ago</div>
            </div>

          </div>

          <div class="dashboard_event_main">

            <img src="../assets/icons/type.svg" alt="icon">

            <div class="group">
              <div class="dashboard_event_name">{{ name.toUpperCase() }}</div>

              <div class="dashboard_event_info1">
                <div class="dashboard_event_alcohol">{{ alcohol === false ? 'Alcohol party, &nbsp;' : 'Non-alcohol party, &nbsp;' }}</div>

                <template v-for="(mus, ind) in music" :key="ind">
                  <div class="dashboard_event_music">{{ mus + ',&nbsp;&nbsp;' }}</div>
                </template>

                <div class="dashboard_event_age"> {{ age }}+</div>
              </div>

            </div>

          </div>

          <div class="dashboard_event_address">{{ address }}</div>

          <div class="bottom_group">

            <div class="dashboard_event_participants">
              <div :class="key" v-for="(value, key) in participants" :key="key">
                <GenderIcon :sex="key"/>
                <div class="count_participants">
                  <span>{{ participants_joined[key] }}</span>
                  <span v-if="value === -1" class="color-gray">/∞</span>
                  <span v-else class="color-gray">/{{ value }}</span>
                </div>
              </div>
            </div>

            <div class="details-button">Details</div>

          </div>

        </div>
      </section>

    </div>

    <div v-if="downline" class="down-line">
      <button :class="{ active: leave }"   @click="[leave = true,  turn = false, details = false]">Leave event</button>
      <button :class="{ active: turn } "   @click="[leave = false, turn = true,  details = false]">Turn back</button>
      <button :class="{ active: details }" @click="[leave = false, turn = false, details = true ]">Details</button>
    </div>

  </li>
</template>

<script>

import {defineComponent, ref} from "vue";
import GenderIcon from "@/modules/profilePageEdit/components/GenderIcon";
import moment from "moment";

export default defineComponent({
  components: {
    GenderIcon
  },
  props: {
    name: String,
    address: String,
    participants: {},
    participants_joined : {},
    age: Number,
    music: {},
    alcohol: Boolean,
    managerName: String,
    datetime: Number,
  },
  setup(props) {

    const date = moment(props.datetime).format('L');
    const hours = moment(props.datetime).format('LT');

    const days = moment().diff(moment(props.datetime), 'days', false)

    const downline = ref(false)
    const leave = ref(false)
    const turn = ref(true)
    const details = ref(false)

    return {
      date,
      hours,
      days,
      downline,
      leave,
      turn,
      details
    }
  },
})

</script>

<style scoped>

.down-line {
  position: relative;
  top: -10px;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 33.33333%);
  background: #272727;
  border-radius: 0 0 14px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: right;
  color: rgba(255, 255, 255, 0.5);
  justify-content: space-around;
  padding: 20px 0 30px;
  height: 40px;
}

.down-line button {
  cursor: pointer;
  height: 40px;
  position: relative;
  top: -10px;
}

.down-line button.active {
  color: #FFFFFF;
  background: #151515;
  border-radius: 0 0 14px 14px;
  top: -20px;
  height: 60px;
  margin: -10px 0 0;
  padding: 20px 0 0;
}

li {
  list-style: none;
}

.wrapper {
  cursor: pointer;
  position: relative;
  z-index: 2;
  padding: 15px;
  margin: 0 auto;
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  max-width: 500px;
  border: 1px solid rgba(179, 179, 179, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(3px);
  background-size: cover;
  background: #1c1c1c;
}

.wrapper.active {
  background: #272727;
  border: 1px solid rgba(179, 179, 179, 0.8);
}

@media (min-width: 1000px) {
  .wrapper {
    max-width: unset;
  }
}

.img-wrapper img {
  border-radius: 50%;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.top-info {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.dashboard_event_hours {
  color: rgba(255, 255, 255, 0.5);
}

.dashboard_event_manager-name span {
  font-weight: 400;
}

.date-group {
  color: #FFFFFF;
  font-weight: 400;
  display: flex;
  gap: 4px;
}

.dashboard_event_name {
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
}

.dashboard_event_address {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #FBBC05;
  max-width: 280px;
}

.dashboard_event_info1 {
  display: flex;
  flex-wrap: wrap;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.5);
  max-width: 300px;
}

.dashboard_event_main {
  margin-left: -10px;
  padding: 0 0 20px 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 9px;
  align-items: center;
  justify-content: start;
}

.dashboard_event_participants {
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 15px;
}

.bottom_group {
  padding: 20px 0 0 0;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
}

.male, .female, .other {
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: start;
  gap: 5px;
}

.details-button {
  padding-top: 10px;
  height: 40px;
  border: none;
  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  width: 105px;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #FFFFFF;
  transition: all .3s linear;
  position: relative;
  z-index: 1;
  background: linear-gradient(269.98deg, #E914E1 1.49%, #4A2FE7 97.33%);
  border-radius: 14px;
}

.details-button:before {
  position: absolute;
  z-index: -1;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  content: '';
  background-color: #414141;;
  border-radius: calc(14px * .75);
  box-shadow: inset 0 0 8px 8px rgba(147, 35, 228, 0.1);
}

.details-button:after {
  opacity: 0.8;
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: '';
  background: linear-gradient(94.01deg, rgba(73, 47, 231, 0.5) 16.65%, rgba(247, 21, 237, 0.46) 83.76%);
  filter: blur(8px);
  border-radius: var(--radius);
}

</style>