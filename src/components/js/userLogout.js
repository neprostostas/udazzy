import axios from "axios";
import router from '@/router/index.js';

export default function userLogout() {
    axios.post(process.env.VUE_APP_API_URL + 'user/logout', {},
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })
        .then((res) => {
            if (res.data.status === 'success') {
                localStorage.removeItem('token')
                localStorage.removeItem('user_data')
                localStorage.removeItem('firstLoad');

                router.replace('/welcome')
            }
        })
}