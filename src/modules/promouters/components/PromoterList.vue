<template>
  <div class="list-wrap">
    <template v-for="user in state.promotersFiltered" :key="user.id">
      <div v-if="user.uri !== currentUser" class="promoter">
        <router-link
          class="avatar-wrap"
          :to="{ name: 'PromoterDetails', params: { uri: user.uri } }"
        >
          <img
              class="avatar"
              :src="setPhoto(user.sex, user.photo)"
              alt="avatar"
          />
          <div class="info-wrap">
            <div class="name-wrap">
              <div>
                <div class="info-details">
                  <span class="name">{{ user.name }}</span>
                  <template v-if="user.sex === 'male'">
                    <img
                      class="sex-icon"
                      :src="
                        require('@/modules/profilePage/assets/icons/ic_male-participants.svg')
                      "
                      alt="male-icon"
                    />
                  </template>
                  <template v-if="user.sex === 'female'">
                    <img
                      class="sex-icon"
                      :src="
                        require('@/modules/profilePage/assets/icons/ic_female-participants.svg')
                      "
                      alt="female-icon"
                    />
                  </template>
                  <template v-if="user.sex === 'other'">
                    <img
                      class="sex-icon"
                      :src="
                        require('@/modules/profilePage/assets/icons/ic_other-participants.svg')
                      "
                      alt="other-icon"
                    />
                  </template>
                </div>

                <br />

                <span class="about">{{ user.info?.about }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
  <Loader />
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import { promotersState } from "@/modules/promouters/store/promotersState";
import { loaderStore } from "@/modules/loader/store/loader";
// import Loader from "@/modules/loader/components/Loader";

export default defineComponent({
  name: "PromoterList",

  setup() {
    const state = promotersState();
    const backPath = window.location.pathname;
    const currentUser = JSON.parse(localStorage.getItem("user_data")).uri;
    const loader = loaderStore();

    function setPhoto(sex, photo) {
      if (photo !== null) {
        return photo;
      }

      if (sex === "male") {
        return require("@/../public/img/default-ava-male.jpg");
      } else if (sex === "female") {
        return require("@/../public/img/default-ava-female.jpg");
      } else {
        return require("@/../public/img/default-ava-other.jpg");
      }
    }

    onBeforeMount(() => {
      loader.toggleLoader(true);
    });

    return {
      state,
      backPath,
      setPhoto,
      currentUser,
    };
  },
});
</script>

<style scoped>
.list-wrap {
  padding-bottom: 70px;
  padding-top: 150px;
}

.chat-wrap {
  display: flex;
  justify-content: flex-end;
  gap: 34px;
  padding: 10px 0 10px;
  min-width: 48px;
}

.about {
  color: #a8a8a8;
}

.info-details {
  align-items: center;
  display: inline-grid;
  grid-template-columns: repeat(2, auto);
  gap: 5px;
}

.info-wrap {
  flex-grow: 1;
}

.promoter:nth-child(1) {
  padding-top: 20px;
}

.promoter:last-child {
  margin-bottom: 60px;
}

.promoter {
  display: grid;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.avatar-wrap {
  cursor: pointer;
  flex-shrink: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}
</style>