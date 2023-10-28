<template>
  <div id="contextMenu" style="display: none"
    class="w-fit h-fit flex flex-col p-1 rounded-[6px] border border-double border-white/20 select-none absolute cursor-default"
    :class="theme === 'customLightTheme' ? 'bg-white/90' : 'bg-neutral-600'">
    <div class="flex items-center justify-between rounded hover:bg-context-blue">
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

    <dialog-settings>
      <template #activator>
        <div class="flex items-center justify-between rounded hover:bg-context-blue" @click="closeContextMenu">
          <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
            {{ ("Modifier le fond d'écran...") }}
          </dsm-text>
        </div>
      </template>
    </dialog-settings>

    <v-divider class="border-opacity-100 px-2"
      :class="theme === 'customLightTheme' ? 'border-black/20' : 'border-white/75'" />

    <div class="flex items-center justify-between rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ('Organiser en piles') }}
      </dsm-text>
    </div>

    <div class="rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="flex items-center justify-between w-full h-full pl-2 py-1">
        {{ ("Trier par") }}

        <div>
          <Icon icon="mdi:chevron-right" height="16" width="16" />
        </div>
      </dsm-text>
    </div>

    <div class="flex items-center justify-between rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ('Aligner') }}
      </dsm-text>
    </div>

    <div class="rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="flex items-center justify-between w-full h-full pl-2 py-1">
        {{ ("Aligner par") }}

        <div>
          <Icon icon="mdi:chevron-right" height="16" width="16" />
        </div>
      </dsm-text>
    </div>

    <div class="flex items-center justify-between rounded hover:bg-context-blue">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ('Afficher les options de présentation') }}
      </dsm-text>
    </div>
  </div>
</template>

<script setup>
import DsmText from './DsmText.vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';
import DialogSettings from './dialogs/DialogSettings.vue';

const theme = useTheme().name

const closeContextMenu = () => {
  document.getElementById("contextMenu").style.display = 'none'
}
</script>

<style>
.back {
  background-color: rgb(var(--v-theme-textWhite), 0.6);
}
</style>