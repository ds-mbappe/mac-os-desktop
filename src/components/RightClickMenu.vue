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

    <div class="flex items-center justify-between rounded hover:bg-context-blue" @click="closeContextMenu">
      <dsm-text xs color="text-black hover:text-white" class="w-full h-full pl-2 pr-6 py-1">
        {{ ("Modifier le fond d'écran...") }}
      </dsm-text>
    </div>
    <!-- <dialog-settings>
      <template #activator>
      </template>
    </dialog-settings> -->

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

  <dialog-settings />
</template>

<script setup>
import DsmText from './DsmText.vue';
import { Icon } from '@iconify/vue';
import { useTheme } from 'vuetify';
import DialogSettings from './dialogs/DialogSettings.vue';

const theme = useTheme().name

const closeContextMenu = () => {
  document.getElementById("customDialog").classList.remove('hidden')
  document.getElementById("customDialog").classList.add('flex')

  makeDraggable(document.querySelector('#customDialog'));

  document.getElementById("contextMenu").style.display = 'none'
}

function makeDraggable(element) {
  // Make an element draggable (or if it has a .window-top class, drag based on the .window-top element)
  let currentPosX = 0, currentPosY = 0, previousPosX = 0, previousPosY = 0;

  // Otherwise, move the element itself
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    // Prevent any default action on this element (you can remove if you need this element to perform its default action)
    e.preventDefault();
    // Get the mouse cursor position and set the initial previous positions to begin
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    // When the mouse is let go, call the closing event
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // Prevent any default action on this element (you can remove if you need this element to perform its default action)
    e.preventDefault();
    // Calculate the WIdth and the Height of the Window
    var WinX = document.documentElement.clientWidth || document.body.clientWidth
    var WinH = document.documentElement.clientHeight || document.body.clientHeight
    // Calculate the max ditance the dialog can Go in each axis
    var maxX = WinX - element.offsetWidth - 1
    var maxY = WinH - element.offsetHeight - 98
    // Calculate the new cursor position by using the previous x and y positions of the mouse
    currentPosX = previousPosX - e.clientX;
    currentPosY = previousPosY - e.clientY;
    // Replace the previous positions with the new x and y positions of the mouse
    previousPosX = e.clientX;
    previousPosY = e.clientY;
    // Set the element's new position
    if (element.offsetTop - currentPosY <= maxY && element.offsetTop - currentPosY >= 0) {
      element.style.top = (element.offsetTop - currentPosY) + 'px';
    }
    if (element.offsetLeft - currentPosX <= maxX && element.offsetLeft - currentPosX >= 0) {
      element.style.left = (element.offsetLeft - currentPosX) + 'px';
    }
  }

  function closeDragElement() {
    // Stop moving when mouse button is released and release events
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
</script>

<style>
.back {
  background-color: rgb(var(--v-theme-textWhite), 0.6);
}
</style>