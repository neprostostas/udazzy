import {defineStore} from 'pinia';
import axios from "axios";
import qs from "qs";
import userLogout from "@/components/js/userLogout";
import {loaderStore} from "../../loader/store/loader";

export const useEventStore = defineStore('eventDetail', {
    state: () => ({
        eventCreator: '',
        eventParticipantsJoined: {male: 0, female: 0, other: 0},
        eventUserList: [],
        loader: loaderStore(),
        allEventData: '',
        iAmParticipant: false,
        manager: {},
        participants: {},
        alreadyOnEvent: false,
        fullParty: true,
    }),

    getters: {
        getIamParticipants: (state) => state.iAmParticipant,
        getManagerData: (state) => state.manager,
        getEventData: (state) => state.allEventData,
        getParticipants: (state) => state.participants,
        getParticipantsJoined: (state) => state.eventParticipantsJoined,
        getEventCreator: (state) => state.eventCreator,
        getEventUserList: (state) => state.eventUserList,
        getAlreadyOnEvent: (state) => state.alreadyOnEvent,
        getFullParty: (state) => state.fullParty
    },

    actions: {
        /**
         * recount participants after join\leave party request
         * @param {string} action
         * @param {string} sex
         */
        recountJoinedParticipants(action, sex) {
            if (action === "join") {
                this.eventParticipantsJoined[sex]++;
            } else {
                this.eventParticipantsJoined[sex]--;
            }
            this.setFullparty();
        },
        /**
         * send request to server by event id  for data about event and set it to event store
         * @param {string} id
         */
        setFullparty() {
            const userSex = JSON.parse(localStorage.getItem('user_data')).sex;
            this.fullParty = this.getParticipantsJoined[userSex] < this.getParticipants[userSex];
        },

        setEventDetails(id) {
            axios.post(process.env.VUE_APP_API_URL + 'events/detail', qs.stringify(
                    {
                        id: id
                    }),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                }).then(async (res) => {
                // console.log(res.data);
                if (res.data.status === 'success') {
                    const data = res.data.response;
                    this.allEventData = data;
                    this.manager = data.manager;
                    this.participants = data.participants;
                    this.eventParticipantsJoined = data.participants_joined;
                    await this.eventBtnStatus();
                    this.setFullparty();
                    this.eventCreator = data.created_by == JSON.parse(localStorage.getItem('user_data')).id;
                    this.alreadyOnEvent = data.ImAParticipant;
                    // this.eventCreator = true;
                }
            })
                .catch((err) => {
                    if (err.response.status === 401)
                        userLogout()
                });
        },
        /**
         * send request to server by event id for participants data and set it to event store
         * @param {string} id
         */
        setParticipantsList(id) {
            axios.post(process.env.VUE_APP_API_URL + `events/participants/list/${id}`, {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                }).then(async (res) => {
                if (res.data.status === 'success') {
                    this.eventUserList = res.data.response;
                    // await this.setAlreadyOnEvent(JSON.parse(localStorage.getItem('user_data')).id);
                } else {
                    alert.value.showAlert(res.data.title, 'danger')
                }
            })
                .catch((err) => {
                    alert.value.showAlert(err.response.data.title, 'danger')

                    if (err.response.status === 401)
                        userLogout()
                });
        },
        /**
         * set count of joined user which is confirmed
         * @param {array} joined
         */
        /**
         * set new user to participants list (only UI)
         * @param {object} user
         */
        setNewUser(user) {
            this.eventUserList.unshift(user);
        },
        /**
         * remove user from participants list (only UI)
         * @param {string} id
         */
        removeUser(id) {
            this.eventUserList = this.eventUserList.filter((item) => item.user.id !== id);
        },
        /**
         * sent request to reject user from the party (Only for promoter)
         * @param {string }user_id
         * @param {string }eventId
         */
        participantReject(user_id, eventId) {

            axios.post(process.env.VUE_APP_API_URL + 'events/participants/update/' + eventId, qs.stringify(
                    {
                        user_id: user_id,
                        action: 'decline'
                    }),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                })
                .then(() => {
                })
                .catch((err) => {
                    // alert.value.showAlert(err.response.data.title, 'danger')

                    if (err.response.status === 401)
                        userLogout();
                });
        },
        /**
         * approve request to join the party (Only for promoter)
         * @param {string }user_id
         * @param {string }eventId
         */
        participantConfirm(user_id, eventId) {

            axios.post(process.env.VUE_APP_API_URL + 'events/participants/update/' + eventId, qs.stringify(
                    {
                        user_id: user_id,
                        action: 'accept'
                    }),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                })
                .then(() => {

                })
                .catch((err) => {
                    alert.value.showAlert(err.response.data.title, 'danger')

                    if (err.response.status === 401)
                        userLogout();
                });
        },
        /**
         * change user status confirm\reject  (only UI)
         * @param { string }id
         * @param {string} action
         * @param {array} usersList
         * @param {string} eventId
         */
        setUserStatus(id, action, usersList, eventId, sex) {
            const changeStatus = usersList.map((item) => {
                if (!Array.isArray(item.user) && item.user.id === id) {
                    item.status = action;
                }
                return item;
            })

            if (action === 'confirmed') {
                this.participantConfirm(id, eventId);
                // console.log(sex)
                this.recountJoinedParticipants('join', sex);
            }

            if (action === 'rejected') {
                this.participantReject(id, eventId);
                // console.log(sex, 2)

                this.recountJoinedParticipants('reject', sex);
            }

            this.eventUserList = changeStatus;
        },
        /**
         * request joint to event
         * @returns {Promise<AxiosResponse<any>>}
         */
        joinEvent() {
            return axios.post(process.env.VUE_APP_API_URL + 'events/participants/join/' + this.allEventData.id, qs.stringify(
                    {
                        user_id: JSON.parse(localStorage.getItem('user_data')).id
                    }),
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                })
        },
        /**
         * set witch button show, leave\join
         */
        eventBtnStatus() {
            const userSex = JSON.parse(localStorage.getItem('user_data')).sex
            const status = this.eventParticipantsJoined[userSex] < this.allEventData.participants[userSex];
            this.loader.toggleLoader(false);

            if (this.allEventData.participants[userSex] === -1) {
                this.iAmParticipant = true;
                return;
            }

            this.iAmParticipant = status;
        },
        /**
         * request leave to event
         * @returns {Promise<AxiosResponse<any>>}
         */
        leaveEvent() {
            return axios.post(process.env.VUE_APP_API_URL + `events/participants/deletebyevent/${this.allEventData.id}`, {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                        'app-version': process.env.VUE_APP_VERSION
                    }
                })

        }
    },

})
