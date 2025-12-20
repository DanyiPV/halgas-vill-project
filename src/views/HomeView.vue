<template>
  <div class="page">
    <v-container max-width="60%" class="d-flex ga-10">
      <v-card
        elevation="5"
        width="50%"
        min-height="25vh"
        class="service-card d-flex rounded-lg justify-center align-center text-center service-electric"
      >
        <h1>Teljeskörű lakossági villanyszerelés</h1>
      </v-card>

      <v-card
        elevation="5"
        width="50%"
        min-height="25vh"
        class="service-card d-flex rounded-lg justify-center align-center text-center service-ac"
      >
        <h1>Légkondicionáló berendezés telepítése, karbantartása</h1>
      </v-card>
    </v-container>

    <v-container max-width="60%">
      <v-card elevation="5" class="pa-4">
        <div class="text-center mb-5 d-flex ga-2 align-center justify-center">
          <v-icon size="35">mdi-help-circle-outline</v-icon>
          <h1>Miben segíthetek?</h1>
        </div>
        <div class="d-flex justify-space-round align-center ga-4">
          <div style="width: 80%">
            <div class="d-flex ga-4 px-4">
              <v-text-field
                label="e-mail"
                prepend-inner-icon="mdi-email-outline"
                variant="solo-filled"
                clearable
                width="50%"
              ></v-text-field>
              <v-text-field
                label="Név"
                prepend-inner-icon="mdi-account-outline"
                variant="solo-filled"
                clearable
                width="50%"
              ></v-text-field>

              <v-text-field
                label="Telefonszám"
                prepend-inner-icon="mdi-phone-outline"
                variant="solo-filled"
                clearable
                width="50%"
              ></v-text-field>
            </div>
            <div style="width: 100%" class="d-flex ga-4 px-4">
              <v-textarea
                prepend-inner-icon="mdi-comment"
                no-resize
                rows="5"
                label="Leírás"
                max-width="100%"
                variant="solo-filled"
                clearable
              ></v-textarea>
            </div>
          </div>
          <div style="width: 20%; border: 0.1vw solid black">ide jön egy kép</div>
        </div>
      </v-card>
    </v-container>

    <v-container elevation="0" max-width="60%" class="position-relative">
      <v-card elevation="5">
        <div>
          <v-btn class="position-absolute" style="right: 3vh;top: 3vh; z-index: 2" @click="ratingOpen = true">
            Értékelés
          </v-btn>
        </div>
        <v-card class="text-center py-4">
          <div class="d-flex justify-center mt-auto text-h4">Értékelések</div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h2 mt-5">
              {{ rating?.rating }}
              <span class="text-h6 ml-n3">/5</span>
            </div>

            <v-rating
              :model-value="rating?.rating"
              color="grey"
              half-increments
              readonly
              active-color="red"
              size="60"
            ></v-rating>
            <div class="px-3 mb-2 text-h6">{{ rating?.count }} értékelés</div>
          </div>

          <div>
            <v-defaults-provider>
              <v-sheet elevation="4" class="overflow-hidden ma-auto mb-2" max-width="90%" rounded="lg">
                <v-carousel
                  v-model="currentIndex"
                  height="300"
                  show-arrows="hover"
                  cycle
                  hide-delimiters
                >
                  <v-carousel-item v-for="(item, i) in ratingsArray" :key="i" cover>
                    <div class="d-flex flex-column pa-8 ml-1 rating-slide" style="height: 70%; width: 100%;">
                      <div class="d-flex align-center mb-4 rating-header">
                        <p class="text-h5 mb-0">{{ item.nev }}</p>

                        <v-divider vertical class="mx-3" />

                        <v-rating
                          :model-value="item.rating"
                          half-increments
                          readonly
                          active-color="red"
                          color="grey-lighten-1"
                          density="comfortable"
                          size="20"
                        />
                      </div>

                      <div class="px-10">
                        <div class="d-flex text-left rating-title">
                          <v-chip color="red" variant="tonal" size="large" class="mt-1 mb-2">
                            Vélemény
                          </v-chip>
                        </div>

                        <div class="">
                          <p class="text-body-1 text-left rating-text">{{ (item.leiras == "" ? "Nem írt véleményt" : item.leiras )}}</p>
                        </div>
                      </div>
                    </div>
                  </v-carousel-item>
                </v-carousel>
              </v-sheet>
            </v-defaults-provider>
          </div>
        </v-card>
      </v-card>
    </v-container>

  <v-dialog max-width="500" v-model="ratingOpen">
    <v-card class="px-4 py-8 d-flex flex-column align-center">
      <v-text-field
        label="e-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="solo-filled"
        clearable
        width="90%"
        v-model="newRatingEmail"
        :rules="[
        (v) => !!v || 'Kötelező ezt a mezőt kitölteni', (v) => (v && isValidEmail(v)) || 'Nem jó email cím!']"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        label="Név"
        prepend-inner-icon="mdi-account-outline"
        variant="solo-filled"
        clearable
        width="90%"
        v-model="newRatingName"
        :rules="[
        (v) => !!v || 'Kötelező ezt a mezőt kitölteni']"
      ></v-text-field>

      <v-rating
          color="grey"
          half-increments
          active-color="red"
          size="40"
          class="mb-4"
          v-model="newRating"
        ></v-rating>

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
          v-model="newRatingDesc"
        ></v-textarea>
      </div>
      <div>
        <v-btn
          color="red"
          variant="flat"
          :disabled="isSubmitDisabled"
          @click="addRating()"
        >
          Értékelés elküldése
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import { useGetRatings, useGetAllRatings, useAddNewRating } from '../api/ratingQuery'
//import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'

const showError = inject("showError");
const showSucces = inject("showSucces");

const { data: rating } = useGetRatings()
const { data: ratingItems } = useGetAllRatings()
const { mutate: addNewRating } = useAddNewRating()
//const { mobile } = useDisplay()

const route = useRoute()
//const isMobile = computed(() => mobile.value)

type RatingItem = { nev: string; rating: number, email: string, leiras: string }

const currentIndex = ref(0)
const ratingsArray = ref<RatingItem[]>([])
const activeName = computed(() => (route.name as string) || 'home')
const ratingOpen = ref(false);
const newRatingName = ref("");
const newRatingEmail = ref("");
const newRating = ref(0);
const newRatingDesc = ref("");

const addRating = async () => {
  await addNewRating({email: newRatingEmail.value, nev: newRatingName.value, rating: newRating.value, leiras: newRatingDesc.value},{
    onSuccess: (response) =>{
      ratingOpen.value = false;
      if (showSucces) {
        showSucces("Értesítés sikeresen elküldve!");
      }else{
        console.log("Értesítés sikeresen elküldve!");
      }
    },
    onError: (error) =>{
      if (showError) {
        showError(error.response.data);
      }else{
        console.log(error.response.data);
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
  transition: color 0.3s ease;
}

.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  transform: scale(1.05);
}

.service-card:hover::before {
  opacity: 1;
  transform: scale(1);
}

.service-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.service-card:hover::after {
  opacity: 1;
}

.service-card h1 {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.service-card:hover h1 {
  color: white;
}

.service-electric::before {
  background-image: url('@/assets/light_bulb.jpg');
}

.service-ac::before {
  background-image: url('../assets/air_conditioner.jpeg');
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

.rating-text{
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.45;
}
</style>
