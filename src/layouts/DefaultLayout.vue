<template>
  <v-container
    fluid
    class="hero d-flex justify-center align-center position-relative"
  >
    <div class="hero-text text-center px-4 py-2">
      <p class="hero-title text-h4">Halgas János ev.</p>
      <p class="hero-subtitle text-h6 mt-8">Villany és klímaszerelés</p>
      <p class="hero-tagline mt-2">minőség <span class="sep">|</span> megbízhatóság <span class="sep">|</span> biztonság</p>
    </div>

    <div class="logo-wrap" v-if="!isMobile">
      <p>logó</p>
    </div>

    <div class="hero-socials">
      <v-btn icon variant="tonal" class="social-btn" @click="openFacebook" aria-label="Facebook">
        <v-icon size="40">mdi-facebook</v-icon>
      </v-btn>

      <v-btn icon variant="tonal" class="social-btn" @click="openInstagram" aria-label="Instagram">
        <v-icon size="34">mdi-instagram</v-icon>  
      </v-btn>
    </div>
  </v-container>

  <nav class="nav-bar">
    <div
      class="d-flex justify-space-evenly align-center py-2"
    >
      <div ref="navEl" class="nav-wrap">
        <v-btn
          v-for="item in items"
          :key="item.name"
          class="nav-btn d-flex align-center"
          variant="text"
          elevation="0"
          color="black"
          :data-route="item.name"
          @click="activeName !== item.name && router.push({ name: item.name })"
        >
          <v-icon size="22">{{ item.icon }}</v-icon>
          <p v-if="!isMobile"  :style="{marginLeft: isMobile ? '0' : '5px'}">{{ item.label }}</p>
        </v-btn>
        <div
          class="nav-indicator nav-indicator--stretch"
          :style="{ left: stretchLeft + 'px', width: stretchWidth + 'px' }"
        ></div>
        <div
          class="nav-indicator nav-indicator--base"
          :style="{ left: indicatorLeft + 'px', width: indicatorWidth + 'px' }"
        ></div>
      </div>
    </div>
  </nav>

  <RouterView v-slot="{ Component }">
    <Transition :name="transitionName" mode="out-in" @after-enter="onAfterEnter">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>

  <div>ide jön az alja</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const router = useRouter()
const route = useRoute()
const navEl = ref<HTMLElement | null>(null)
const isMobile = computed(() => mobile.value)

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

    transitionName.value = order > previousOrder ? 'slide-left' : 'slide-right'

    previousOrder = order
  },
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

  const fromLeft = prevLeft
  const fromRight = prevLeft + prevWidth
  const toLeft = newLeft
  const toRight = newLeft + newWidth

  stretchLeft.value = Math.min(fromLeft, toLeft)
  stretchWidth.value = Math.max(fromRight, toRight) - stretchLeft.value

  indicatorLeft.value = newLeft
  indicatorWidth.value = newWidth

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

const openFacebook = () => {
  window.open(
    'https://www.facebook.com/share/17mFy5E2rF/',
    '_blank',
    'noopener,noreferrer'
  )
}

const openInstagram = () => {
  window.open(
    'https://www.instagram.com/halgas_vill/',
    '_blank',
    'noopener,noreferrer'
  )
}

async function onAfterEnter() {
  if (!route.hash) return

  const start = performance.now()
  const timeoutMs = 2000

  const waitForEl = () =>
    new Promise<HTMLElement | null>((resolve) => {
      const tick = () => {
        const el = document.querySelector(route.hash) as HTMLElement | null
        if (el) return resolve(el)
        if (performance.now() - start > timeoutMs) return resolve(null)
        requestAnimationFrame(tick)
      }
      tick()
    })

  const el = await waitForEl()
  el?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
}
</script>

<style>
.bg-hero {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
  background-size: cover;
  background-position: center;
  min-height: 20vh;
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
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}

.slide-left-enter-from {
  transform: translateX(30%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-30%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(30%);
  opacity: 0;
}

.nav-bar {
  background: rgba(255,255,255,0.92);
  border-top: 1px solid rgba(0,0,0,0.06);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

.nav-wrap {
  position: relative;
  display: flex;
  align-items: center;

  justify-content: space-between;
  gap: clamp(18px, 4vw, 70px);

  padding: 10px 24px 14px;
}

.nav-indicator {
  position: absolute;
  bottom: 4px;
  height: 3px;
  border-radius: 999px;

  background: #C62828;

  box-shadow: 0 6px 16px rgba(198, 40, 40, 0.25);
}

.nav-indicator--stretch {
  opacity: 0.8;
  transition:
    left 180ms ease,
    width 180ms ease;
}

.nav-indicator--base {
  transition:
    left 300ms cubic-bezier(0.2, 0.8, 0.2, 1),
    width 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.routeBG{
  background-image: url("../assets/background.jpg");
  background-position: bottom;
  background-size: cover;
}

.hero{
  min-height: 20vh;
  padding: 24px 64px;
}

.hero-text{
  color: white;
  max-width: 900px;
  text-shadow: 0 2px 12px rgba(0,0,0,.35);
}

.hero-title{
  font-size: clamp(28px, 4vw, 56px);
  font-weight: 800;
  line-height: 1.05;
  margin: 0;
}

.hero-subtitle{
  font-size: clamp(18px, 2.6vw, 38px);
  font-weight: 600;
  margin: 0;
}

.hero-tagline{
  font-size: clamp(12px, 1.4vw, 18px);
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: lowercase;
  opacity: .95;
  margin: 0;
}

.hero-tagline .sep{
  opacity: .7;
  margin: 0 .5em;
}

.logo-wrap{
  position: absolute;
  left: 64px;
  top: 50%;
  transform: translateY(-50%);
  width: min(15vh, 260px);
  height: min(15vh, 260px);
  border: 1px solid rgba(0,0,0,.4);
}

.hero-socials{
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.social-btn{
  backdrop-filter: blur(6px);
}

@media (max-width: 900px){
  .hero{ padding: 20px 20px; }
  .logo-wrap{ left: 20px; }
}

</style>
