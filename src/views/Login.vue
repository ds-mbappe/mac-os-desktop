<template>
  <div class="w-full h-full flex flex-col items-center justify-center select-none absolute z-[100] login" @click="toggleAnimation">
    <div class="w-auto min-w-full min-h-full max-w-none bg-contain bg-center
      flex flex-col items-center justify-center select-none absolute z-[100] login" :style="{
              'background-image': background ? `url('${background}')` : '',
              'background-size': 'cover'
            }">
      <div class="flex flex-col -translate-y-[100%]">
        <p class="text-white text-[30px] font-medium">
          {{ moment().format("dddd, MMM D") }}
        </p>
        <p class="text-white/80 font-medium text-[100px] -translate-y-5">
          {{ moment().format("HH:mm") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import moment from 'moment';
import original1 from '@/assets/wallpapers/Appearance_Light-min.png';
import original2 from '@/assets/wallpapers/M2MacBookProMac-min.png';
import original3 from '@/assets/wallpapers/ventura.jpg';
import nature1 from '@/assets/wallpapers/nature1.jpg';
import nature2 from '@/assets/wallpapers/nature2.jpg';
import nature3 from '@/assets/wallpapers/nature3.jpg';
import nature4 from '@/assets/wallpapers/nature4.jpg';
import nature5 from '@/assets/wallpapers/nature5.jpg';
import random1 from '@/assets/wallpapers/random1.jpg';
import random2 from '@/assets/wallpapers/random2.jpg';
import random3 from '@/assets/wallpapers/random3.jpg';

let images = ref([original1, original2, original3, nature1, nature2, nature3, nature4, nature5, random1, random2, random3])

const background = images?.value?.[Math.floor(Math.random() * 11)]

const toggleAnimation = () => {
  document.querySelector('.login').classList.add('clicked')
}
</script>

<style scoped>
.login {
  transition: all 0.5s ease-in-out;
}

.login.clicked {
  margin-top: -100vh;
}
</style>