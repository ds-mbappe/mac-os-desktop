<template>
  <div class="relative flex items-center  
        justify-center h-screen overflow-hidden">
    <div v-if="!isFIleAVideo(background)" class="absolute z-0 w-auto  
            min-w-full min-h-full max-w-none bg-contain bg-center" :style="{
              'background-image': background ? `url('${background}')` : '',
              'background-size': 'cover'
            }" />

    <video v-else :src="background" autoplay loop muted class="absolute z-0 w-auto  
            min-w-full min-h-full max-w-none">
    </video>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useGeneralStore } from '@/stores/general.store.js'

const { background } = storeToRefs(useGeneralStore())

const isFIleAVideo = (file) => {
  if (file?.split('.')?.[1] === 'mp4') {
    return true
  }
  else {
    return false
  }
}
</script>

<style scoped></style>
