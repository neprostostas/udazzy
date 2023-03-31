<template>
  <div class="profile-wrapper">
      <div class="container">

        <HeaderBackButton />

        <div class="top-wrapper">
          <div class="edit-wrapper">
            <div class="edit-text">Edit My Profile</div>
          </div>

          <EditForm />

        </div>
      </div>
  </div>


</template>

<script>

import {defineComponent} from "vue";
import HeaderBackButton from "@/modules/profilePageEdit/components/HeaderBackButton";
import EditForm from "@/modules/profilePageEdit/components/EditForm";

export default defineComponent({
  components: {EditForm, HeaderBackButton },
  setup() {

    return {

    };
  },
})
</script>

<style scoped>

.top-wrapper .bg-wrapper img {
  position: absolute;
  z-index: -1;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.top-wrapper .bg-wrapper .container .small > div {
  display: inline;
  margin-right: 15px;
  line-height: 1em;
  font-size: 13px;
  font-weight: 300;
}

.bottom-wrapper .container .title img {
  margin-right: 6px;
}

.profile-wrapper {
  overflow-y: scroll;
  height: -webkit-fill-available;
  min-height: 100%;
  text-align: center;
  background: #1C1C1C;
}

.container {
  padding: 60px 20px 120px;
  width: 100%;
  overflow: scroll;
  position: relative;
  z-index: 0;
}

.edit-wrapper {
  margin-bottom: 10px;
}

.edit-text {
  margin-bottom: 10px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0;
  font-size: 1.4em;
  line-height: 1.4em;
}

</style>