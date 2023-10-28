<template>
  <div class="relative flex items-center  
        justify-center h-screen overflow-hidden">
    <div v-if="type === 'image'" class="absolute z-0 w-auto  
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
import { useBackgroundStore } from '@/stores/background.store.js'

const { background, type } = storeToRefs(useBackgroundStore())
</script>

<style scoped></style>
