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
                <h1>Légkondícionáló berendezés telepítése, karbantartása</h1>
            </v-card>
        </v-container>

        <v-container max-width="60%" min-height="25vh">
            <v-card elevation="5" class="pa-4">
                <div class="text-center mb-5 d-flex ga-2 align-center justify-center">
                    <v-icon size="35">mdi-help-circle-outline</v-icon>
                    <h1>Miben segíthetek?</h1>
                </div>
                <div class="d-flex justify-space-round align-center ga-4">
                    <div style="width: 80%;">
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
                        <div style="width: 100%;" class="d-flex ga-4 px-4">
                            <v-textarea prepend-inner-icon="mdi-comment" no-resize rows="5" label="Leírás" max-width="100%" variant="solo-filled" clearable></v-textarea>
                        </div>
                    </div>
                    <div style=" width: 20%; border: 0.1vw solid black">
                        ide jön egy kép
                    </div>
                </div>
                
            </v-card>
        </v-container>

        <v-container elevation="0" max-width="60%">
            <v-card elevation="0" color="transparent" class="d-flex justify-center align-center">
              <v-btn elevation="4" color="red">Értékelj!</v-btn>
            </v-card>
        </v-container>
    </div>
</template>

<script setup lang="ts"></script>

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
</style>
