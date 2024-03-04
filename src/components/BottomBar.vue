<template>
  <div class="flex items-center gap-3 pt-1 pb-2 rounded-[20px] px-2 select-none"
    :class="activeTheme === 'customLightTheme' ? 'bg-white/50' : 'bg-black/50'">
    <!-- Bottom icons -->
    <dsm-tooltip
      v-for="app in bottomItems" :key="app?.id"
      :id="app?.id"
    >
      <template #activator-content>
        <div
          :id="app?.id"
          class="flex flex-col items-center justify-center relative pointer-events-none scale-100 hover:scale-125 transition-all"
        >
          <v-img
            :id="app?.id"
            :src="app?.logo"
            :aspect-ratio="1"
            :width="app?.width"
            class="mb-1"
          />

          <div v-if="app?.active" class="w-1 h-1 rounded-full bg-black absolute translate-y-[35px]" :class="activeTheme === 'customLightTheme' ? 'bg-black' : 'bg-white'" />
        </div>
      </template>

      <template #tooltip-content>
        <p class="sm medium capitalize text-white">
          {{ app?.id }}
        </p>
      </template>
    </dsm-tooltip>

    <!-- Trash -->
    <dsm-tooltip id="trash">
      <template #activator-content>
        <!-- Trash Full -->
        <div v-if="deletedElements?.length" class="flex flex-col items-center justify-center relative pointer-events-none scale-100 hover:scale-125 transition-all">
          <v-img :src="trashFull" :aspect-ratio="1" :width="58" class="mb-1" />

          <div v-if="trashActive" class="w-1 h-1 rounded-full absolute translate-y-[35px]" :class="activeTheme === 'customLightTheme' ? 'bg-black' : 'bg-white'" />
        </div>

        <!-- Trash Empty -->
        <div v-else class="flex flex-col items-center justify-center relative pointer-events-none scale-100 hover:scale-125 transition-all">
          <v-img :src="trash" :aspect-ratio="1" :width="58" class="mb-1" />

          <div v-if="trashActive" class="w-1 h-1 rounded-full absolute translate-y-[35px]" :class="activeTheme === 'customLightTheme' ? 'bg-black' : 'bg-white'" />
        </div>
      </template>

      <template #tooltip-content>
        <p class="sm medium capitalize text-white">
          {{ "Trash" }}
        </p>
      </template>
    </dsm-tooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import trash from '@/assets/trash.png'
import trashFull from '@/assets/trash_full.png'
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';
import DsmTooltip from '../components/DsmTooltip.vue';

const { deletedElements, bottomItems, trashActive, activeTheme } = storeToRefs(useGeneralStore());
</script>