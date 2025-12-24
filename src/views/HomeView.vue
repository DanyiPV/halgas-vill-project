<template>
  <div class="page">
    <v-container
    class="mx-auto"
    :style="{
      maxWidth: $vuetify.display.smAndDown ? '90%' : '60%'
    }">
      <v-row justify="space-between" :no-gutters="isMobile">
        <v-col cols="12" sm="6" lg="6" :class="isMobile ? 'mb-4' : ''">
          <v-card
            elevation="5"
            min-height="25vh"
            class="service-card w-100 d-flex rounded justify-center align-center text-center service-electric pa-2"
            :to="{ path: '/services', hash: '#villany' }"
          >
            <p class="text-h5">
              Teljeskörű lakossági villanyszerelés
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" lg="6">
          <v-card
            elevation="5"
            min-height="25vh"
            class="service-card w-100 d-flex rounded justify-center align-center text-center service-ac pa-2"
            :to="{ path: '/services', hash: '#klima' }"
          >
            <p class="text-h5">
              Légkondicionáló berendezés telepítése, karbantartása
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container :style="{ maxWidth: isMobile ? '90%' : '60%' }">
      <v-card elevation="5" class="pa-4">
        <div class="text-center mb-5 d-flex ga-2 align-center justify-center">
          <v-icon size="35">mdi-help-circle-outline</v-icon>
          <p class="text-h5">Miben segíthetek?</p>
        </div>
        <div class="d-flex align-center">
          <div :style="{width : isMobile ? '100%' : '90%'}">
            <div class="d-flex ga-4 px-4">
              <v-row class="mx-0" :no-gutters="isMobile">
                <v-col cols="12" md="5">
                  <v-text-field
                    label="e-mail"
                    variant="solo-filled"
                    v-model="newHelpEmail"
                    clearable
                    :rules="[
                      v => !!v || 'Kötelező ezt a mezőt kitölteni',
                      v => (v && isValidEmail(v)) || 'Nem jó email cím!'
                    ]"
                  >
                    <template #prepend-inner>
                      <v-icon class="gradient-icon">
                        mdi-email-outline
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    label="Név"
                    variant="solo-filled"
                    v-model="newHelpName"
                    clearable
                    :rules="[
                      v => !!v || 'Kötelező ezt a mezőt kitölteni',
                    ]"
                  >
                    <template #prepend-inner>
                      <v-icon class="gradient-icon">
                        mdi-account-outline
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" md="3">
                  <v-text-field
                    label="Telefonszám"
                    variant="solo-filled"
                    v-model="newHelpPhone"
                    :rules="[
                      v => (v && isValidHuPhone(v)) || 'Nem jó telefon szám!',
                    ]"
                    clearable
                  >
                    <template #prepend-inner>
                      <v-icon class="gradient-icon">
                        mdi-phone-outline
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
            <div style="width: 97%;" class="d-flex px-4 mx-auto">
              <v-textarea
              no-resize
              :rows="isMobile ? 10 : 5"
              label="Leírás"
              variant="solo-filled"
              
              v-model="newHelpDesc"
              :rules="[
                  v => !!v || 'Kötelező ezt a mezőt kitölteni',
                ]"
              clearable>
                <template #prepend-inner>
                  <v-icon class="gradient-icon">
                    mdi-comment-outline
                  </v-icon>
                </template>
              </v-textarea>
            </div>
          
            <div class="d-flex justify-center align-center">
              <v-btn :style="{width: isMobile ? '45%' : '20%'}" @click="sendHelpVerificationCode" :loading="helpBtnLoading" :disabled="isHelpRequestDisabled">
                <v-icon class="gradient-icon">mdi-send</v-icon>
                <p class="ml-3">küldés</p>
              </v-btn>
            </div>
          </div>
          <div
            v-if="!isMobile"
            class="img-box"
            :style="{ backgroundImage: `url(${helpbg})` }"
          />
        </div>
      </v-card>
    </v-container>

    <v-container
      v-if="ratingsArray.length === 0"
      :style="{ width: isMobile ? '90%' : '60%' }"
    >
      <v-card
        elevation="4"
        class="pa-8 text-center"
      >
        <v-icon size="48" color="grey-lighten-1" class="mb-4">
          mdi-star-outline
        </v-icon>

        <div class="text-h6 font-weight-medium mb-2">
          Még nincs értékelés
        </div>

        <div class="text-body-2 text-medium-emphasis mb-6">
          Légy te az első, aki megosztja a véleményét!
        </div>

        <v-btn
          color="primary"
          size="large"
          rounded="lg"
          prepend-icon="mdi-star"
          @click="ratingOpen=true"
        >
          Értékelek
        </v-btn>
      </v-card>
    </v-container>

    <v-container v-else
    :style="{ width: isMobile ? '90%' : '60%' }">
      <v-card elevation="5">

        <v-card-title class="d-flex align-center justify-space-between py-5">
          <div class="text-h5 font-weight-medium">Értékelések</div>

          <v-btn color="primary" rounded="lg" prepend-icon="mdi-star" @click="ratingOpen = true">
            Értékelek
          </v-btn>
        </v-card-title>

        <v-divider />

        <v-card-text class="text-center py-8">
          <div class="text-h2 font-weight-bold">
            {{ rating?.rating }}
            <span class="text-h6 text-medium-emphasis">/5</span>
          </div>

          <v-rating
            :model-value="rating?.rating"
            half-increments
            readonly
            active-color="red"
            color="grey-lighten-1"
            size="44"
            class="my-3"
          />

          <div class="text-body-1 text-medium-emphasis">
            {{ rating?.count }} értékelés
          </div>
        </v-card-text>

        <v-card-text class="pt-0 pb-8">
          <v-sheet elevation="2" rounded="xl" class="mx-auto" max-width="860">
            <v-carousel
              v-model="currentIndex"
              :height="isMobile ? 500 : 320"
              :show-arrows="!isMobile && ratingsArray.length > 1 ? 'hover' : false"
              :cycle="ratingsArray.length > 1"
              hide-delimiters
            >
              <v-carousel-item v-for="(item, i) in ratingsArray" :key="i">
                <div class="pa-8 d-flex flex-column" style="height: 100%;">

                  <div class="d-flex align-center justify-space-between mb-4">
                    <div class="text-h6 font-weight-medium">
                      {{ item.nev }}
                    </div>

                    <v-rating
                      :model-value="item.rating"
                      half-increments
                      readonly
                      active-color="red"
                      color="grey-lighten-1"
                      size="18"
                    />
                  </div>

                  <v-divider class="mb-4" />

                  <div class="mb-3">
                    <v-chip color="red" variant="tonal" size="small">
                      Vélemény
                    </v-chip>
                  </div>

                  <div class="text-body-1" style="overflow-y: auto;">
                    {{ item.leiras?.trim() ? item.leiras : "Nem írt véleményt" }}
                  </div>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-sheet>
        </v-card-text>

      </v-card>
    </v-container>

    <v-dialog max-width="500" v-model="ratingOpen">
      <v-card>
        <v-window
          v-model="step"
          class="w-100"
          transition="slide-x-transition"
        >
          <v-window-item :value="1">
            <div class="px-4 py-8 d-flex flex-column align-center">
              <v-text-field
                label="e-mail"
                prepend-inner-icon="mdi-email-outline"
                variant="solo-filled"
                clearable
                width="90%"
                v-model="newRatingEmail"
                :rules="[
                  v => !!v || 'Kötelező ezt a mezőt kitölteni',
                  v => (v && isValidEmail(v)) || 'Nem jó email cím!'
                ]"
                class="mb-2"
              />

              <v-text-field
                label="Név"
                prepend-inner-icon="mdi-account-outline"
                variant="solo-filled"
                clearable
                width="90%"
                v-model="newRatingName"
                :rules="[v => !!v || 'Kötelező ezt a mezőt kitölteni']"
              />

              <v-rating
                v-model="newRating"
                color="grey"
                active-color="red"
                half-increments
                size="40"
                class="mb-4"
              />

              <div style="width: 97%" class="d-flex ga-4 px-4 mb-2"> 
                <v-textarea 
                prepend-inner-icon="mdi-comment" 
                no-resize 
                rows="5" 
                label="Leírás" 
                max-width="100%" 
                variant="solo-filled" 
                clearable 
                counter="500" 
                v-model="newRatingDesc" >
                </v-textarea> 
              </div>

              <v-btn
                color="red"
                variant="flat"
                :disabled="isSubmitDisabled"
                @click="verifyOtpBtn"
                class="mt-4"
                :loading="verificationBtnLoading"
              >
                Értékelés elküldése
              </v-btn>
            </div>
          </v-window-item>

          <v-window-item :value="2">
            <div class="px-4 py-8 d-flex flex-column align-center text-center">
              <p class="text-h4 mb-2">Erősítsd meg az emailed!</p>
              <p class="mb-6">Megerősítő kód elküldve az emailre</p>

              <v-otp-input v-model="otp" class="mb-4" variant="filled" />

              <v-btn color="red" variant="flat" @click="addRating" :loading="ratingBtnLoading">
                Megerősítés
              </v-btn>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="helpDialogOpen">
      <v-card>
        <div class="px-4 py-8 d-flex flex-column align-center text-center">
          <p class="text-h4 mb-2">Erősítsd meg az emailed!</p>
          <p class="mb-6">Megerősítő kód elküldve az emailre</p>
  
          <v-otp-input v-model="otp" class="mb-4" variant="filled" />
  
          <v-btn color="red" variant="flat" @click="sendHelpRequest" :loading="verificationBtnLoading">
            Megerősítés
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import { useGetRatings, useGetAllRatings, useAddNewRating, useVerifyOtp, useSendHelpReq } from '../api/ratingQuery'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import helpbg from '@/assets/miben_segithetek.png'
import { ShowErrorKey, ShowSuccessKey } from "@/injectionKeys";
import axios from "axios";

