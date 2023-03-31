<template>
  <div :class="status" class="event">
    <div class="rejected-by-prom">
      <span>Rejected by promoter</span>
    </div>
    <div class="event__bcg">
      <div class="event__bcg-shadow"></div>
    </div>
    <div class="event__info-wrap">
      <div class="event__icons-wrap">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div class="event__description">
        <span class="event__name">Introduction to the matrix</span>
        <span class="event__date">2022.08.26 10:23PM (2d left)</span>
        <span class="event__adress"
          >229, West 28th Street, New York, NY, USA</span
        >
        <div class="event__detal">
          <img src="../assets/img/markers/marker_1.svg" alt="icon" />
          <span>24/100</span>
          <span class="status">Status</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    about: String,
    status: String,
  },
  setup() {
    return {};
  },
});
</script>

<style>
.event {
  position: relative;
  display: flex;
  padding: 10px 20px;
  overflow: hidden;
  min-height: 400px;
  -webkit-box-shadow: 2px 2px 14px 2px #ffffff;
  box-shadow: -1px 1px 4px 2px #ffffff;
}

.event.approved .status {
  color: #2bff00;
}

.event.waiting_for_approve .status {
  color: #04ffff;
}

.event.rejected .status {
  color: #77ee7e;
}

.event.nearest .status {
  color: #f70a02;
}

.event.turn_back .status {
  color: #5c00e6;
}

.event__icon {
  width: 16px;
  height: 16px;
}

.event__info-wrap {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
}

.event__icons-wrap {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  margin: 6px 0 26px 0;
}

.event__icons-wrap span {
  font-size: 30px;
  height: max-content;
  line-height: 0;
}

.rejected-by-prom {
  display: none;
}

.rejected .rejected-by-prom {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}

.rejected-by-prom span {
  color: red;
  font-weight: 700;
  font-size: 26px;
  transform: rotate(-29deg);
}
.event__detal {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-grow: 1;
}

.event__detal img {
  width: 40px;
  object-fit: cover;
}
.event__detal span {
  /* color: rgb(15, 255, 15); */
  font-size: 18px;
}
.event__bcg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/img/test_party_photo.png") no-repeat;
  background-size: cover;
  z-index: -1;
}

.event__bcg-shadow {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  filter: grayscale(80%);
}

.event__name {
  font-size: 24px;
}

.event__description {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.event__date {
  margin-bottom: 16px;
  text-decoration: underline;
}
</style>