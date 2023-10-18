<template>

  <OfflinePage/>

  <router-view></router-view>
  <BottomNavbar
      v-if="$route.matched.some(({ name }) => name !== 'WelcomePage' && name !== 'LoginPage' && name !== 'SignupPage' && name !== 'ConfirmContactsPage' && name !== 'ChatPrivat')"/>

</template>

<script>

import {defineComponent, onBeforeMount} from "vue";
import BottomNavbar from './components/BottomNavbar.vue'
import OfflinePage from "@/modules/offlinePage/components/OfflinePage";
import axios from "axios";
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  name: 'App',
  components: {
    OfflinePage,
    BottomNavbar,
  },

  setup() {
    onBeforeMount(() => {
      axios.post(process.env.VUE_APP_API_URL + 'user/tokencheck', {},
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            if(res.data.status !== "success") {
              userLogout();
            }

          })
    })
  }
})
</script>