<template>
    <div class="page d-flex flex-column align-center justify-center">
        <div class="d-flex" style="width: 100%;">
            <v-container elevation="0" fluid width="50%" class="d-flex flex-column ga-5">
                <v-card
                elevation="2"
                class="d-flex justify-center align-center rounded-lg section-title"
                >
                    <h1 class="text-h5 font-weight-bold">Villanyszerelés</h1>
                </v-card>
                <v-card elevation="2" class="rounded-lg py-4 px-2">
                    <v-list density="compact">
                        <v-list-item>
                            <v-icon start color="red-darken-2">mdi-lightning-bolt</v-icon>
                            Valami dolog
                        </v-list-item>

                        <v-list-item>
                            <v-icon start color="red-darken-2">mdi-lightning-bolt</v-icon>
                            Valami dolog
                        </v-list-item>

                        <v-list-item>
                            <v-icon start color="red-darken-2">mdi-lightning-bolt</v-icon>
                            Valami dolog
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-container>
            <v-container elevation="0" fluid width="50%" class="d-flex flex-column ga-5">
                <v-card
                elevation="2"
                class="d-flex justify-center align-center rounded-lg section-title"
                >
                    <h1 class="text-h5 font-weight-bold">Légkondícionáló berendezés szerelés</h1>
                </v-card>
                <v-card elevation="2" class="rounded-lg py-4 px-2">
                    <v-list density="compact">
                        <v-list-item>
                            <v-icon start color="blue-darken-2">mdi-air-conditioner</v-icon>
                            Valami dolog
                        </v-list-item>

                        <v-list-item>
                            <v-icon start color="blue-darken-2">mdi-air-conditioner</v-icon>
                            Valami dolog
                        </v-list-item>

                        <v-list-item>
                            <v-icon start color="blue-darken-2">mdi-air-conditioner</v-icon>
                            Valami dolog
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page{
    width: 100%;
    height: 100%;
}

.section-title {
    background: linear-gradient(90deg, #ff4b4b, #ffffff, #ffffff);
    padding: 20px;
}
</style>
