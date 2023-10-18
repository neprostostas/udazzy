<template>
  <div class="header-filter">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "HeaderFilter"
}
</script>

<style scoped>
.header-filter {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.header-filter div:nth-child(1) {
  position: absolute;
  right: -42px;
  top: -37px;
  width: 80%;
  height: 70%;
  filter: blur(50px);
  opacity: 0.7;
  border-radius: 50%;
  background: #FA00FF;
}

.header-filter div:nth-child(2) {
  position: absolute;
  left: -42px;
  top: -37px;
  width: 70%;
  height: 90%;
  filter: blur(50px);
  opacity: 0.8;
  border-radius: 50%;
  background: #80E5B6;
}

.header-filter div:nth-child(3) {
  position: absolute;
  left: 0;
  top: -275px;
  width: 100%;
  height: 90%;
  filter: blur(107px);
  opacity: 0.8;
  border-radius: 50%;
  background: #492FE7;
}
</style>