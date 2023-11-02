<template>
  <div class="w-full h-[30px] flex justify-between z-[100] overflow-hidden pl-4 bg-black/40 select-none">
    <div class="h-full flex items-center">
      <!-- Apple Logo -->
      <div class="mr-3">
        <Icon icon="ic:baseline-apple" height="23" width="23" class="text-white" />
      </div>

      <!-- Active App -->
      <dsm-text base bold class="capitalize cursor-default text-white px-3 h-full flex items-center hover:bg-black/20">
        {{ route?.name ? route?.name : 'Finder' }}
      </dsm-text>

      <!-- Active App options -->
      <div class="h-full flex items-center">
        <dsm-text v-for="item in menuItems" :key="item" sm medium
          class="capitalize cursor-default text-white px-3 h-full flex items-center hover:bg-black/20">
          {{ item }}
        </dsm-text>
      </div>
    </div>

    <div class="h-full flex items-center">
      <!-- Battery Percentage -->
      <div class="hover:bg-black/20 px-3 py-1.5">
        <Icon icon="heroicons:battery-50-solid" height="29" width="29" class="text-white" />
      </div>

      <!-- Siri -->
      <div class="hover:bg-black/20 px-3 py-1.5">
        <img :src="siri" width="18" alt="Artificial Intelligence" />
      </div>

      <!-- Dark Mode -->
      <div @click="toggleTheme" class="hover:bg-black/20 px-3 py-1.5 cursor-pointer">
        <Icon icon="gg:dark-mode" height="20" width="20" class="text-white" />
      </div>

      <!-- Date -->
      <dsm-text base medium color="white" class="hover:bg-black/10 px-3 py-1.5">
        {{ moment().format("dddd MMM D HH:mm A") }}
      </dsm-text>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import DsmText from '../components/DsmText.vue';
import siri from '../assets/siri.png';
import moment from 'moment';
import { useTheme } from 'vuetify';

const theme = useTheme()
const route = useRoute()

const menuItems = ref([
  'fichier',
  'édition',
  'présentation',
  'aller',
  'fenêtre',
  'aide',
])

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'customLightTheme' ? 'customDarkTheme' : 'customLightTheme'
}
</script>