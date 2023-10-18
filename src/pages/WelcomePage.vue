<template>
  <div class="welcome-page-wrapper bg-dark h-100 overflow-hidden"
       :class="{ welcome_page_1: welcome_1, welcome_page_2: welcome_2, welcome_page_3: welcome_3 }">

    <div id="welcome-screen" class="welcome-screen inner-padd" :class="welcomeScreen ? 'animated' : ''">
      <div class="logo-wrapper">
        <div class="logo logo-big"><img src="@/assets/img/logo/logo-white.svg" alt="uDazzy"></div>
      </div>
      <div class="bg-wrapper">
      </div>
    </div>

    <div v-if="welcome_1" class="welcome_container" v-touch:swipe.left="swipeScreen('2')">
      <div id="intro-page">
        <div class="bg-decor1"></div>
        <div class="swap-buttons">
          <div class="welcome_1_button" @click="changeScreen('1')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_1 }"/>
          </div>

          <div class="welcome_2_button" @click="changeScreen('2')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_2 }"/>
          </div>

          <div class="welcome_3_button" @click="changeScreen('3')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_3 }"/>
          </div>
        </div>

        <h3 class="text text-big">Find the right place</h3>
        <p class="text text-small">With our party map you can see events going on all over the city of your choice and
          decide where <strong>YOU</strong> want to go
        </p>

        <div class="login-button btn btn-primary"
             @click="changeScreen('2')">
          Next
        </div>
      </div>
    </div>

    <div v-if="welcome_2" class="welcome_container" v-touch:swipe.left="swipeScreen('3')"
         v-touch:swipe.right="swipeScreen('1')">
      <div id="intro-page">

        <div class="bg-decor2"></div>

        <div class="swap-buttons">
          <div class="welcome_1_button" @click="changeScreen('1')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_1 }"/>
          </div>

          <div class="welcome_2_button" @click="changeScreen('2')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_2 }"/>
          </div>

          <div class="welcome_3_button" @click="changeScreen('3')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_3 }"/>
          </div>
        </div>

        <h3 class="text text-big">Find the right people</h3>
        <p class="text text-small">The power is in your hands! Reach out to party hosts at your favorite venues and
          reserve yourself a spot on the guest list, right here inside the UDAZZY app</p>

        <div class="login-button btn btn-primary" @click="changeScreen('3')">
          Next
        </div>

      </div>
    </div>

    <div v-if="welcome_3" class="welcome_container" v-touch:swipe.right="swipeScreen('2')">
      <div id="intro-page">
        <div class="bg-decor3"></div>
        <div class="swap-buttons">
          <div class="welcome_1_button" @click="changeScreen('1')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_1 }"/>
          </div>

          <div class="welcome_2_button" @click="changeScreen('2')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_2 }"/>
          </div>

          <div class="welcome_3_button" @click="changeScreen('3')">
            <ButtonPrimary :height="'3'" :padding="'0'" :class="{ active: !welcome_3 }"/>
          </div>
        </div>
        <h3 class="text text-big">Host your own events</h3>
        <p class="text text-small">Doing your own thing? Move on from experiencing vibes to creating your own! You can
          join UDAZZY as a promoter and get access to all the tools you need to throw your own parties or host your own
          tables</p>
        <router-link to="/login" class="login-button btn btn-primary">{{ welcome_3 ? "Get Started" : "Skip" }}
        </router-link>

      </div>
    </div>


  </div>
</template>

<script>

import {defineComponent, onMounted, ref} from "vue";
import ButtonPrimary from "@/components/base/ButtonPrimary";

