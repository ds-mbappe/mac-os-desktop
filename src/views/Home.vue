<template>
  <div class="w-full h-full flex flex-col relative">
    <!-- Navbar -->
    <top-bar />

    <!-- Login -->
    <login />

    <!-- Content -->
    <div id="container" class="w-full h-full flex-col block relative">
      <!-- My CV in PDF Format -->
      <div
        id="folder_cv"
        class="w-fit absolute select-none flex flex-col
          items-center justify-center rounded-[8px] top-10 left-10"
        :class="cvSelected ? 'bg-blue-800' : 'bg-transparent'"
        @click="selectCv"
      >
        <div id="folder_cv">
          <Icon id="folder_cv" icon="vscode-icons:file-type-pdf2" height="100" width="100" />
        </div>

        <dsm-text id="folder_cv" xs medium color="white" class="pb-1.5">
          {{ 'CV MBAPPE' }}
        </dsm-text>
      </div>

      <!-- Other folders -->
      <folder
        v-for="folder in folders"
        :key="folder?.id"
        :folder="folder"
        @set-select-folder="setSelectedFolder(folder?.id)"
        @set-rename-folder="setRenameFolder($event, folder?.id)"
        @rename-folder="renameFolder($event, folder?.id)"
      />

      <!-- PDF View -->
      <dialog-pdf />
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
import Login from '../views/Login.vue';
import { Icon } from '@iconify/vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import RightClickMenu from '../components/RightClickMenu.vue';
import DialogPdf from '../components/dialogs/DialogPdf.vue';
import DsmText from '../components/DsmText.vue';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';
import Folder from '../components/Folder.vue';

const { folders, deletedFolders } = storeToRefs(useGeneralStore())

const windowWidth = ref(0)
const windowHeight = ref(0)
const cvSelected = ref(false)
const selectedFolder = ref(null)
const isRenamingFolder = ref(false)
const initialTitle = ref(null)

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

window.addEventListener("click", (e) => {
  if (e.target?.id === 'container') {
    for (let element of folders.value) {
      element.selected = false
      if (element?.title) {
        element.isRenaming = false
      }
    }
    isRenamingFolder.value = false
    selectedFolder.value = null
    cvSelected.value = false
  }
});

window.addEventListener("dblclick", (e) => {
  if (e?.target?.id === "folder_cv" && document.querySelector('#folder_cv')) {
    document.getElementById("dialogPdf").classList.remove('hidden')
    document.getElementById("dialogPdf").classList.add('flex')
  }
});

window.addEventListener("DOMContentLoaded", (e) => {
  windowWidth.value = document.getElementById('container').offsetWidth
  windowHeight.value = document.getElementById('container').offsetHeight - 100
  if (document.querySelector(`#folder_cv`)) {
    makeDraggable(document.querySelector(`#folder_cv`));
  }
  if (document.querySelector('#dialogPdf')) {
    makeDraggable(document.querySelector('#dialogPdf'));
  }
})

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    if (selectedFolder?.value && !isRenamingFolder?.value) {
      deleteFolder(selectedFolder?.value)
      selectedFolder.value.selected = false
      deletedFolders?.value?.push(selectedFolder.value)
    }
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (selectedFolder?.value && isRenamingFolder?.value) {
      const found = folders?.value?.find(el => el?.id === selectedFolder?.value?.id);

      if (found) {
        found.title = initialTitle?.value
        found.isRenaming = false
        isRenamingFolder.value = false
      }
    }
  }
});

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
      // element.setAttribute('style', `top: ${element.offsetTop - currentPosY}px !important`);
      element.style.top = (element.offsetTop - currentPosY) + 'px';
    }
    if (element.offsetLeft - currentPosX <= maxX && element.offsetLeft - currentPosX >= 0) {
      // element.setAttribute('style', `left: ${element.offsetLeft - currentPosX}px !important`);
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
  const found = folders?.value?.find(el => el?.id === id);

  if (found) {
    cvSelected.value = false
    for (let element of folders?.value) {
      element.selected = false
    }
    found.selected = !found.selected;
    selectedFolder.value = found
  }
}

const setRenameFolder = (isRenaming, id) => {
  const found = folders?.value?.find(el => el?.id === id);

  if (found) {
    isRenamingFolder.value = isRenaming
    found.isRenaming = isRenaming
    initialTitle.value = found?.title
  }
}

const renameFolder = (value, id) => {
  const found = folders?.value?.find(el => el?.id === id);

  if (found) {
    found.title = value
  }
}

const selectCv = () => {
  for (let element of folders.value) {
    element.selected = false
  }
  cvSelected.value = true
}

const addNewFolder = () => {
  const randomId = Math.floor(Math.random() * 10000)

  let x = Math.random() * (windowWidth.value - 150)
  let y = Math.random() * (windowHeight.value - 150)

  folders.value.push({
    id: randomId,
    title: 'New Folder',
    selected: false,
    isRenaming: false,
    x: x,
    y: y,
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