import {createApp} from 'vue'
import router from './router/index.js'
import VueTelInput from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import Vue3TouchEvents from "vue3-touch-events";
import {createPinia} from 'pinia'
import Loader from '@/modules/loader/components/Loader'
import App from './App.vue'

const vm = createApp(App)

const telInputOptions = {
    autoDefaultCountry: true,
    // defaultCountry: 'US',
    ignoredCountries: ['RU'],
    inputOptions: {
        autofocus: true,
        showDialCode: false
    },
    dropdownOptions: {
        showDialCodeInSelection: true,
        showSearchBox: true
    },
    preferredCountries: ['US'],
    validCharactersOnly: true
}

vm.use(VueTelInput, telInputOptions);
vm.use(Vue3TouchEvents);
vm.use(router);
vm.use(createPinia());
vm.component('Loader', Loader);
vm.mount("#app");