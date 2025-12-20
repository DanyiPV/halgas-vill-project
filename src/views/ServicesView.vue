<template>
    <div class="page">
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
                    <v-list-item
                      v-for="(item, index) in Villanyszereles"
                      :key="index"
                    >
                      <template #prepend>
                        <v-icon color="red-darken-2">
                          mdi-chevron-right
                        </v-icon>
                      </template>

                      <v-list-item-title>
                        {{ item }}
                      </v-list-item-title>
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
                    <v-list-item
                      v-for="(item, index) in Legkondicionalo"
                      :key="index"
                    >
                      <template #prepend>
                        <v-icon color="blue-darken-2">
                          mdi-chevron-right
                        </v-icon>
                      </template>

                      <v-list-item-title>
                        {{ item }}
                      </v-list-item-title>
                    </v-list-item>
                </v-card>
            </v-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const Villanyszereles = ref<string[]>([]);
const Legkondicionalo = ref<string[]>([]);

const loadTxt = async () => {
  const res = await fetch("/public/services.txt");
  const text = await res.text();

  const lines = text.split("\n").map(l => l.trim());

  let isSecondPart = false;

  for (const line of lines) {
    if (!line) continue;
    if (line === "#") {
      isSecondPart = true;
      continue;
    }

    if (!isSecondPart) {
      Villanyszereles.value.push(line);
    } else {
      Legkondicionalo.value.push(line);
    }
  }
};

onMounted(loadTxt);
</script>

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
