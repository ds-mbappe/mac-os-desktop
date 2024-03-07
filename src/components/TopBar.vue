<template>
  <div
    class="w-full h-[30px] flex justify-between z-[100] overflow-hidden pl-4 select-none
      bg-[#DADADA] dark:bg-black/50"
  >
    <div class="h-full flex items-center">
      <!-- Apple Logo -->
      <div class="mr-3">
        <Icon icon="ic:baseline-apple" height="23" width="23" class="text-black dark:text-white" />
      </div>

      <!-- Active App -->
      <dsm-text
        base
        semi-bold
        class="capitalize cursor-default px-3 h-full flex items-center text-black dark:text-white hover:bg-black/20"
      >
        {{ trashActive ? "Trash" : bottomItems?.find(item => item?.active)?.id }}
      </dsm-text>
    </div>

    <div class="h-full flex items-center">
      <!-- Battery Percentage -->
      <div class="hover:bg-black/20 px-3 py-1.5">
        <Icon icon="heroicons:battery-50-solid" height="29" width="29" class="text-black dark:text-white" />
      </div>

      <!-- Siri -->
      <div class="hover:bg-black/20 px-3 py-1.5">
        <img :src="siri" width="18" alt="Artificial Intelligence" />
      </div>

      <!-- Dark Mode -->
      <div @click="toggleTheme" class="hover:bg-black/20 px-3 py-1.5 cursor-pointer">
        <Icon icon="gg:dark-mode" height="20" width="20" class="text-black dark:text-white" />
      </div>

      <!-- Date -->
      <dsm-text base medium class="hover:bg-black/10 px-3 py-1.5 text-black dark:text-white">
        {{ moment().format("dddd MMM D HH:mm A") }}
      </dsm-text>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import DsmText from '../components/DsmText.vue';
import siri from '../assets/siri.png';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';

const { bottomItems, trashActive } = storeToRefs(useGeneralStore())

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}
</script>