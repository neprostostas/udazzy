import {defineStore} from 'pinia';
import axios from "axios";
import userLogout from "@/components/js/userLogout";
import {loaderStore} from "../../loader/store/loader";

export const profileStore = defineStore('profilePage', {
    state: () => ({
        loader: loaderStore(),
    }),

    actions: {

        getUserData(uriProp, isItMe, user) {
            let uri = ''
            if(!isItMe.value) {
                uri = '/' + uriProp;
            }

            this.loader.toggleLoader(true);

            axios.post(process.env.VUE_APP_API_URL+'user' + uri, {},
                {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
                .then((res) => {
                    user.value = res.data.user

                    this.loader.toggleLoader(false);

                    if(isItMe.value) {
                        localStorage.setItem('user_data', JSON.stringify(res.data.user))
                    }
                })
                .catch((err) => {
                    if(err.response.status === 401)
                        userLogout();
                });
        },

        getMeData(me) {
            this.loader.toggleLoader(true);

            axios.post(process.env.VUE_APP_API_URL+'user', {},
                {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', 'app-version': process.env.VUE_APP_VERSION}})
                .then((res) => {
                    me.value = res.data.user

                    this.loader.toggleLoader(false);

                })
                .catch((err) => {
                    if(err.response.status === 401)
                        userLogout();
                });
        }


    }
})
