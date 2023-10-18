<template>
  <div class="top-nav">
    <EventFilters
        :filter-params="filterParams"
        :promoter-name="promoterName"
        @filter-reset="filterReset"
        @filter-by-date-range="filterByDateRange"
    />
    <ToggleView @changeStatus="changeUiOption" :status="uiOptions.listView" :text1="'Map'" :text2="'List'"/>
  </div>
  <div @click="panToMyLocation" :class="{ active_location: eventInfoActive }"  class="current-location">
    <img src="../../public/img/location-sign-svgrepo-com.svg" alt="ico"/>
  </div>
  <div :class="{ active: eventInfoActive }" class="action-btns d-flex column">
    <router-link v-if="canCreateEvent" to="/create-event" class="item">
      <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M10 0C8.61929 0 7.5 1.11929 7.5 2.5V7.5L2.5 7.5C1.11929 7.5 0 8.61929 0 10C0 11.3807 1.11929 12.5 2.5 12.5H7.5V17.5C7.5 18.8807 8.61929 20 10 20C11.3807 20 12.5 18.8807 12.5 17.5V12.5H17.5C18.8807 12.5 20 11.3807 20 10C20 8.61929 18.8807 7.5 17.5 7.5L12.5 7.5V2.5C12.5 1.11929 11.3807 0 10 0Z"
            fill="url(#paint0_linear_866_89)"
        />
        <defs>
          <linearGradient
              id="paint0_linear_866_89"
              x1="10"
              y1="0"
              x2="10"
              y2="31.5"
              gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </router-link>
    <div v-else @click="PromoterStatusRequiredModal.status = true" class="item">
      <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M10 0C8.61929 0 7.5 1.11929 7.5 2.5V7.5L2.5 7.5C1.11929 7.5 0 8.61929 0 10C0 11.3807 1.11929 12.5 2.5 12.5H7.5V17.5C7.5 18.8807 8.61929 20 10 20C11.3807 20 12.5 18.8807 12.5 17.5V12.5H17.5C18.8807 12.5 20 11.3807 20 10C20 8.61929 18.8807 7.5 17.5 7.5L12.5 7.5V2.5C12.5 1.11929 11.3807 0 10 0Z"
            fill="url(#paint0_linear_866_89)"
        />
        <defs>
          <linearGradient
              id="paint0_linear_866_89"
              x1="10"
              y1="0"
              x2="10"
              y2="31.5"
              gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
  <div class="events-view" :class="uiOptions.listView ? 'active' : ''">
    <div class="wrapper">
      <div class="item">
        <GoogleMap
            api-key="AIzaSyAWp_I27Ot7Dbl_Uoxl-_9C2peuaS6CeQY"
            style="width: 100%; height: 500px"
            :center="mapOptions.center"
            :styles="mapOptions.styles"
            :backgroundColor="mapOptions.backgroundColor"
            :zoomControl="mapOptions.zoomControl"
            :mapTypeControl="mapOptions.mapTypeControl"
            :scaleControl="mapOptions.scaleControl"
            :streetViewControl="mapOptions.streetViewControl"
            :rotateControl="mapOptions.rotateControl"
            :fullscreenControl="mapOptions.fullscreenControl"
            :restriction="mapOptions.restriction"
            :clickableIcons="false"
            :zoom="10"
            @zoom_changed="markersCluster()"
            @click="eventInfoActive = false"
            class="vue-map"
            ref="mapRef"
        >
          <div v-for="(location, i) in venuesLocations" :key="i">
            <gmap-custom-marker
                :class="
                Object.keys(location).length > 0
                  ? 'marker-visible'
                  : 'marker-hidden'
              "
                @click="showEventsInVenue(venuesFiltered[i])"
                :marker="location"
                :z-index="
                venuesFiltered[i] &&
                venuesFiltered[i].label.className != 'venue-collapsed'
                  ? 6
                  : 2
              "
            >
              <VenueMarker
                  :data="venuesFiltered[i]"
                  :active="!eventsLoading.value"
              />
            </gmap-custom-marker>
          </div>

          <Marker
              :options="{
              position: { lat: currPos.lat, lng: currPos.lng },
              icon: {
                url: './img/markers/user-location.svg',
                scaledSize: { width: 20, height: 20 },
                anchor: { x: 10, y: 10 },
              },
              zIndex: -10,
            }"
          />
        </GoogleMap>
        <div
            class="not-found-map bg-blur"
            :class="venuesFiltered && !venuesFiltered.length ? 'active' : ''"
        >
          <div v-if="eventsLoading">
            <div class="h5 text status_updating">
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"
                />
              </svg>
              Updating...
            </div>
          </div>
          <div v-else-if="managerId">
            <div class="h5 text">This promoter has no upcoming events :(</div>
            <div @click="filterReset()" class="btn btn-sm btn-primary">
              Show All Events
            </div>
          </div>
          <div v-else-if="filterParams.search.length > 2">
            <div class="h5 text">There are no events matching your search</div>
            <div @click="filterReset()" class="btn btn-sm btn-primary">
              Reset filters
            </div>
          </div>
          <div v-else>
            <div class="h5 text">No events found :(</div>
          </div>
        </div>
        <EventDetails
            v-if="eventInfo != null"
            :event="eventInfo"
            :eventInfoActive="eventInfoActive"
            @close="changeStatus"
        />
        <EventsInVenue
            v-if="venueInfo != null"
            :venue="venueInfo"
            :venueInfoActive="venueInfoActive"
        />
      </div>
      <div class="item events-list">
        <div class="container bottom-nav-padd">
          <div v-if="eventsLoading" class="not-found">
            <div class="h5 text status_updating">
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                    fill="currentColor"
                    d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"
                />
              </svg>
              Updating...
            </div>
          </div>
          <div
              class="list-events"
              v-else-if="venuesFiltered && venuesFiltered.length"
          >
            <ListView
                :venues="venuesFiltered"
                :currPos="currPos"
                @filter-reset="filterReset"
                @showEventDetails="
                [
                  showEventDetails($event),
                  (uiOptions.listView = false),
                  (venueInfoActive = false),
                ]
              "
            />
          </div>
          <div v-else-if="filterParams.search.length >= 2" class="not-found">
            <div class="h4 text">
              There are no events matching your filters :(
            </div>
            <div @click="$emit('filterReset')" class="btn btn-sm btn-primary">
              Reset filters
            </div>
          </div>
          <div v-else class="not-found">
            <div class="h4 text">No events found :(</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
      class="modal p-relative"
      :class="PromoterStatusRequiredModal.status ? 'show' : ''"
  >
    <div class="container pt-80 pb-60">
      <PromoterStatusRequired
          @close="PromoterStatusRequiredModal.status = false"
      />
    </div>
  </div>
  <Loader class="main-loader"/>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  ref,
  watch,
  watchEffect,
} from "vue";
import {loaderStore} from "@/modules/loader/store/loader";
import EventsList from "@/modules/eventsMap/components/EventsList";
import {GoogleMap, Marker} from "vue3-google-map";
import VenueMarker from "@/components/VenueMarker";
import EventFilters from "@/modules/eventsMap/components/EventFilters";
import EventDetails from "@/components/EventDetails";
import EventsInVenue from "@/components/EventsInVenue";
import PromoterStatusRequired from "@/components/PromoterStatusRequired";
import {useGeolocation} from "@/components/js/useGeolocation";
import {dateNowPlusIncrement} from "@/components/js/dateNowPlusIncrement";
import {timeLeft} from "@/components/js/timeLeft";
import GmapCustomMarker from "vue3-gmap-custom-marker";
import {spaceBetweenMarkers} from "@/components/js/spaceBetweenMarkers";
import {filterMarkersByParams} from "@/components/js/filterMarkersByParams";
import axios from "axios";
import ToggleView from "@/modules/eventsMap/components/ToggleView";
import mapStyles from "@/modules/eventsMap/services/mapStyles";

export default defineComponent({
  components: {
    ToggleView,
    ListView: EventsList,
    GoogleMap,
    GmapCustomMarker,
    Marker,
    VenueMarker,
    EventFilters,
    EventDetails,
    EventsInVenue,
    PromoterStatusRequired,
  },
  props: {
    managerId: String,
    managerName: String,
  },
  setup(props) {
    // User location
    const coords = {latitude: 40.72, longitude: -73.91};
    const loader = loaderStore();
    const currPos = ref(
        {
          lat: coords.latitude,
          lng: coords.longitude,
        }
    );

    const lmyLoc = ref(useGeolocation().coords);

    function panToMyLocation() {
      const currentLocation = {
        lat: lmyLoc.value.latitude,
        lng: lmyLoc.value.longitude,
      };

      currPos.value = currentLocation;
      mapRef.value.map.setZoom(15);
      mapRef.value.map.panTo(currentLocation);
    }

    watch(currPos, (currPos) => {
      if (!mapOptions.centerIsSet) {
        mapOptions.center = currPos;
        mapOptions.centerIsSet = true;
      }
    });

      function changeStatus() {
      eventInfoActive.value = !eventInfoActive.value;
    }

    const canCreateEvent = computed(() => {
      return JSON.parse(localStorage.getItem("user_data")).type_id <= 6;
    });
    const PromoterStatusRequiredModal = ref({
      status: false,
    });

    const eventsLoading = ref(true);

    const uiOptions = ref({
      listView: false,
    });

    // Google Map
    const mapRef = ref({});

    const mapOptions = {
      centerIsSet: false,
      styles: mapStyles,
      backgroundColor: "#1C1C1C",
      center: {
        lat: 40.72,
        lng: -73.91,
      },
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      minZoom: 10,
      restriction: {
        latLngBounds: {north: 80, south: -65, west: -180, east: 180},
        strictBounds: true,
      },
    };

    const eventInfoActive = ref(false);
    const eventInfo = ref(null);

    const venueInfoActive = ref(false);
    const venueInfo = ref(null);

    function showEventDetails(marker) {
      eventInfoActive.value = false;
      setTimeout(() => {
        eventInfoActive.value = true;
      }, 200);

      eventInfo.value = marker;
      mapRef.value.map.setZoom(15);
      mapRef.value.map.panTo({
        lat: marker.position.lat - 0.003,
        lng: marker.position.lng,
      });
    }

    function showEventsInVenue(venue) {
      venueInfoActive.value = false;
      setTimeout(() => {
        venueInfoActive.value = true;
      }, 200);

      venueInfo.value = venue;
      mapRef.value.map.panTo({
        lat: venue.position.lat - 0.003,
        lng: venue.position.lng,
      });
      mapRef.value.map.setZoom(15);
    }

    // events filters
    const filterParams = ref({
      search: "",
      dateRange: {
        from: new Date(),
        to: dateNowPlusIncrement(60),
      },
      checkboxes: {
        "event types": {
          //  'party': true
          //   ...
        },
        "music genres": {
          //  'jazz': true,
          //  ...
        },
        other: {
          "only available events": false,
          // 'only my events': false,
          // 'without alcohol': false,
        },
      },
      timeOfDay: "all",
      onlyMyEvents: false,
      byPromoterId: props.managerId,
    });
    const promoterName = ref("Promoter Name");

    function filterReset() {
      filterByDateRange();

      for (let i in filterParams.value.checkboxes["event types"]) {
        filterParams.value.checkboxes["event types"][i] = true;
      }

      for (let i in filterParams.value.checkboxes["music genres"]) {
        filterParams.value.checkboxes["music genres"][i] = true;
      }

      for (let i in filterParams.value.checkboxes["other"]) {
        filterParams.value.checkboxes["other"][i] = false;
      }

      filterParams.value.onlyMyEvents = false;

      filterParams.value.search = "";

      filterParams.value.byPromoterId = 0;
    }

    function filterByDateRange(from = null, to = null) {
      if (from != null && to != null) {
        if (typeof to == "number") {
          to = dateNowPlusIncrement(to);
        }
        if (typeof to == "string") {
          to = new Date(to);
        }
        if (typeof from == "string") {
          from = new Date(from);
        }

        filterParams.value.dateRange.from = from;
        filterParams.value.dateRange.to = to;
      } else {
        filterParams.value.dateRange.from = new Date();
        filterParams.value.dateRange.to = dateNowPlusIncrement(60);
      }
    }

    function reformatMarkers(venues) {
      venues.forEach((venue) => {
        venue.events.forEach((marker) => {
          marker["isNightEvent"] = ((marker) => {
            let eventTime = new Date(marker.datetime).getHours();

            if (eventTime <= 6 || eventTime >= 22) return true;
            else return false;
          })(marker);
          marker["label"] = {
            text: "-",
            className: function (marker) {
              if (marker.isNightEvent) return "marker-label";
              else return "marker-label-light";
            },
          };
        });
      });
    }

    function addFilterOptionsFromMarkers(venues) {
      venues.forEach((venue) => {
        venue.events.forEach((marker) => {
          if (marker.music) {
            filterParams.value.checkboxes["event types"][marker.type] = true;
          }
          if (marker.music) {
            for (let i = 0; i < Object.keys(marker.music.length).length; i++) {
              filterParams.value.checkboxes["music genres"][
                  marker.music[i]
                  ] = true;
            }
          }
        });
      });
    }

    async function initAfterMapIsReady(markers) {
      await new Promise((resolve) => {
        let interval = setInterval(() => {
          if (mapIsReady()) {
            clearInterval(interval);
            resolve(true);
          }
        }, 10);
      });

      loader.toggleLoader(false);
      venuesAll.value = markers;
    }

    // events markers
    const venuesLocations = ref([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]);

    const venuesAll = ref([]);
    const markersFiltered = ref(null);

    const venuesFiltered = ref([]);

    function setMarkersIcons(markers) {
      markers.forEach((marker) => {
        let icon = {
          url: "",
          scaledSize: {width: 60, height: 60},
          anchor: {x: 30, y: 30},
          labelOrigin: {x: 0, y: 0},
        };
        if (marker.type == "Party") {
          icon["url"] = "./img/markers/marker_1.svg";
        } else if (marker.type == "Business lunch") {
          icon["url"] = "./img/markers/marker_2.svg";
        } else if (marker.type == "Dinner") {
          icon["url"] = "./img/markers/marker_3.svg";
        } else if (marker.type == "Cultural event") {
          icon["url"] = "./img/markers/marker_4.svg";
        } else if (marker.type == "Sober party") {
          icon["url"] = "./img/markers/marker_5.svg";
        } else if (marker.type == "Raves") {
          icon["url"] = "./img/markers/marker_6.svg";
        } else {
          icon["url"] = "./img/markers/marker_1.svg";
        }

        marker["icon"] = icon;
      });
    }

    function setMarkersIconsVenues(markers) {
      markers.forEach((marker) => {
        marker.type = "Nightclub";

        let icon = {
          url: "",
          scaledSize: {width: 60, height: 60},
          anchor: {x: 30, y: 30},
          labelOrigin: {x: 0, y: 0},
        };

        if (marker.type == "Nightclub") {
          icon["url"] = "./img/markers/venue_1.svg";
        } else if (marker.type == "Restaurant") {
          icon["url"] = "./img/markers/venue_2.svg";
        } else if (marker.type == "Rooftop") {
          icon["url"] = "./img/markers/venue_3.svg";
        } else if (marker.type == "Yacht") {
          icon["url"] = "./img/markers/venue_4.svg";
        } else if (marker.type == "Concert Hall") {
          icon["url"] = "./img/markers/venue_5.svg";
        } else if (marker.type == "Social Club") {
          icon["url"] = "./img/markers/venue_6.svg";
        } else if (marker.type == "Other") {
          icon["url"] = "./img/markers/venue_7.svg";
        } else {
          icon["url"] = "./img/markers/venue_4.svg";
        }

        marker["icon"] = icon;
      });
    }

    function calculateMarkersPriority(venues = venuesFiltered.value) {
      venues.forEach((venue) => {
        // events
        venue.events.forEach((marker) => {
          let priority = 0;

          // rate priority by date
          if (dateNowPlusIncrement(1) > new Date(marker.datetime)) {
            priority += 4;
          } else if (dateNowPlusIncrement(7) > new Date(marker.datetime)) {
            priority += 2;
          } else if (
              dateNowPlusIncrement(30) < new Date(marker.datetime) ||
              new Date() > new Date(marker.datetime)
          ) {
            priority -= 4;
          }
          if (
              marker.participants_joined == marker.participants &&
              !marker.ImAParticipant
          ) {
            priority -= 10;
          }
          marker["priority"] = priority;
        });

        // venues
        let priority = 0;

        if (venue.events.length > 1) {
          priority += 3;
        }
        if (venue.events.length > 3) {
          priority += 5;
        }
        if (venue.events.length > 10) {
          priority += 10;
        }

        venue["priority"] = priority;
      });
    }

    let eventsMarkersTimeLeftInterval = null;

    function eventsMarkersTimeLeft() {
      clearInterval(eventsMarkersTimeLeftInterval);

      venuesFiltered.value.forEach((venue) => {
        venue.events.forEach((marker) => {
          let markerLabel = Object.assign({}, marker.label);

          markerLabel.text = timeLeft(marker.datetime);

          if (marker.ImAParticipant) markerLabel.className += " my-event";

          marker.label = markerLabel;
        });
      });

      eventsMarkersTimeLeftInterval = setInterval(() => {
        eventsMarkersTimeLeft();
      }, 60000);
    }

    function venuesSetLabel(venues) {
      venues.forEach((venue) => {
        let markerLabel = {};

        markerLabel.text = venue.name;
        markerLabel.className = "venue";

        venue.label = markerLabel;
      });
    }

    let timeout = false;
    setTimeout(() => {
      timeout = true;
    }, 300);

    function mapIsReady() {
      return timeout;
    }

    function markersCluster(venues = venuesFiltered.value) {
      venues.forEach((venue) => {
        venue.events.forEach((marker) => {
          marker.icon.scaledSize = {width: 70, height: 70};
          marker.icon.anchor = {x: 35, y: 35};

          if (marker.isNightEvent) marker.label.className = "marker-label";
          else marker.label.className = "marker-label-light";
        });

      });
      if (mapIsReady()) {
        venues.forEach((marker) => {
          let conflict = false;
          venues.forEach((comparableMarker) => {
            if (marker !== comparableMarker) {
              let distance = spaceBetweenMarkers(
                  mapRef.value.map,
                  marker,
                  comparableMarker
              );
              if (distance < 110) {
                conflict = true;

                if (marker.priority < comparableMarker.priority) {
                  marker.label.className = "venue-collapsed";
                } else {
                  comparableMarker.label.className = "venue-collapsed";
                }
              } else {
                if (!conflict) {
                  marker.label.className = "";
                }
              }
            }
          });
        });
      }

      eventsMarkersTimeLeft();
    }

    function filterVenues() {
      let filtered_arr = [];
      let last_index = 0;

      for (let i = 0; i < venuesAll.value.length; i++) {
        filtered_arr[last_index] = Object.assign({}, venuesAll.value[i]);

        filtered_arr[last_index]["events"] = filterMarkersByParams(
            venuesAll.value[i].events,
            filterParams.value
        );

        if (filtered_arr[last_index].events.length === 0) {
          filtered_arr.splice(last_index, 1);
        } else {
          last_index++;
        }
      }

      venuesFiltered.value = filtered_arr;
    }

    function pushVenuesMarkers() {
      venuesLocations.value.splice(0, venuesLocations.value.length);
      for (let i = 0; i < venuesFiltered.value.length; i++) {
        venuesLocations.value.push({
          lat: venuesFiltered.value[i].position.lat,
          lng: venuesFiltered.value[i].position.lng,
        });
      }
    }

    const filterMarkers = async () => {
      await filterVenues();

      if (mapIsReady()) {
        mapRef.value.map.setZoom(12);

        if (venuesFiltered.value.length >= 1) {
          mapRef.value.map.panTo({
            lat: venuesFiltered.value[0].position.lat - 0.003,
            lng: venuesFiltered.value[0].position.lng,
          });
        }

        markersCluster(venuesFiltered.value);
      }
    };

    watch(venuesAll, async (venues) => {
      setMarkersIconsVenues(venues);
      venues.forEach((venue) => {
        setMarkersIcons(venue.events);
      });
      venuesSetLabel(venues);
      await calculateMarkersPriority(venues);
      await filterMarkers();

      // display venues on map
      await pushVenuesMarkers();

      // after markers rendered
      setTimeout(() => {
        eventsLoading.value = false;
      }, 100);

      promoterName.value = props.managerName;
    });

    watchEffect(() => {
      promoterName.value = props.managerName;
    });

    watch(filterParams.value, () => {
      filterMarkers();

      eventInfo.value = null;
      venueInfo.value = null;
    });

    onBeforeMount(() => {
      // console.log(localStorage.getItem('firstLoad'),'first loader');

      if (localStorage.getItem('firstLoad') === null) {
        // console.log(localStorage.getItem('firstLoad'),'second loader');

        localStorage.setItem('firstLoad', '1');
        loader.toggleLoader(true);
      } else {
        loader.toggleLoader(false);
      }

      eventsLoading.value = true;
      axios
          .post(
              process.env.VUE_APP_API_URL + 'events/list', {},
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                  "app-version": process.env.VUE_APP_VERSION,
                },
              }
          )
          .then((res) => {
            if (res.data.status === "success") {
              if (props.managerId) {
                filterParams.value.byPromoterId = props.managerId;

              }

              reformatMarkers(res.data.response);
              addFilterOptionsFromMarkers(res.data.response);
              initAfterMapIsReady(res.data.response);
            }
          })
          .catch(() => {});
    });

    function changeUiOption(status) {
      uiOptions.value.listView = status;
    }

    return {
      panToMyLocation,
      currPos,
      canCreateEvent,
      PromoterStatusRequiredModal,
      uiOptions,
      eventsLoading,
      mapRef,
      mapOptions,
      changeStatus,
      eventInfo,
      eventInfoActive,
      venueInfo,
      venueInfoActive,
      venuesLocations,
      venuesAll,
      markersFiltered,
      venuesFiltered,
      filterParams,
      promoterName,
      showEventDetails,
      showEventsInVenue,
      filterReset,
      filterByDateRange,
      markersCluster,
      changeUiOption,
    };
  },
});
</script>


<style scoped>
.events-view {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.events-view > .wrapper {
  width: 200vw;
  height: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
}

.events-view > .wrapper > .item {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.events-view.active > .wrapper {
  transform: translateX(-100vw);
}

.events-list {
  padding-top: 210px;
  background: var(--color-bg);
}

.vue-map {
  min-height: 100vh;
  width: 100vw;
}

.top-nav {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
}

.not-found-map {
  position: absolute;
  width: calc(100% - 40px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 60px;
  border-radius: 30px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s;
}

.not-found-map.active {
  visibility: visible;
  opacity: 1 !important;
}

.not-found-map .btn {
  margin-top: 30px;
}

.not-found {
  height: 100%;
  min-height: 400px;
  padding-bottom: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.not-found .text {
  margin-bottom: 30px;
  text-align: center;
}

.action-btns {
  position: fixed;
  z-index: 3;
  bottom: 100px;
  right: 15px;
  transition: 0.3s;
}

.action-btns.active {
  bottom: 60%;
}
.current-location.active_location {
   bottom: 53%;
}

.action-btns .item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.marker-hidden {
  display: none !important;
}

.status_updating {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status_updating svg {
  animation: rotate 1.75s linear infinite;
}

.current-location {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.2);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  position: fixed;
  z-index: 3;
  bottom: 160px;
  right: 15px;
  transition: 0.3s;
}

.current-location img {
  width: 20px;
  height: 20px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.main-loader {
  z-index: 1100;
}
</style>