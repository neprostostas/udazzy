<template>
  <input
      type="datetime-local"
      ref="input"
      v-bind:value="dateToYYYYMMDD(value)"
      v-on:input="updateValue($event.target)"
      class="custom-input">
</template>

<script>

import {defineComponent} from "vue"

export default defineComponent({
  props: ['value'],
  emits: ['input'],
  setup(props, {emit}) {

    function dateToYYYYMMDD(d) {
      if (typeof d === 'number') {
        d = new Date(d);
      }
      return d && new Date(d.getTime()).toISOString().slice(0, new Date().toISOString().lastIndexOf(":"));
    }

    function updateValue(target) {
      emit('input', new Date(target.value));
    }

    return {dateToYYYYMMDD, updateValue}
  },
})
</script>

<style>

.custom-input {
  color-scheme: light;
  height: 48px;
  width: 96%;
  background: #252525;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 12px !important;
  padding-left: 10px;
  padding-right: 10px;
  text-indent: 5px;
  font-size: 1em;
  font-weight: 500;
  transition: all .3s linear;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.12);
}

.custom-input::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

@media (max-width: 400px) {
  .custom-input {
    font-size: 12px;
  }
}

</style>