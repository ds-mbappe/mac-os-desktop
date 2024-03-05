<template>
  <div id="contextMenuRightClickContainer" style="display: none"
    class="w-[250px] h-fit flex flex-col p-1 rounded-[6px] border border-double border-white/20 select-none absolute cursor-default"
    :class="theme === 'customLightTheme' ? 'bg-white/90' : 'bg-neutral-600'">
    <div class="flex items-center justify-between rounded hover:bg-context-blue" @click="addNewFolder">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ('Nouveau dossier') }}
      </dsm-text>
    </div>

    <div class="flex items-center justify-between rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ("Coller l'élément") }}
      </dsm-text>
    </div>

    <v-divider class="border-opacity-100 px-2"
      :class="theme === 'customLightTheme' ? 'border-black/20' : 'border-white/75'" />

    <div class="flex items-center justify-between rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ('Lire les informations') }}
      </dsm-text>
    </div>
  </div>
</template>

<script setup>
import DsmText from './DsmText.vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';

const emit = defineEmits(['add-new-folder'])

const theme = useTheme().name

const addNewFolder = () => {
  emit('add-new-folder')
}
</script>

<style>
.back {
  background-color: rgb(var(--v-theme-textWhite), 0.6);
}
</style>