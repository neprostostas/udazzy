import { defineStore } from 'pinia';
import axios from 'axios';
import {loaderStore} from "@/modules/loader/store/loader";


export const promotersState = defineStore('promoters', {
  state: () => ({
    promotersList: [],
    promotersFiltered: [],
    loader: loaderStore(),
  }),

  actions: {
    getPromoters() {
      axios
        .post(
          process.env.VUE_APP_API_URL + 'user/list',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'app-version': process.env.VUE_APP_VERSION,
            },
          }
        )
        .then((res) => {
          if (res.data.status === 'success') {
            this.promotersList = res.data.users;
            this.promotersFiltered = res.data.users;
            this.loader.toggleLoader(false);

          }
        })
        .catch(() => {});
    },

    filterBySearch(arr, searchQuery, fields) {
      if (searchQuery.length > 0) {
        arr = arr.filter((item) => {
          let go = false;
          let search = searchQuery.toLowerCase().trim().split(' ');

          if (search !== '') {
            if (fields) {
              fields.forEach((field) => {
                let item_in_deep;

                if (item[field] === undefined) {
                  // second level of depth

                  Object.keys(item).forEach((key) => {
                    if (item[key][field] === undefined) {
                      // thirst level of depth

                      Object.keys(item[key]).forEach((key1) => {
                        if (item[key][key1][field] === undefined) {
                          return false;
                        } else {
                          item_in_deep = item[key][key1][field];
                        }
                      });
                    } else {
                      item_in_deep = item[key][field];
                    }
                  });
                } else {
                  item_in_deep = item[field];
                }

                if (item_in_deep) {
                  if (
                    item_in_deep.toString().toLowerCase().indexOf(search) !== -1
                  )
                    go = true;
                }
              });
            } else {
              for (const [key] of Object.entries(item)) {
                if (item[key].toString().toLowerCase().indexOf(search) !== -1)
                  go = true;
              }
            }
          }

          return go;
        });
      }

      this.promotersFiltered = arr;
    },
  },
});
