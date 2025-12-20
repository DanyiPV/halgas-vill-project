<script setup lang="ts">
import { ref, provide, nextTick } from "vue";

import ErrorHandler from "../src/components/ErrorHandler.vue";
import SuccesHandler from "../src/components/SuccesHandler.vue";
const errorHandler = ref(null);
const succesHandler = ref(null);

provide("showError", (msg) => {
  nextTick(() => {
    if (errorHandler.value) {
      errorHandler.value.showError(msg);
    } else {
      console.log("errorHandler még nem elérhető");
    }
  });
});

provide("showSucces", (msg) => {
  nextTick(() => {
    if (succesHandler.value) {
      succesHandler.value.showSucces(msg);
    } else {
      console.log("succesHandler még nem elérhető");
    }
  });
});

</script>

<template>
  <RouterView></RouterView>

  <ErrorHandler ref="errorHandler" />

  <SuccesHandler ref="succesHandler" />
</template>

<style scoped></style>
