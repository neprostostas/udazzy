<template>
  <button :style=styles class="primary">
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "ButtonPrimary",

  props: {
    width: String,
    height: String,
    padding: String,
  },

  setup(props) {
    const styles = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      padding: `${props.padding}px`
    }

    return {
      styles
    }
  },
}
</script>

<style scoped>

.primary {
  position: relative;
  text-align: center;
  width: 100%;
  padding: 17px 0;
  border: none;
  font-size: 1.35em;
  letter-spacing: 0.02em;
  font-weight: 700;
  color: #fff;
  transition: 0.2s;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: var(--radius);
  z-index: 2;
}

.primary:active {
  transform: scale(0.97, 0.97);
}

span {
  display: block;
  width: max-content;
  margin: 0 auto;
  animation: slide 0.4s forwards;
  opacity: 0;
  transform: translateX(-40px);
}

@keyframes slide {
  0% {

  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

</style>