const showError = inject(ShowErrorKey)!;
const showSucces = inject(ShowSuccessKey)!;

const { data: rating } = useGetRatings()
const { data: ratingItems } = useGetAllRatings()
const { mutate: addNewRating } = useAddNewRating()
const { mutate: verifyOtp } = useVerifyOtp()
const { mutate: sendHelpReq } = useSendHelpReq()
const { mobile } = useDisplay()

const step = ref(1);
const otp = ref();
const route = useRoute()
const isMobile = computed(() => mobile.value)

type RatingItem = { nev: string; rating: number, email: string, leiras: string }

const currentIndex = ref(0)
const ratingsArray = ref<RatingItem[]>([])
const activeName = computed(() => (route.name as string) || 'home')
const ratingOpen = ref(false);
const newRatingName = ref("");
const newRatingEmail = ref("");
const newRating = ref(0);
const newRatingDesc = ref("");
const newHelpName = ref("");
const newHelpEmail = ref("");
const newHelpPhone = ref("");
const newHelpDesc = ref("");
const helpDialogOpen = ref(false);
const helpBtnLoading = ref(false);
const ratingBtnLoading = ref(false);
const verificationBtnLoading = ref(false);

const addRating = async () => {
  ratingBtnLoading.value = true
  await addNewRating({email: newRatingEmail.value, nev: newRatingName.value, rating: newRating.value, leiras: newRatingDesc.value, vercode: Number(otp.value)},{
    onSuccess: (response) =>{
      ratingOpen.value = false;
      ratingBtnLoading.value = false
      if (showSucces) {
        showSucces("Értesítés sikeresen elküldve!");
      }else{
        console.log("Értesítés sikeresen elküldve!");
      }
    },
    onError: (error: unknown) => {
      ratingBtnLoading.value = false;

      const msg = axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : String(error);

      if (showError) {
        showError(String(msg));
      } else {
        console.log(msg);
      }
    }
  }
  )
}

