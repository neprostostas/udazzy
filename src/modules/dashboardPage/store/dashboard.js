import {defineStore} from 'pinia';
import axios from "axios";
import {loaderStore} from "../../loader/store/loader";

export const dashboardStore = defineStore('dashboardDetail', {
    state: () => ({
        loader: loaderStore(),
    }),

    actions: {

        async getMyEvent(myEvents) {
            this.loader.toggleLoader(true)
            axios.post(
                    process.env.VUE_APP_API_URL + 'events/my',
                    {},
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        },
                    }
                )
                .then((res) => {
                    if (res.data.status === "success") {
                        myEvents.value = res.data.response;
                        // console.log(myEvents.value)
                    }

                    this.loader.toggleLoader(false)
                })
                .catch(() => {
                    this.loader.toggleLoader(false)
                });
        },

    }
})
