<template>
  <v-dialog v-model="dialog" width="auto" height="auto" content-class="rounded overflow-hidden select-none" :scrim="false"
    transition="" persistent>
    <template #activator="{ props }">
      <div v-bind="props">
        <slot name="activator" />
      </div>
    </template>

    <div class="w-fit max-w-[800px] h-fit max-h-[650px] flex !rounded-xl"
      :class="theme === 'customLightTheme' ? 'bg-white/90' : 'bg-neutral-900/90'">
      <!-- Left Side -->
      <div class="!w-[250px] h-full flex flex-col border-r border-r-gray-300 overflow-y-auto">
        <div class="flex items-center gap-2 px-3 pt-4 pb-5">
          <div class="flex items-center w-3 h-3 rounded-full bg-red-500" @click="dialog = false">
            <Icon icon="bx:x" width="20" height="20" class="text-black/40" />
          </div>

          <div class="w-3 h-3 rounded-full bg-yellow-500" />

          <div class="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <v-text-field variant="outlined" color="contextBlue" density="compact" prepend-inner-icon="mdi-magnify"
          :placeholder="'Search'" class="px-2 pb-2" hide-details />

        <div class="border-b border-b-gray-300" />

        <div class="overflow-y-auto flex flex-col gap-5 px-2 py-4">
          <div v-for="item in items" :key="item" class="flex flex-col pr-3">
            <div v-for="element in item?.elements" :key="element" class="flex items-center rounded-[6px] px-3 py-1 gap-1"
              :class="theme === customLightTheme ? 'hover:bg-black/10' : 'hover:bg-context-blue'">
              <div class="w-6 h-6 rounded-[6px] flex items-center justify-center" :class="`!bg-${element?.color}`">
                <Icon :icon="element?.icon" height="16" width="16" class="text-white" />
              </div>

              <dsm-text sm medium>
                {{ element?.title }}
              </dsm-text>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="flex flex-col flex-1 overflow-y-auto">
        <!-- Header With Menu name -->
        <div class="flex items-center pl-2 pt-2 pb-3 gap-3">
          <div class="flex items-center gap-2">
            <div>
              <Icon icon="mdi:chevron-left" height="30" width="30"
                :class="theme === 'customLightTheme' ? 'text-black/20' : 'text-white'" />
            </div>

            <div>
              <Icon icon="mdi:chevron-right" height="30" width="30"
                :class="theme === 'customLightTheme' ? 'text-black/20' : 'text-white'" />
            </div>
          </div>

          <dsm-text base medium>
            {{ "Wallpaper" }}
          </dsm-text>
        </div>

        <!-- Actual Wallpaper -->
        <div class="flex items-start pl-4 pr-2 gap-3">
          <div class="w-[150px] h-[100px] overflow-hidden rounded border border-black/25">
            <img :src="background" width="150" height="75" />
          </div>

          <div class="flex-1 rounded border border-black/2 p-2">
            <dsm-text sm medium class="capitalize">
              {{ background?.split('.')?.[0]?.split('/')?.[background?.split('.')?.[0]?.split('/')?.length - 1] }}
            </dsm-text>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-t-gray-300 my-4" />

        <!-- Other backgrounds -->
        <div class="flex flex-col px-4 py-2 gap-5">
          <div v-for="category in backgrounds" :key="category?.title" class="flex flex-col gap-2 overflow-x-auto">
            <dsm-text sm medium>
              {{ category?.title }}
            </dsm-text>

            <div class="w-fit flex gap-2 pr-3 overflow-x-hidden">
              <div v-for="image in category?.images" :key="image"
                class="rounded bg-middle-grey w-[125px] h-[75px] overflow-hidden relative bg-contain bg-center"
                :class="background === image ? 'border-2 border-context-blue' : 'border-black/25'" :style="{
                  'background-image': image ? `url('${image}')` : '',
                  'background-size': 'cover'
                }" @click="setBackground(image)" />
              <!-- <div v-for="image in category?.images" :on-keyup="image"
                class="rounded w-[125px] h-[75px] flex items-center overflow-hidden border"
                :class="background === image ? '!border-context-blue' : 'border-black/25'" @click="setBackground(image)">
                <img :src="image" width="125" />
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import DsmText from '../DsmText.vue';
import DsmTitle from '../DsmTitle.vue';
import { storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import { useBackgroundStore } from '../../stores/background.store.js'
import original1 from '../../assets/wallpapers/Appearance_Light-min.png';
import original2 from '../../assets/wallpapers/M2MacBookProMac-min.png';
import original3 from '../../assets/wallpapers/ventura.jpg';
import nature1 from '../../assets/wallpapers/nature1.jpg';
import nature2 from '../../assets/wallpapers/nature2.jpg';
import nature3 from '../../assets/wallpapers/nature3.jpg';
import nature4 from '../../assets/wallpapers/nature4.jpg';
import nature5 from '../../assets/wallpapers/nature5.jpg';
import random1 from '../../assets/wallpapers/random1.jpg';
import random2 from '../../assets/wallpapers/random2.jpg';
import random3 from '../../assets/wallpapers/random3.jpg';
import dog1 from '../../assets/wallpapers/dog1.jpg';
import dog2 from '../../assets/wallpapers/dog2.jpg';

const { background } = storeToRefs(useBackgroundStore())

const theme = useTheme().name

const dialog = ref(false)
const items = ref([
  {
    elements: [
      {
        title: 'Wi-Fi',
        icon: 'material-symbols:wifi',
        color: 'blue-600'
      },
      {
        title: 'Bluetooth',
        icon: 'material-symbols:bluetooth',
        color: 'blue-600'
      },
      {
        title: 'Network',
        icon: 'gis:network-o',
        color: 'blue-600'
      },
    ],
  },
  {
    elements: [
      {
        title: 'Notifications',
        icon: 'mdi:bell-badge',
        color: 'orange-500'
      },
      {
        title: 'Sound',
        icon: 'emojione-monotone:speaker-high-volume',
        color: 'red-600'
      },
      {
        title: 'Focus',
        icon: 'bi:moon-fill',
        color: 'indigo-600'
      },
      {
        title: 'Screen Time',
        icon: 'bi:hourglass-split',
        color: 'indigo-600'
      },
    ],
  },
  {
    elements: [
      {
        title: 'General',
        icon: 'clarity:settings-line',
        color: 'neutral-400'
      },
      {
        title: 'Appearance',
        icon: 'gg:dark-mode',
        color: 'black'
      },
      {
        title: 'Accessibility',
        icon: 'iconoir:accessibility',
        color: 'blue-600'
      },
      {
        title: 'Control Center',
        icon: 'icon-park-outline:switch-button',
        color: 'neutral-400'
      },
      {
        title: 'Siri & Spotlight',
        icon: 'noto:moai',
        color: 'black'
      },
      {
        title: 'Privacy & Security',
        icon: 'ion:hand-left-sharp',
        color: 'blue-600'
      },
    ],
  },
])
const backgrounds = ref([
  {
    title: "Original wallpapers",
    images: [
      original1,
      original2,
      original3,
    ]
  },
  {
    title: "Nature",
    images: [
      nature1,
      nature2,
      nature3,
      nature4,
      nature5,
    ]
  },
  {
    title: "Random",
    images: [
      random1,
      random2,
      random3,
    ]
  },
  {
    title: "Dogs",
    images: [
      dog1,
      dog2,
    ]
  },
])

const setBackground = (image) => {
  if (image !== background.value) {
    background.value = image
  }
}
</script>

<style>
.v-field__outline {
  border-radius: 8px !important;
}
</style>