const verifyOtpBtn = async () => {
  verificationBtnLoading.value = true;
  await verifyOtp({email: newRatingEmail.value, nev: newRatingName.value},{
    onSuccess: (response) =>{
      step.value = 2
      verificationBtnLoading.value = false
      if (showSucces) {
        showSucces("Email sikeresen elküldve!");
      }else{
        console.log("Email sikeresen elküldve!");
      }
    },
    onError: (error: unknown) => {
      ratingBtnLoading.value = false;

      const msg = axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : String(error);

      if (showError) {
        showError(String(msg));
      } else {
        console.log(msg);
      }
    }
  }
  )
}

const sendHelpVerificationCode = async () => {
  helpBtnLoading.value = true;
  await verifyOtp({email: newHelpEmail.value, nev: newHelpName.value},{
    onSuccess: (response) =>{
      helpDialogOpen.value = true;
      helpBtnLoading.value = false;
      if (showSucces) {
        showSucces("Email sikeresen elküldve!");
      }else{
        console.log("Email sikeresen elküldve!");
      }
    },
    onError: (error: unknown) => {
      ratingBtnLoading.value = false;

      const msg = axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : String(error);

      if (showError) {
        showError(String(msg));
      } else {
        console.log(msg);
      }
    }
  }
  )
}