export default defineComponent({
  components: {ButtonPrimary},
  setup() {

    const welcome_1 = ref(true)
    const welcome_2 = ref(false)
    const welcome_3 = ref(false)

    const welcomeScreen = ref(false)

    onMounted(() => {
      welcomeScreen.value = true;
    });

    function swipeScreen(action) {

      return () => {
        changeScreen(action)
      }
    }

    function changeScreen(action) {
      switch (action) {
        case '1':
          welcome_1.value = true;
          welcome_2.value = false;
          welcome_3.value = false;
          break;

        case '2':
          welcome_1.value = false;
          welcome_2.value = true;
          welcome_3.value = false;
          break;

        case '3':
          welcome_1.value = false;
          welcome_2.value = false;
          welcome_3.value = true;
          break;
      }
    }

    return {
      welcomeScreen,
      welcome_1, welcome_2, welcome_3, swipeScreen, changeScreen,
    }
  },
})

</script>


<style scoped>

.bg-decor1 {
  position: fixed;
  z-index: -2;
  left: -30%;
  top: 40%;
  width: 100%;
  height: 60%;
  background: #80e5b6;
  border-radius: 50%;
  filter: blur(66px);
  opacity: 0.6;
}

.bg-decor2 {
  position: fixed;
  z-index: -3;
  right: -50%;
  top: 10%;
  width: 100%;
  height: 80%;
  background: #492fe7;
  border-radius: 50%;
  filter: blur(66px);
  opacity: 0.9;
}

.bg-decor3 {
  position: fixed;
  z-index: -1;
  right: -25%;
  bottom: 20%;
  width: 100%;
  height: 40%;
  background: #fa00ff;
  border-radius: 50%;
  filter: blur(66px);
  opacity: 0.6;
}

.text {
  position: absolute;
  left: 20px;
  font-style: normal;
  color: #FFFFFF;
}

.text-big {
  bottom: 200px;
  font-weight: 900;
  font-size: 40px;
  line-height: 50px;
  padding-bottom: 13px;
}

.text-small {
  bottom: 140px;
  font-weight: 300;
  font-size: 15px;
  line-height: 19px;
}

.welcome-page-wrapper {
  z-index: 15;
}

.welcome_container {
  height: 100vh;
  z-index: 12;

}

.login-button {
  position: absolute;
  bottom: 60px;
  margin: 0 20px;
  width: calc(100vw - 40px);
}

.next-btn {
  bottom: 160px;
}

.welcome_page_1, .welcome_page_2, .welcome_page_3 {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 80vh;
  transition: all 0.5s ease-in-out;
}

.welcome_page_1 {
  background-image: url("../assets/img/welcome/welcome-1.png");
}

.welcome_page_2 {
  background-image: url("../assets/img/welcome/welcome-2.png");
}

.welcome_page_3 {
  background-image: url("../assets/img/welcome/welcome-3.png");
}

.swap-buttons {
  z-index: 8;
  text-align: center;
  padding: 30px 20px 10px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 13px;
  cursor: pointer;
}

.active {
  background: #FFFFFF;
}

.welcome-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.welcome-screen .bg-wrapper {
  background: var(--color-dark);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.welcome-screen .logo-wrapper {
  position: relative;
  z-index: 10;
  background: transparent;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.welcome-screen.animated .bg-wrapper {
  animation: fade-out 0.8s forwards;
}

.welcome-screen.animated .logo-wrapper {
  animation: fade-out 0.6s forwards;
}

.welcome-screen.animated {
  z-index: -1;
  animation: z-index-hide 1.2s forwards;
}

.welcome-screen.animated .logo {
  transform: scale(1);
  animation-duration: 0.9s;
  animation-name: logo-pulse;
  animation-timing-function: ease;
  z-index: -1;
}


@keyframes fade-out {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes logo-pulse {
  0% {
    transform: scale(1)
  }
  40% {
    transform: scale(0.8)
  }
  100% {
    transform: scale(3.4)
  }
}

@keyframes z-index-hide {
  0% {
    z-index: 9;
  }
  99% {
    z-index: 9;
  }
  100% {
    z-index: -1;
  }
}


.logo {
  pointer-events: none;
  width: 40%;
}

.logo img {
  max-height: 100%;
}

</style>