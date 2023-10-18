<template>
  <button class="secondaryBtn">
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "ButtonSecondary"
}
</script>

<style scoped>

.secondaryBtn:before {
  position: absolute;
  content: "";
  width: 98%;
  height: 92%;
  background: #414141;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 14px;
  text-align: center;
}

.secondaryBtn {
  position: relative;
  width: 100%;
  padding: 17px 0;
  border: none;
  font-size: 1.35em;
  color: #fff;
  text-align: center;
  letter-spacing: 0.02em;
  font-weight: 700;
  border-radius: 14px;
  background: linear-gradient(93.85deg, #492FE7 16.7%, rgba(155, 35, 234, 0.962222) 48.06%, rgba(247, 21, 237, 0.92) 83.1%);
  transition: 0.2s;
}

.secondaryBtn span {
  position: relative;
  z-index: 4;
}
</style>