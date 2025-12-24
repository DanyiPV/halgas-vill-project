<script setup lang="ts">
import { ref, provide } from "vue";
import ErrorHandler from "@/components/ErrorHandler.vue";
import SuccessHandler from "@/components/SuccesHandler.vue";
import { ShowErrorKey, ShowSuccessKey } from "@/injectionKeys";

const errorHandler = ref<InstanceType<typeof ErrorHandler> | null>(null);
const successHandler = ref<InstanceType<typeof SuccessHandler> | null>(null);

provide(ShowErrorKey, (msg: string) => {
  errorHandler.value?.showError(msg);
});

provide(ShowSuccessKey, (msg: string) => {
  successHandler.value?.showSucces(msg);
});
</script>

<template>
  <ErrorHandler ref="errorHandler" />
  <SuccessHandler ref="successHandler" />
  <router-view />
</template>
