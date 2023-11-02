<template>
  <div class="w-full h-full flex flex-col relative">
    <!-- Navbar -->
    <top-bar />

    <!-- Login -->
    <login />

    <!-- Content -->
    <div id="container" class="w-full h-full flex-col block relative">
      <div v-for="folder in folders" :key="folder?.id" :id="`folder_${folder?.id}`"
        class="w-fit absolute select-none flex flex-col items-center justify-center rounded-[8px]"
        :class="folder?.selected ? 'bg-blue-800' : 'bg-transparent'" @click="setSelectedFolder(folder?.id)">
        <div>
          <Icon icon="ic:baseline-folder" height="100" width="100" class="text-blue-400" />
        </div>

        <dsm-text xs medium color="white" class="-mt-2 pb-1.5">
          {{ folder?.title }}
        </dsm-text>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="self-center fixed bottom-4">
      <bottom-bar />
    </div>
  </div>

  <right-click-menu @add-new-folder="addNewFolder" />
</template>

<script setup>
import { ref } from 'vue';
import Login from '@/views/Login.vue';
import { Icon } from '@iconify/vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import RightClickMenu from '../components/RightClickMenu.vue';
import DsmText from '../components/DsmText.vue';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';

const { folders, deletedFolders } = storeToRefs(useGeneralStore())

const selectedFolder = ref(null)
const windowWidth = ref(0)
const windowHeight = ref(0)

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

window.addEventListener("click", (e) => {
  if (e.target?.id === 'container') {
    for (let element of folders.value) {
      element.selected = false
    }
    selectedFolder.value = null
  }
})

window.addEventListener("dblclick", (e) => {
})

window.addEventListener("DOMContentLoaded", (e) => {
  windowWidth.value = document.getElementById('container').offsetWidth
  windowHeight.value = document.getElementById('container').offsetHeight - 100
  if (document.querySelector(`#folder_1`)) {
    makeDraggable(document.querySelector(`#folder_1`));
  }
})

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    if (selectedFolder?.value) {
      deleteFolder(selectedFolder?.value)
      selectedFolder.value.selected = false
      deletedFolders?.value?.push(selectedFolder.value)
    }
  }
})

function hideMenu() {
  document.getElementById("contextMenu")
    .style.display = "none"
}

function rightClick(e) {
  e.preventDefault();

  if (document.getElementById("contextMenu").style.display == "block") {
    hideMenu();
  } else {
    var menu = document.getElementById("contextMenu")
    menu.style.display = 'block';
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
  }
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
    var maxY = WinH - element.offsetHeight - 150
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

const setSelectedFolder = (id) => {
  const found = folders.value?.find(el => el?.id === id);

  if (found) {
    for (let element of folders.value) {
      element.selected = false
    }
    found.selected = !found.selected;
    selectedFolder.value = found
  }
}

const addNewFolder = () => {
  const randomId = Math.floor(Math.random() * 10000)

  folders.value.push({
    id: randomId,
    title: 'New Folder',
    selected: false,
  })

  setTimeout(() => {    
    var folder = document.getElementById(`folder_${randomId}`)
    folder.style.left = Math.random() * (windowWidth.value - 150) + 'px'
    folder.style.top = Math.random() * (windowHeight.value - 150) + 'px'
  
    makeDraggable(document.querySelector(`#folder_${randomId}`));
  }, 50);
}

const deleteFolder = (id) => {
  folders.value?.splice?.(folders?.value?.findIndex(el => el.id == id), 1)
}
</script>

<style scoped>
.selected {
  background-color: rgb(30, 64, 175);
}
</style>