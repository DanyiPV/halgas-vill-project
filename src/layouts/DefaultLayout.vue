<template>
     <v-container
    fluid
    height="30vh"
    class="d-flex justify-center bg-hero position-relative"
    style="position: relative"
    >   
        <div class="text-center px-4 py-2 rounded">
            <h1 style="font-size: 6vh">Halgas Vill</h1>
            <p style="font-size: 5vh" class="mt-5">Villany és klíma szerelés</p>
            <p style="font-size: 2.5vh; font-style: italic" class="mt-5">
                minőség | megbízhatóság | biztonság
            </p>
        </div>

        <div
        style="
            border: 0.1vw solid black;
            width: 25vh;
            height: 25vh;
            position: absolute;
            left: 10vh;
            top: 50%;
            transform: translate(0%, -50%);
        "
        >
        <p>logó</p>
        </div>

        <div
        style="
            border: 0.1vw solid black;
            width: 10vh;
            height: 10vh;
            position: absolute;
            right: 1vh;
            bottom: 1vh;
        "
        class="d-flex justify-center align-center"
        >
        <div class="d-flex flex-column align-center justify-center ga-2">
            <div class="d-flex ga-1 align-center">
            <p>facebook</p>
            <v-icon size="28">mdi-facebook</v-icon>
            </div>
            <div class="d-flex ga-1 align-center">
            <p>instagram</p>
            <v-icon size="28">mdi-instagram</v-icon>
            </div>
        </div>
        </div>
    </v-container>

    <nav>
        <div
        class="d-flex justify-space-evenly align-center py-2"
        style="border-bottom: .1vw solid black;"
        >
            <div ref="navEl" class="nav-wrap">
                <v-btn
                v-for="item in items"
                :key="item.name"
                class="nav-btn"
                variant="text"
                elevation="0"
                color="black"
                :data-route="item.name"
                :prepend-icon="item.icon"
                @click="activeName !== item.name && router.push({ name: item.name })"
                >
                <template #prepend>
                    <v-icon color="black" size="22" />
                </template>
                {{ item.label }}
                </v-btn>

                <div class="nav-indicator nav-indicator--stretch"
                    :style="{ left: stretchLeft+'px', width: stretchWidth+'px' }"></div>
                <div class="nav-indicator nav-indicator--base"
                    :style="{ left: indicatorLeft+'px', width: indicatorWidth+'px' }"></div>
            </div>
        </div>
    </nav>

    <RouterView v-slot="{ Component }">
        <Transition :name="transitionName" mode="out-in">
            <component :is="Component" :key="route.fullPath" />
        </Transition>
    </RouterView>

    <div>ide jön az alja</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const navEl = ref<HTMLElement | null>(null)

const indicatorLeft = ref(0)
const indicatorWidth = ref(0)

const stretchLeft = ref(0)
const stretchWidth = ref(0)

let prevLeft = 0
let prevWidth = 0

const transitionName = ref<'slide-left' | 'slide-right'>('slide-left')

let previousOrder = (route.meta.order as number) ?? 0

watch(
  () => route.meta.order,
  (newOrder) => {
    const order = (newOrder as number) ?? 0

    transitionName.value =
      order > previousOrder ? 'slide-left' : 'slide-right'

    previousOrder = order
  }
)
const items = [
  { name: 'home', label: 'Főoldal', icon: 'mdi-home' },
  { name: 'services', label: 'Szolgáltatások', icon: 'mdi-tools' },
  { name: 'portfolio', label: 'Referencia munkák', icon: 'mdi-image-multiple' },
  { name: 'contact', label: 'Kapcsolat', icon: 'mdi-phone' },
] as const

const activeName = computed(() => (route.name as string) || 'home')

function measureActive() {
  const root = navEl.value
  if (!root) return null

  const activeBtn = root.querySelector<HTMLElement>(`[data-route="${activeName.value}"]`)
  if (!activeBtn) return null

  const rootRect = root.getBoundingClientRect()
  const btnRect = activeBtn.getBoundingClientRect()

  return {
    left: btnRect.left - rootRect.left,
    width: btnRect.width,
  }
}

async function updateIndicator(animated = true) {
  await nextTick()
  const m = measureActive()
  if (!m) return

  const newLeft = m.left
  const newWidth = m.width

  if (!animated) {
    indicatorLeft.value = newLeft
    indicatorWidth.value = newWidth
    stretchLeft.value = newLeft
    stretchWidth.value = newWidth
    prevLeft = newLeft
    prevWidth = newWidth
    return
  }

  // 1) gyors "nyúlás": a két állapot közti teljes sávot lefedi
  const fromLeft = prevLeft
  const fromRight = prevLeft + prevWidth
  const toLeft = newLeft
  const toRight = newLeft + newWidth

  stretchLeft.value = Math.min(fromLeft, toLeft)
  stretchWidth.value = Math.max(fromRight, toRight) - stretchLeft.value

  // 2) base indikátor megy a végleges helyre (lassabban)
  indicatorLeft.value = newLeft
  indicatorWidth.value = newWidth

  // 3) a stretch egy kicsit később "összeül" a base-re
  window.setTimeout(() => {
    stretchLeft.value = newLeft
    stretchWidth.value = newWidth
  }, 140)

  prevLeft = newLeft
  prevWidth = newWidth
}

onMounted(async () => {
  await updateIndicator(false)
  window.addEventListener('resize', () => updateIndicator(false))
})

watch(activeName, () => {
  updateIndicator(true)
})
</script>

<style>
.bg-hero {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('@/assets/header_pic.jpg');
  background-size: cover;
  background-position: center;
}

.text-gradient {
  background: linear-gradient(to right, #ff6b6b, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn-active {
  background-color: rgb(var(--v-theme-nav_btn_active));
  color: rgb(var(--v-theme-primary)) !important;
}

.btn-active .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 300ms ease, opacity 300ms ease;
}

.slide-left-enter-from { transform: translateX(30%); opacity: 0; }
.slide-left-leave-to   { transform: translateX(-30%); opacity: 0; }

.slide-right-enter-from { transform: translateX(-30%); opacity: 0; }
.slide-right-leave-to   { transform: translateX(30%); opacity: 0; }

.nav-wrap {
  position: relative;
  display: flex;
  gap: 150px;
  align-items: center;
  padding-bottom: 10px;
}


.nav-btn {
  border-radius: 999px;
}


.nav-indicator {
  position: absolute;
  bottom: 0;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(to left, #ff5a5a, #ffffff);
}

.nav-indicator--stretch {
  opacity: .8;
  transition: left 180ms ease, width 180ms ease;
}

.nav-indicator--base {
  transition: left 300ms cubic-bezier(.2,.8,.2,1), width 300ms cubic-bezier(.2,.8,.2,1);
}
</style>
