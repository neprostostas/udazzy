<template>
  <Loader/>

  <div class="top-nav">
    <div class="top-bar">
      <router-link to="/events" class="go-back">
        <img src="../assets/img/icons/chevron-left-icon.svg" alt=""/>
      </router-link>
      <div class="search">
        <SearchBar
            :search="searchQuery"
            @input="(val) => (searchQuery = val)"
        />
      </div>
    </div>
  </div>

  <div class="list-wrapper">

    <ChatsList v-if="chatsFiltered.length"
               :items="chatsFiltered"
               @filter-reset="searchQuery = ''"
    />

    <div v-else-if="searchQuery.length >= 2" class="not-found">
      <div class="h4 text">There are no chats for your search</div>
    </div>

    <div v-else class="not-found">
      <div class="h4 text">You have no chats yet</div>
    </div>

  </div>
</template>

<script>

import {defineComponent, watch, ref, onBeforeMount} from "vue";
import ChatsList from "@/components/ChatsList";
import SearchBar from "@/components/SearchBar";
import {loaderStore} from "@/modules/loader/store/loader";
import {filterBySearch} from "@/components/js/filterBySearch";
import axios from "axios";
import userLogout from "@/components/js/userLogout";

export default defineComponent({
  components: {ChatsList, SearchBar},
  setup() {

    const chats = ref([]);
    const chatsFiltered = ref([]);
    const searchQuery = ref("");
    const loader = loaderStore();

    watch(
        () => chats.value,
        () => {
          chatsFiltered.value = filterBySearch(
              chats.value,
              searchQuery.value,
              ['name', 'last_message']
          );
        }
    );

    watch(
        () => searchQuery.value,
        () => {
          chatsFiltered.value = filterBySearch(
              chats.value,
              searchQuery.value,
              ['name', 'last_message']
          );
        }
    );

    onBeforeMount(() => {
      loader.toggleLoader(true);
    })

    onBeforeMount(() => {
      axios.post(process.env.VUE_APP_API_URL + 'chats', {},
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION
            }
          })
          .then((res) => {
            // console.log(res, "res")
            if (res.data.status === 'success') {
              chats.value = res.data.chats
              loader.toggleLoader(false);
            }
          })
          .catch((err) => {
            if (err.response.status === 401)
              userLogout()
          });
    });

    return {chatsFiltered, searchQuery};
  },
});
</script>


<style scoped>

.list-wrapper {
  width: 100%;
  height: -webkit-fill-available;
  min-height: 100vh;
  background: #1C1C1C;
  padding: 115px 20px 120px;
  position: relative;
  z-index: 0;
  overflow: scroll;
}

.events-view {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.events-view > .wrapper {
  width: 200vw;
  height: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
}

.events-view > .wrapper > .item {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.events-view.active > .wrapper {
  transform: translateX(-100vw);
}

.events-list {
  padding-top: 210px;
  background: var(--color-bg);
}

.vue-map {
  min-height: 100vh;
  width: 100vw;
}

.top-nav {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 50px;
  padding-left: 25px !important;
  padding-right: 25px !important;
  background: var(--color-bg) !important;
}

.toggle-view {
  position: relative;
  color: #fff;
  display: flex;
  margin-top: 15px;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.toggle-view div {
  width: 50%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  z-index: 3;
}

.toggle-view .bg:before {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
      93.85deg,
      #492fe7 16.7%,
      rgba(155, 35, 234, 0.962222) 48.06%,
      rgba(247, 21, 237, 0.92) 83.1%
  );
  transition: all 0.3s ease-in-out;
}

.toggle-view.active .bg {
  left: 50%;
}

.toggle-view.active .bg:before {
  left: -50%;
}

.toggle-view .bg {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  border-radius: var(--radius-sm);
  width: 50%;
  height: 100%;
  transition: all 0.3s ease-in-out;
}

.not-found {
  height: 100%;
  padding-bottom: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.not-found .text {
  margin-bottom: 30px;
  text-align: center;
}
</style>