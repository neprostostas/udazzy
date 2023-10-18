import {defineStore} from 'pinia';

export const loaderStore = defineStore('loader', {
    state: () => ({
        loaderStatus: Boolean,
    }),
    actions: {
        toggleLoader(param) {
            this.loaderStatus = param;
        },
    }
})
