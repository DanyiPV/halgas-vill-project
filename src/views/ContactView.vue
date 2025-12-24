<template>
    <div class="page">
      <v-container class="d-flex align-center justify-center ga-5">
        <v-row :no-gutters="isMobile">
          <v-col cols="12" sm="6" lg="8" :order="isMobile ? 2 : 1">
            <v-card class="pa-4">
              <p class="text-h3 mb-5">Halgas János</p>
              <div class="d-flex flex-column ga-4 mb-2">
                <div class="d-flex align-center">
                  <v-icon start class="gradient-icon">mdi-email-outline</v-icon>
                  <p style="width: min-content;">info@halgasvill.hu</p>
                </div>
                <div  class="d-flex align-center">
                  <v-icon start class="gradient-icon">mdi-phone-outline</v-icon>
                  <p>+36 20 / 325-5394</p>
                </div>
                <div  class="d-flex align-center">
                  <v-icon start class="gradient-icon">mdi-map-marker-outline</v-icon>
                  <p>Dánszentmiklós, Dózsa György u. 23/A, 2735</p>
                </div>
                <div  class="d-flex align-center">
                  <v-icon start class="gradient-icon">mdi-file-document-outline</v-icon>
                  <p>90830318-1-33</p>
                </div>
              </div>

              <v-card class="rounded-lg" elevation="0">
                <v-card-title class="text-h7">
                  <v-icon class="gradient-icon">mdi-map-marker</v-icon>
                  Telephely
                </v-card-title>

                <v-card-text>
                  <v-responsive aspect-ratio="16/9" min-height="25vh">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.238814836485!2d19.553068076421882!3d47.20868087115996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47419c959b331ddf%3A0x318c2974f5197ec1!2sD%C3%A1nszentmikl%C3%B3s%2C%20D%C3%B3zsa%20Gy%C3%B6rgy%20u.%2023%2FA%2C%202735!5e0!3m2!1shu!2shu!4v1734102500000!5m2!1shu!2shu"
                        width="100%"
                        height="100%"
                        style="border:0;"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </v-responsive>
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" lg="4" :order="isMobile ? 1 : 2" :class="isMobile ? 'mb-4' : ''">
            <v-card elevation="0" class="d-flex justify-center align-center" color="transparent" height="100%">
              <div
                style="height:inherit; width:100%; background-position:center; background-size:cover;"
                :style="{ backgroundImage: `url(${contactPfp})` }"
              ></div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-card elevation="4" class="d-flex align-center justify-center py-2">
          <h2>Ajánlott szakemberek</h2>
        </v-card>
      </v-container>

      <v-container>
        <v-row class="ga-4 justify-center mx-0" :no-gutters="isMobile">
          <v-col
            v-for="(prof, i) in recommended"
            :key="i"
            cols="12"
            sm="6"
            :lg="lgCols"
          >
            <v-card elevation="4">
              <v-list density="compact">
                <v-list-item>
                  <template #prepend>
                    <v-icon class="gradient-icon" icon="mdi-briefcase-outline" />
                  </template>
                  {{ prof.szakma }}
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon class="gradient-icon" icon="mdi-account-outline" />
                  </template>
                  {{ prof.nev }}
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon class="gradient-icon" icon="mdi-phone-outline" />
                  </template>
                  {{ prof.telefon }}
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon class="gradient-icon" icon="mdi-email-outline" />
                  </template>
                  {{ prof.email ?? "Nincs megadva email." }}
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useDisplay } from 'vuetify'
import contactPfp from "@/assets/contact_pfp.png";

const { mobile } = useDisplay()

export type RecommendedProfessional = {
  szakma: string;
  nev: string;
  telefon: string | null | undefined;
  email: string | null | undefined;
};

const recommended = ref<RecommendedProfessional[]>([]);
const isMobile = computed(() => mobile.value)

function parseRecommendedProfessionals(text: string): RecommendedProfessional[] {
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim());

  const result: RecommendedProfessional[] = [];

  let buffer: string[] = [];

  const flush = () => {
    const chunk = buffer.filter(Boolean);
    buffer = [];

    if (chunk.length === 0) return;

    const szakma = chunk[0] ?? "";
    const nev = chunk[1] ?? "";
    const telefon = chunk[2] != "-" ? chunk[2] : null;

    if (!szakma || !nev || !telefon) {
      return;
    }

    const email = chunk[3] != "-" ? chunk[3] : null;

    result.push({ szakma, nev, telefon, email });
  };

  for (const line of lines) {
    if (line === "#") {
      flush();
      continue;
    }
    buffer.push(line);
  }

  flush();

  return result;
}

async function loadRecommended() {
  const res = await fetch("/recProfs.txt");
  const text = await res.text();
  recommended.value = parseRecommendedProfessionals(text);
}

onMounted(loadRecommended);

const lgCols = computed(() => (recommended.value.length <= 2 ? 5 : 4));
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
}

.gradient-icon{
  background: linear-gradient(45deg, #ff4b4b, #a7a7a7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
