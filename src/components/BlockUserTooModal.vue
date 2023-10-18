<template>

  <Loader v-if="loader_active" class="loader-on-block bg-dark"></Loader>

  <div class="overlay"></div>
  <div class="modaleBlockToo">

    <h1>You was blocked <br> by {{user?.name}}</h1>
    <p>Do you want to block {{user?.sex === 'male' ? 'him' : 'her'}} too?</p>

    <label class="switch">
      <input id="checkbox_block" type="checkbox" v-model="checked">
      <span class="slider round"></span>
    </label>

    <button v-if="checked"  class="block-modal-button"  @click="[getBlockedUser(), is_blocked ? $emit('clicked') : back()]">Block</button>
    <button v-if="!checked" class="cancel-modal-button" @click="[is_blocked ? $emit('clicked') : back()]">Cancel</button>

  </div>

</template>

<script>
import {defineComponent, ref, watchEffect} from "vue";
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import Loader from "@/modules/loader/components/Loader";
import {useRouter} from "vue-router";

export default defineComponent({
    components: {  
        Loader,
     },
    props: {
        user: Object,
        is_blocked: Boolean
    },
    emits: ['clicked'],

    setup(props) {

    const router = useRouter()

    const isIamBlocked = ref(true);
    const checked = ref(false);

    const loader_active = ref(false)

    function back() {
      router.push({path: "/profile"});
    }

    watchEffect(() => {

        loader_active.value = props.user === undefined;

    });

    function getBlockedUser() {
        axios.post(process.env.VUE_APP_API_URL+'user/block', qs.stringify(
        {
            user_uri: props.user.uri,
        }),
        {headers: {'Authorization': 'Bearer '+localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
        .then((res) => {
            console.log("block: ", res)
        })
        .catch((err) => {
            if(err.response.status === 401)
            // console.log(err)
            userLogout();
        });
    }

    return {
        isIamBlocked, checked, getBlockedUser, loader_active, back
    };
    },
});
</script>


<style scoped>

.overlay {
    z-index: 991;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000000;
}

.modaleBlockToo {
    display: grid;
    justify-content: center;
    align-items: center;
    justify-items: center;

    z-index: 992;
    width: 350px;
    height: 400px;
    padding: 20px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #FFFFFF;
    background: rgba(157, 157, 157, 0.69);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid rgba(157, 157, 157, 0.3);
}

.block-modal-button, .cancel-modal-button {
  height: 48px;
  line-height: 48px;
  font-size: 1.1em;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  width: fit-content;
  width: -moz-fit-content;
  width: 100%;
  max-width: 100%;
  letter-spacing: 0.02em;
  font-weight: 700;
  transition: all .3s linear;

  position: relative;
  z-index: 1;
  background: linear-gradient(94.01deg, #492FE7 16.65%, rgba(247, 21, 237, 0.92) 83.76%);
  border-radius: 14px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modaleBlockToo h1 {
    padding: 20px 0;
    font-size: 26px;
}

.modaleBlockToo p {
    padding: 20px 0;
    font-size: 20px;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(217, 217, 217, 0.2);
    -webkit-transition: .4s;
    transition: all .4s easy;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #000000;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .slider {
    transition: 0.5s all ease-in-out;
    background: linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);
}

input:focus + .slider {
    transition: 0.5s all ease-in-out;
    box-shadow: 0 0 1px linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(217, 217, 217, 0.2);
  -webkit-transition: .4s;
  transition: all .4s easy;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #000000;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  transition: 0.5s all ease-in-out;
  background: linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);
}

input:focus + .slider {
  transition: 0.5s all ease-in-out;
  box-shadow: 0 0 1px linear-gradient(89.7deg, #492FE7 0.25%, rgba(247, 21, 237, 0.92) 113.39%);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>