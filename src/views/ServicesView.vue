<template>
    <div class="page">
      <div>
        <v-row class="mx-0" :no-gutters="isMobile">
          <v-col cols="12" sm="6" lg="6">
            <v-container elevation="0" class="d-flex flex-column ga-5">
              <v-card
              elevation="2"
              class="d-flex justify-center align-center rounded section-title"
              id="villany"
              >
                <p class="text-h5 font-weight-bold">Villanyszerelés</p>
              </v-card>
    
              <v-card elevation="2" class="rounded py-4 px-2">
                <v-list>
                  <v-list-item
                    v-for="(item, index) in Villanyszereles"
                    :key="index"
                  >
                    <template #prepend>
                      <v-icon color="red-darken-2">
                        mdi-chevron-right
                      </v-icon>
                    </template>
    
                    <p>{{ item }}</p>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-container>
          </v-col>

          <v-col cols="12" sm="6" lg="6">
            <v-container elevation="0" class="d-flex flex-column ga-5">
              <v-card
              elevation="2"
              class="d-flex justify-center align-center rounded section-title"
              id="klima"
              >
                <p class="text-h5 text-center font-weight-bold">Légkondicionáló berendezés szerelés</p>
              </v-card>
              <v-card elevation="2" class="rounded py-4 px-2">
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
                      <p>{{ item }}</p>
                    </v-list-item-title>
                  </v-list-item>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const isMobile = computed(() => mobile.value)
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

#klima, #villany {
  scroll-margin-top: 80px;
}
</style>