const sendHelpRequest = async () => {
  verificationBtnLoading.value = true
  await sendHelpReq({email: newHelpEmail.value, nev: newHelpName.value, telefon: newHelpPhone.value, leiras: newHelpDesc.value, vercode: Number(otp.value)},{
    onSuccess: (response) =>{
      helpDialogOpen.value = false;
      verificationBtnLoading.value = false;
      if (showSucces) {
        showSucces("Értesítés sikeresen elküldve!");
      }else{
        console.log("Értesítés sikeresen elküldve!");
      }
    },
    onError: (error: unknown) => {
      ratingBtnLoading.value = false;

      const msg = axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : String(error);

      if (showError) {
        showError(String(msg));
      } else {
        console.log(msg);
      }
    }
  }
  )
}


watch(
  [activeName, ratingItems],
  ([name, items]) => {
    if (name === "home" && items?.ratings) {
      ratingsArray.value = items.ratings
    }
  },
  { immediate: true }
)

const isSubmitDisabled = computed(() => {
  const email = newRatingEmail.value.trim()
  const name = newRatingName.value.trim()
  const rating = Number(newRating.value)

  return (
    !email ||
    !isValidEmail(email) ||
    !name ||
    rating <= 0
  )
})

const isHelpRequestDisabled = computed(() => {
  const email = newHelpEmail.value.trim();
  const name = newHelpName.value.trim();
  const telefon = newHelpPhone.value?.trim();

  return (
    !email ||
    !isValidEmail(email) ||
    !name ||
    !telefon ||
    !isValidHuPhone(telefon)
  );
});

function isValidHuPhone(phone: string) {
  if (!phone) return false;

  const p = phone.replace(/\s|-/g, "");
  return /^(\+36|06)\d{9}$/.test(p);
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
}
.service-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: white;
  transition: color 0.3s ease, transform 0.2s ease;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: scale(1.05);
}

.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card p{
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

@media (hover: hover) and (pointer: fine) {
  .service-card:hover::before {
    opacity: 1;
    transform: scale(1);
  }

  .service-card:hover::after {
    opacity: 1;
  }

  .service-card:hover p{
    color: white;
  }

  .service-card:hover {
    transform: translateY(-2px);
  }
}

@media (hover: none) and (pointer: coarse) {
  .service-card::before {
    opacity: 1;
    transform: scale(1);
  }

  .service-card::after {
    opacity: 1;
    background: rgba(0, 0, 0, 0.35);
  }

  .service-card p {
    color: white;
  }

  .service-card:active {
    transform: scale(0.98);
  }
}

.service-electric::before {
  background-image: url('@/assets/light_bulb.png');
}

.service-ac::before {
  background-image: url('../assets/air_conditioner.png');
}


.rating-slide{
  position: relative;
}

.rating-slide::before{
  width: 4px;
  top: 18px;
  bottom: 18px;
  opacity: .9;
}

.rating-header{
  background: rgba(255, 0, 0, 0.035);
  border: 1px solid rgba(255, 0, 0, 0.10);
  padding: 8px 12px;
  border-radius: 12px;
}

.rating-title{
  border-bottom: 1px solid rgba(0,0,0,.15);
}

.gradient-icon{
  background: linear-gradient(45deg, #ff4b4b, #a7a7a7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.img-box{
  width: 20%;
  aspect-ratio: 1 / 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
}
</style>
