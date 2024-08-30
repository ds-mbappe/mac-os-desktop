<template>
  <div id="dialogPdf" class="absolute w-fit max-w-[800px] h-fit max-h-[650px] !rounded-xl hidden flex-col p-0 z-50 select-none overflow-hidden border">
    <!-- Header -->
    <div class="w-full h-[25px] flex gap-1.5 items-center justify-start bg-black px-2">
      <v-hover>
        <template #default="{ isHovering, props }">
          <div v-bind="props" class="flex items-center w-3 h-3 rounded-full bg-red-500" @click="closePdfViewer">
            <Icon v-if="isHovering" icon="bx:x" width="20" height="20" class="text-black/40" />
          </div>
        </template>
      </v-hover>

      <div class="w-3 h-3 rounded-full bg-yellow-500" />

      <div class="w-3 h-3 rounded-full bg-green-500" />
    </div>

    <object data="https://www.utrecsports.org/public/upload/files/general/SP20_FW_PT_AtHome_Workouts_Strength.pdf" type="application/pdf" width="800" height="650">
      <div>No PDF viewer available</div>
    </object>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const closePdfViewer = () => {
  document.getElementById("dialogPdf").classList.remove('flex')
  document.getElementById("dialogPdf").classList.add('hidden')
}
</script>