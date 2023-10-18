<template>
  <li :class="type">
    <div class="wrapper">
      <div>
        <div class="img-wrapper" :class="[ImAParticipant ? 'my-event' : '']">
          <template v-if="type === 'Promoter'">
            <router-link
                :to="{ name: 'PromoterDetails', params: { uri: uri } }"
            >
              <img class="icon-link" :src="icon.url" alt="icon"/>
            </router-link>
          </template>

          <template v-if="type === 'Chat'">
            <router-link
                :to="{
                name: 'ChatPrivat',
                params: { toUserUri: uri, backLink: backPath },
              }"
            >
              <img class="icon-link" :src="icon.url" alt="icon"/>
            </router-link>
          </template>

          <template v-if="type === 'Reviews'">
            <img class="icon-link" :src="icon.url" alt="icon"/>
          </template>

          <img
              v-if="type !== 'Promoter' && type !== 'Chat' && type !== 'Reviews'"
              :src="icon.url"
              alt="icon"
          />
        </div>
      </div>

      <section>
        <div class="desc">
          <div v-if="type !== 'Reviews' && type !== 'Chat'" class="title">{{ title }}</div>

          <div v-if="type === 'Reviews'" class="review-block">
            <div class="review-title">{{ title }}</div>
            <Star v-if="type === 'Reviews'" class="star" :rank-stars="rating"/>
          </div>


          <div class="description">{{ info?.about }}</div>

          <template v-if="type === 'Reviews'">
            <div class="description-review">{{ description }}</div>
            <div class="like-group">
              <div class="like">
                <img
                    @click="like++"
                    src="../../promouterPage/assets/icons/like.svg"
                    alt="like"
                />
                <p @click="like++">{{ like }}</p>
              </div>

              <div class="dislike">
                <img
                    @click="dislike++"
                    src="../../promouterPage/assets/icons/dislike.svg"
                    alt="dislike"
                />
                <p>{{ dislike }}</p>
              </div>
            </div>
          </template>

          <div v-if="info?.instagram" class="instagram">
            <span class="inst-wrap">Inst: </span>
            {{ info?.instagram }}
          </div>

          <div class="address">{{ place?.address }}</div>

          <div
              v-if="type !== 'Promoter' && type !== 'Chat' && type !== 'Reviews'"
              class="date"
          >
            {{ eventDate }}
          </div>

          <span class="music">
            <span v-for="music in eventMusic" :key="music">{{ music }}</span>
          </span>

          <div class="chat-instance">
            <div class="chatWrap">
              <div v-if="type === 'Chat'" class="title">{{ title }}</div>

              <div v-if="type === 'Chat'" class="description">
                {{ description ? description : "Tap to chat" }}
              </div>
            </div>

            <router-link v-if="type === 'Chat'" class="chat-wrap"
                         :to="{ name: 'ChatPrivat', params: { toUserUri: uri, backLink:backPath }}">
              <img src="../../promouters/assets/icons/ic_chat.svg" alt="chat">
            </router-link>
          </div>

          <div class="bottom-wrapper">
            <div
                v-if="
                participants_joined?.male >= participants?.male &&
                participants?.male !== -1 &&
                participants_joined?.female >= participants?.female &&
                participants?.female !== -1 &&
                participants_joined?.other >= participants?.other &&
                participants?.other !== -1
              "
                class="crowded"
            >
              <div class="color-secondary">CROWDED</div>
            </div>
            <div v-else class="participants">
              <div>
                <div v-for="(value, key) in participants" :key="key">
                  <template v-if="participants_joined[key] !== 0">
                    <GenderIcon :gender="key"/>
                    <span>{{ participants_joined[key] }}</span>
                    <span v-if="value === -1" class="color-gray">/∞</span>
                    <span v-else class="color-gray">/{{ value }}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </li>
</template>

<script>
import {defineComponent, ref, computed} from "vue";
import {printDate} from "@/components/js/printDate";
import {timeSince} from "@/components/js/timeSince";
import GenderIcon from "@/modules/eventsMap/components/GenderIcon";
import Star from "@/components/base/Star";

export default defineComponent({
  components: {Star, GenderIcon},
  props: {
    type: String,
    title: String,
    eventMusic: Array,
    eventType: String,
    info: {},
    description: String,
    icon: {},
    label: {},
    place: {},
    datetime: Number,
    participants_joined: {},
    participants: {},
    dob: String,
    ImAParticipant: Boolean,
    isNightEvent: Boolean,
    rating: Number,
    id: String,
    uri: String,
    sex: String,
    status: String,
    itIsMyEvent: Boolean,
  },
  setup(props) {
    // console.log('userUri', props.uri)
    const eventDate = computed(() => printDate(props.datetime));
    const time_since = computed(() => timeSince(props.datetime));
    const backPath = window.location.pathname;
    const like = ref(0);
    const dislike = ref(0);
    return {eventDate, time_since, like, dislike, backPath};
  },
});
</script>

<style>
li {
  list-style: none;
}

li.Reviews {
  padding: 20px 0 0;
}

li.Chat {
  padding-bottom: 0;
}

li.Chat:first-child {
  padding-top: 5px;
}

li.Event:first-child {
  padding-top: 0;
}

.chat-instance {
  display: grid;
  grid-template-columns: auto 48px;
  gap: 20px;
  align-items: center;
}

.like-group {
  padding-top: 15px;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: end;
}

.like,
.dislike {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 8px;
  align-items: center;
}

.like p,
.dislike p {
  font-style: normal;
  font-weight: 300;
  font-size: 11px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.4);
}

.star {
  justify-content: flex-end;
}

.review-block {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  gap: 15px;
  padding: 5px 0 10px;
}

.description-review {
  background: #2c2c2c;
  border-radius: 20px;
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.7);
  padding: 10px;
}

.wrapper {
  display: flex;
}

.wrapper > section:last-child {
  width: -webkit-fill-available;
}

.img-wrapper {
  width: 65px;
  min-width: 65px;
  align-items: flex-start;
}

.img-wrapper img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.instagram {
  color: #d2d8da;
}

.inst-wrap {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #fbbc05;
}

.icon-link {
  width: 50px !important;
  height: 50px !important;
  border-radius: 50%;
}

.address {
  color: #fbbc05;
  font-size: 12px;
  margin-bottom: 4px;
}

.desc .title {
  font-weight: 700;
  line-height: 1em;
  font-size: 16px;
  margin-bottom: 4px;
}

.desc .bottom-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

li:last-child .bottom-wrapper {
  border: none;
}

.participants {
  display: flex;
  gap: 18px;
}

.date {
  font-weight: 400;
  font-size: 13px;
  margin-bottom: 4px;
}

.desc .music {
  display: block;
  color: #8d8d8d;
  font-size: 14px;
  margin-bottom: 5px;
  line-height: 1em;
  font-weight: 600;
}

.description {
  font-weight: 300;
  color: #8d8d8d;
  word-break: break-word;
}
</style>