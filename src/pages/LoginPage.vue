<template>
  <div class="bg-dark bottom-nav-padd h-100 text-center pt-80">
    <div class="container">
      <div class="header mb-60">
        <div class="h2 title mb-10">Let's Begin</div>
        <div class="text p-15">
          Gain access to join events, general and personal chats with other
          participants become the center of the party with the most beautiful
          people in the world.
        </div>
      </div>
      <div class="swap-buttons">
        <div class="my_events-button" @click="onByPhoneClick">
          <p :class="{ grey: isModeEmail }">By phone</p>
          <ButtonPrimary
              :height="'3'"
              :padding="'0'"
              :class="{ active: isModeEmail }"
          />
        </div>

        <div class="feed-button" @click="onByEmailClick">
          <p :class="{ grey: !isModeEmail }">By email</p>
          <ButtonPrimary
              :height="'3'"
              :padding="'0'"
              :class="{ active: !isModeEmail }"
          />
        </div>
      </div>
      <div class="form-wrapper">
        <div class="form">
          <div v-if="!isModeEmail">
            <div class="input-group text-left">
              <vue-tel-input
                  :class="v$.phone.$error ? 'danger' : ''"
                  @input="onInput"
                  @keyup.enter="()=>{submitForm()}"
                  :props="'US'"
                  class="input"
                  :value="state.phone"
              ></vue-tel-input>
              <div v-if="v$.phone.$error" class="mt-5 color-red">
                {{ v$.phone.$errors[0].$message }}
              </div>
            </div>

            <div v-if="codeSent === false" class="input-group text-left mt-15">
              <label class="checkbox">
                <input
                    type="checkbox"
                    class="input"
                    required
                    v-model="state.agree"
                />
                <span
                >I agree to receive SMS/text massages. SMS data rates may
                  apply. I agree with
                  <a>Privacy Policy</a></span
                >
              </label>
            </div>

            <div v-if="v$.agree.$error" class="mt-5 color-red left">
              {{ v$.agree.$errors[0].$message }}
            </div>
          </div>
          <div v-else>
            <div class="input-group text-left">
              <input
                  :class="v$.email.$error ? 'danger' : ''"
                  class="input"
                  v-model="state.email"
                  @input="codeSent = false"
                  placeholder="Enter your email"
              />
              <div v-if="v$.email.$error" class="mt-5 color-red">
                {{ v$.email.$errors[0].$message }}
              </div>
            </div>

            <div v-if="codeSent === false" class="input-group text-left mt-15">
              <label class="checkbox">
                <input
                    type="checkbox"
                    class="input"
                    required
                    v-model="state.agree"
                />
                <span
                >I agree to receive SMS/text massages. SMS data rates may
                  apply. I agree with
                  <a>Privacy Policy</a></span
                >
              </label>
            </div>
            <div v-if="v$.agree.$error" class="mt-5 color-red left">
              {{ v$.agree.$errors[0].$message }}
            </div>
          </div>

          <!-- show after SMS is sent START-->
          <div v-if="codeSent && !restore" class="input-group text-left mt-10">
            <input
                required
                class="input"
                type="number"
                autocomplete="off"
                name="code"
                :placeholder="!isModeEmail ? 'Code form SMS' : 'Code form Email'"
                maxlength="4"
                v-model="state.code"
                @input="checkCode('on-input')"
            />
          </div>

          <!-- show after SMS is sent END-->
          <div
              class="send_again-wrapper"
              v-if="resend.status !== 0 || resend.counter === 0"
          >
            <div class="send_again">
              <span v-if="resend.counter > 0"
              >You will be able to resend code in
                <b>{{ resend.counter }}</b> seconds</span
              >
              <div v-else class="button" @click="sendCode">Resend code</div>
            </div>
          </div>
          <div :class="{ mt: codeSent === true }" class="input-group mt-30">
            <div
                v-if="!restore"
                class="submit btn btn-primary w100"
                @click="submitForm"
            >
              {{ codeSent ? "Log In" : "Get Code" }}
            </div>
            <div v-else @click="restoreAcc" class="submit btn btn-primary w100">
              Recovery acc
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <InfoMessage ref="alert"></InfoMessage>

  <Loader/>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import qs from "qs";
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  helpers,
  email,
  sameAs,
} from "@vuelidate/validators";
import InfoMessage from "@/components/InfoMessage";
import Loader from "@/modules/loader/components/Loader";
import {loaderStore} from "@/modules/loader/store/loader";
import userLogout from "@/components/js/userLogout";
import {useRouter} from "vue-router";
import ButtonPrimary from "@/components/base/ButtonPrimary";

