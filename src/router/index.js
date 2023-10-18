import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ConfirmContactsPage from "@/pages/ConfirmContactsPage";
import PromotersPage from "@/pages/PromotersPage.vue";
import PromoterDetails from "@/pages/PromoterDetails";
import EventsMap from '@/pages/EventsMap';
import EventDetails from "@/pages/EventDetails";
import EventDetailsPageEdit from "@/pages/EventDetailsPageEdit";
import ProfilePage from "@/pages/ProfilePage";
import ProfilePageEdit from "@/pages/ProfilePageEdit";
import PromoterVerificationPage from "@/pages/PromoterVerificationPage";
import ChatsPage from "@/pages/ChatsPage";
import ChatPrivatPage from "@/pages/ChatPrivatPage";
import CreateEventPage from "@/pages/CreateEventPage";
import {createWebHistory, createRouter} from "vue-router";
import {ref} from "vue";

function redirect() {

    const user_data = ref(JSON.parse(localStorage.getItem('user_data')));

    if(!user_data.value?.name && user_data.value) {
        return '/signup'
    } else if (user_data.value?.name) {
        return '/events'
    } else {
        return '/welcome'
    }

}

const routes = [
    {path: "/:catchAll(.*)", redirect: redirect()},
    {
        path: "/welcome",
        name: "WelcomePage",
        component: WelcomePage
    },
    {
        path: "/login",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/confirm-contacts",
        name: "ConfirmContactsPage",
        component: ConfirmContactsPage
    },
    {
        path: "/signup",
        name: "SignupPage",
        component: SignupPage,
        emits: true
    },
    {
        path: "/events",
        name: "EventsMap",
        component: EventsMap
    },
    {
        path: "/events-by-:managerId",
        name: "PromoterEvents",
        component: EventsMap,
        props: true
    },
    {
        path: "/event-:id",
        name: "EventDetails",
        component: EventDetails,
        props: true
    },
    {
        path: "/edit-event:id",
        name: "EventDetailsPageEdit",
        component: EventDetailsPageEdit,
        props: true
    },
    {
        path: "/create-event",
        name: "CreateEventPage",
        component: CreateEventPage,
    },
    {
        path: "/promoters",
        name: "PromotersPage",
        component: PromotersPage
    },
    {
        path: "/promoter-:uri",
        name: "PromoterDetails",
        component: PromoterDetails,
        props: true
    },
    {
        path: "/profile",
        name: "ProfilePage",
        component: ProfilePage
    },
    {
        path: "/user-:uri",
        name: "UserPage",
        component: ProfilePage,
        props: true
    },
    {
        path: "/profile-edit",
        name: "ProfilePageEdit",
        component: ProfilePageEdit
    },
    {
        path: "/upgrade",
        name: "PromoterVerificationPage",
        component: PromoterVerificationPage
    },
    {
        path: "/chats",
        name: "ChatsPage",
        component: ChatsPage
    },
    {
        path: "/chat-:toUserUri",
        name: "ChatPrivat",
        component: ChatPrivatPage,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;