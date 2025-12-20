<template>
    <div class="page">
      <v-container class="d-flex align-center justify-center ga-5">
          <v-card class="pa-4" width="70%">
              <h1>Halgas János</h1>
              <v-list density="compact">
                  <v-list-item>
                      <v-icon start class="gradient-icon">mdi-email-outline</v-icon>
                      info@halgasvill.hu
                  </v-list-item>
                  <v-list-item>
                      <v-icon start class="gradient-icon">mdi-phone-outline</v-icon>
                      +36 20 / 325-5394
                  </v-list-item>
                  <v-list-item>
                      <v-icon start class="gradient-icon">mdi-map-marker-outline</v-icon>
                      Dánszentmiklós, Dózsa György u. 23/A, 2735
                  </v-list-item>
                  <v-list-item>
                      <v-icon start class="gradient-icon">mdi-file-document-outline</v-icon>
                      90830318-1-33
                  </v-list-item>
              </v-list>

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
          <v-card width="30%">
              <div style="border: .1vw solid black; height: 22vh; width: 100%;">
                  ide jön a kép
              </div>
          </v-card>
      </v-container>

      <v-container>
        <v-card elevation="4" class="d-flex align-center justify-center py-2">
          <h2>Ajánlott szakemberek</h2>
        </v-card>
      </v-container>

      <v-container>
        <v-row class="ga-4 justify-center">
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

export type RecommendedProfessional = {
  szakma: string;
  nev: string;
  telefon: string | null | undefined;
  email: string | null | undefined;
};

const recommended = ref<RecommendedProfessional[]>([]);

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
  const res = await fetch("../../public/recProfs.txt");
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
  background: linear-gradient(45deg, #ff4b4b, #ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>