export default defineComponent({
  components: {
    InfoMessage,
    Loader,
    ButtonPrimary,
  },
  setup() {
    const restore = ref(false);
    const router = useRouter();
    const alert = ref({});
    const loader = loaderStore();
    const codeSent = ref(false);
    const resend = ref({
      status: 0,
      counter: 60,
    });

    const isModeEmail = ref(false);

    const state = ref({
      phone: "",
      email: "",
      code: "",
      agree: false,
    });

    onMounted(() => {
      loader.toggleLoader(false);
    });

    const rules = computed(() => {
      return {
        phone: {
          required: helpers.withMessage(
              "Please enter your phone number",
              required
          ),
          minLength: minLength(10),
        },
        email: {
          required: helpers.withMessage("Please enter your email", required),
          email: helpers.withMessage("Please enter your email", email),
        },
        code: {
          required: helpers.withMessage(
              !isModeEmail.value
                  ? "Enter code from SMS you received"
                  : " from Email you received",
              required
          ),
          minLength: minLength(4),
          maxLength: maxLength(4),
        },
        agree: {
          required: helpers.withMessage("Agreement is required", sameAs(true)),
        },
        $validationGroups: {
          phone: ["phone", "agree"],
          email: ["email", "agree"],
          code: ["code"],
        },
      };
    });
    const v$ = useValidate(rules, state);

    function onInput(tel, phoneObject) {
      if (phoneObject?.number) state.value.phone = phoneObject.number;

      codeSent.value = false;

      clearInterval(interval);
      interval = null;
      resend.value.status = 0;
    }

    let interval = null;

    function countDown() {
      resend.value.status = 2;
      resend.value.counter = 60;

      if (interval === null) {
        interval = setInterval(() => {
          if (resend.value.counter <= 0) {
            resetCountDown();
          } else {
            resend.value.counter--;
          }
        }, 1000);
      }
    }

    function resetCountDown() {
      resend.value.status = 1;
      clearInterval(interval);
      interval = null;
    }

    function submitForm() {
      this.v$.$validate().then(() => {
        if (!codeSent.value) {
          // send code
          if (!this.v$.$validationGroups["phone"].$error) {
            sendCode();
            return;

          } else if (!this.v$.$validationGroups["email"].$error) {
            sendCode();
            return;
          }

        } else {
          // check code
          if (!this.v$.$validationGroups["code"].$error) {
            checkCode();
          } else {
            alert.value.showAlert(
                !isModeEmail.value
                    ? "Enter code from SMS you received"
                    : "Enter code from Email you received",
                "danger"
            );
          }
        }
      });
    }

    function sendCode() {
      if (resend.value.status !== 2) {
        loader.toggleLoader(true);

        let data = {
          access_key: "9MPPR)F(rk%bZKJq",
        };

        if (!isModeEmail.value) data["phone"] = state.value.phone;
        else data["email"] = state.value.email;

        axios
            .post(process.env.VUE_APP_API_URL + 'user/get_code', qs.stringify(data), {
              headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            })
            .then((res) => {
              // console.log(res);
              if (res.data.status === "success") {
                if (res.data.title == "Account in deleted period") {
                  restore.value = true;
                } else {
                  countDown();
                  codeSent.value = true;
                }
                alert.value.showAlert(res.data.title, "success");
              } else {
                alert.value.showAlert(res.data.title, "danger");
              }
              loader.toggleLoader(false);
            })
            .catch((err) => {
              if (err.response.status === 401) userLogout();
            });
      } else {
        alert.value.showAlert(
            `Please wait ${resend.value.counter} seconds`,
            "danger"
        );
      }
    }

    function checkCode(mode) {
      if (state.value.code && state.value.code.toString().length === 4) {
        alert.value.hideAlert();

        let data = {
          code: state.value.code,
        };
        if (!isModeEmail.value) data["phone"] = state.value.phone;
        else data["email"] = state.value.email;

        axios
            .post(
                process.env.VUE_APP_API_URL + "user/check-code",
                qs.stringify(data),
                {
                  headers: {
                    "content-type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                    "app-version": process.env.VUE_APP_VERSION,
                  },
                }
            )
            .then((res) => {
              if (res.data.status === "success") {
                const user = res.data.user;

                localStorage.setItem("user_data", JSON.stringify(res.data.user));
                localStorage.setItem("token", res.data.user.token);

                if (
                    user.last_name.length === 0 ||
                    user.dob.length === 0 ||
                    user.first_name.length === 0 ||
                    user.sex.length === 0
                ) {
                  router.push({path: "/signup"});
                } else {
                  router.push({path: "/events"});
                }

                alert.value.showAlert(res.data.title, "success");
                codeSent.value = true;
              } else {
                alert.value.showAlert(res.data.title, "danger");
              }
            })
            .catch((err) => {
              if (err.response.status === 401) userLogout();
            });
      } else {
        if (mode !== "on-input") {
          alert.value.showAlert("Enter the code you received in SMS", "danger");
        }
      }
    }

    const onByPhoneClick = () => {
      if (resend.value.status !== 2) isModeEmail.value = false;
      else
        alert.value.showAlert(
            `Please wait ${resend.value.counter} seconds`,
            "danger"
        );
    };

    const onByEmailClick = () => {
      if (resend.value.status !== 2) isModeEmail.value = true;
      else
        alert.value.showAlert(
            `Please wait ${resend.value.counter} seconds`,
            "danger"
        );
    };

    function restoreAcc() {
      const data = {
        access_key: "B^s)uqCy7GDIaBcn",
        confirm: 1,
      };
      if (!isModeEmail.value) {
        data["phone"] = state.value.phone;
      } else {
        data["email"] = state.value.email;
      }

      axios
          .post("https://udazzy.com/api/user/get_code", qs.stringify(data), {
            headers: {
              "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
          .then((res) => {
            if (res.data.status === "success") {
              restore.value = false;
              codeSent.value = true;
              countDown();
              alert.value.showAlert(res.data.title, "success");
            } else {
              alert.value.showAlert(res.data.title, "danger");
            }

            loader.toggleLoader(false);
          })
          .catch((err) => {
            if (err.response.status === 401) userLogout();
          });
    }

    return {
      alert,
      isModeEmail,
      onInput,
      submitForm,
      sendCode,
      checkCode,
      codeSent,
      state,
      v$,
      resend,
      onByPhoneClick,
      onByEmailClick,
      restoreAcc,
      restore,
    };
  },
});
</script>


<style scoped>

.mt {
  margin-top: 0 !important;
}

.left {
  text-align: left;
}

.logo {
  width: 40%;
}

.logo img {
  max-height: 100%;
}

.logo-mini {
  width: 130px;
}

.send_again {
  font-size: 14px;
  color: #666666;
  text-align: center;
}

.send_again.timeout {
  font-size: 0;
}

.send_again .button {
  color: var(--color-white);
  font-size: 1.2em;
  text-decoration: underline;
}

.send_again.timeout .button {
  display: block;
  font-size: 15px;
  font-weight: 600;
  text-decoration: underline;
  padding: 0;
}

.send_again-wrapper {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkbox a {
  display: inline;
  margin-left: 2px;
  color: var(--color-primary-middle);
}

.swap-buttons {
  padding: 30px 20px 10px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  cursor: pointer;
  background: #1c1c1c;
}

.swap-buttons button.active {
  display: none;
}

.grey {
  color: #8d8d8d;
}
</style>