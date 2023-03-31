<template>
    <div class="input-group">
      <div class="search-input bg-blur">
        <img src="../assets/img/icons/search-icon.svg" alt="">
        <input type="text"
               placeholder="Search..."
               :value="search"
               v-on:input="$emit('input', $event.target.value)"
               @keydown.enter.prevent />
      </div>
    </div>
</template>

<script>

import {defineComponent, ref} from "vue"

export default defineComponent({
  props: {
    search: String
  },
  emits: ['input'],
  setup(props) {

    const searchVal = ref(props.search)

    return {searchVal}
  },
})

</script>


<style>

.search-input {
  border-radius: var(--radius-sm);
}
.search input {
  height: 50px;
  background: transparent;
}
.search-input input {
  width: 100%;
  color: #fff;
  padding: 0 20px;
  padding-left: 45px;
}
.search-input input::placeholder {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
}
.search-input img {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translate(0, -50%);
}

</style>