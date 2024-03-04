<template>
  <div class="w-full h-full flex flex-col relative">
    <!-- Navbar -->
    <top-bar />

    <!-- Login -->
    <login />

    <!-- Content -->
    <div id="container" class="w-full h-full flex-col block relative">
      <!-- My CV in PDF Format -->
      <file
        v-for="file in files"
        :key="file?.id"
        :id="`file_${file?.id}`"
        :file="file"
        @set-select-file="setSelectedFile(file)"
        @set-rename-file="setRenameFile($event, file?.id)"
        @rename-file="renameFile($event, file?.id)"
      />

      <!-- Other folders -->
      <folder
        v-for="folder in folders"
        :key="folder?.id"
        :folder="folder"
        @set-select-folder="setSelectedFolder(folder)"
        @set-rename-folder="setRenameFolder($event, folder?.id)"
        @rename-folder="renameFolder($event, folder?.id)"
      />

      <!-- PDF View -->
      <dialog-pdf />

      <!-- Dialog Terminal -->
      <dialog-terminal />
    </div>

    <!-- Bottom bar -->
    <div class="self-center fixed bottom-4">
      <bottom-bar />
    </div>
  </div>

  <right-click-menu @add-new-folder="addNewFolder" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Login from '../views/Login.vue';
import { Icon } from '@iconify/vue';
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import RightClickMenu from '../components/RightClickMenu.vue';
import DialogPdf from '../components/dialogs/DialogPdf.vue';
import DialogTerminal from '../components/dialogs/DialogTerminal.vue';
import DsmText from '../components/DsmText.vue';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';
import Folder from '../components/Folder.vue';
import File from '../components/File.vue';
import { v4 as uuidv4 } from 'uuid';

const { folders, files, deletedElements, bottomItems, trashActive, terminalItems } = storeToRefs(useGeneralStore());

onMounted(() => {
  files.value.push(cv.value);
});

// Refs
const windowWidth = ref(0)
const windowHeight = ref(0)
const selectedFolder = ref(null)
const selectedFile = ref(null)
const isRenamingFolder = ref(false)
const isRenamingFile = ref(false)
const cv = ref({
  id: 'cv',
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/267px-PDF_file_icon.svg.png",
  title: 'CV MBAPPE',
  type: 'file',
  selected: false,
  isRenaming: false,
})
const initialTitle = ref(null)

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

// Various actions related to the click
window.addEventListener("click", (e) => {
  if (e.target?.id === 'container') {
    for (let element of folders.value) {
      element.selected = false
      if (element?.title) {
        element.isRenaming = false
      }
    }
    for (let element of files.value) {
      element.selected = false
      if (element?.title) {
        element.isRenaming = false
      }
    }
    isRenamingFolder.value = false
    selectedFolder.value = null
    selectedFile.value = null
  }
  if (e.target?.id === "dialog_container") {
    document.getElementById('textFieldTerminal').focus()
  }

  if (bottomItems?.value?.map(item => item?.id)?.includes(e?.target?.id)) {
    let found = bottomItems?.value?.find(item => item?.id === e?.target?.id)
  
    if (found) {
      for (let element of bottomItems?.value) {
        element.active = false
      }
      found.active = true
      trashActive.value = false

      initTerminal(found);
    }
  }
  if (e?.target?.id === "trash") {
    for (let element of bottomItems?.value) {
      element.active = false
    }
    trashActive.value = true
  }
});

// Open Folder/file
window.addEventListener("dblclick", (e) => {
  if (e?.target?.id === "file_cv" && document.querySelector('#file_cv')) {
    document.getElementById("dialogPdf").classList.remove('hidden')
    document.getElementById("dialogPdf").classList.add('flex')
  }
});

// Make some things draggable
window.addEventListener("DOMContentLoaded", (e) => {
  windowWidth.value = document.getElementById('container').offsetWidth
  windowHeight.value = document.getElementById('container').offsetHeight - 100
  if (document.querySelector(`#file_cv`)) {
    makeDraggable(document.querySelector(`#file_cv`));
  }
  if (document.querySelector('#dialogPdf')) {
    makeDraggable(document.querySelector('#dialogPdf'));
  }
  if (document.querySelector('#dialog_terminal')) {
    makeDraggable(document.querySelector('#dialog_terminal'));
  }
});

// Copy a folder/file
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "c") {
    alert('CTRL + C');
  }
});

// Delete a folder/file
window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" || e.key === "Delete") {
    if (selectedFolder?.value && !isRenamingFolder?.value) {
      deleteElement(selectedFolder?.value)
      selectedFolder.value.selected = false
      deletedElements?.value?.push(selectedFolder.value)
    } else if (selectedFile?.value && !isRenamingFile?.value) {
      deleteElement(selectedFile?.value)
      selectedFile.value.selected = false
      deletedElements?.value?.push(selectedFile?.value)
    }
  }
});

// Unselect a folder/file with "Esc key"
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (selectedFolder?.value && isRenamingFolder?.value) {
      const found = folders?.value?.find(el => el?.id === selectedFolder?.value?.id);

      if (found) {
        found.title = initialTitle?.value
        found.isRenaming = false
        isRenamingFolder.value = false
      }
    } else if (selectedFile?.value && isRenamingFile?.value) {
      const found = files?.value?.find(el => el?.id === selectedFile?.value?.id);

      if (found) {
        found.title = initialTitle?.value
        found.isRenaming = false
        isRenamingFile.value = false
      }
    } else {
      for (let element of folders?.value) {
        element.selected = false
      }
      for (let element of files?.value) {
        element.selected = false
      }

      selectedFolder.value = null
      selectedFile.value = null
    }
  }
});

// Hide context menu
function hideMenu() {
  document.getElementById("contextMenu")
    .style.display = "none"
}

// Display context menu
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

// Make an element draggable
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

const setSelectedFolder = (folder) => {
  const found = folders?.value?.find(el => el?.id === folder?.id);

  if (found) {
    selectedFile.value = null
    for (let element of folders?.value) {
      element.selected = false
    }
    for (let element of files?.value) {
      element.selected = false
    }
    found.selected = !found.selected;
    selectedFolder.value = found
  }
}

const setSelectedFile = (file) => {
  const found = files?.value?.find(el => el?.id === file?.id);

  if (found) {
    selectedFolder.value = null;
    for (let element of files?.value) {
      element.selected = false
    }
    for (let element of folders?.value) {
      element.selected = false
    }
    found.selected = !found.selected;
    selectedFile.value = found
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

const setRenameFile = (isRenaming, id) => {
  const found = files?.value?.find(el => el?.id === id);

  if (found) {
    isRenamingFile.value = isRenaming
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

const renameFile = (value, id) => {
  const found = files?.value?.find(el => el?.id === id);

  if (found) {
    found.title = value
  }
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
    type: 'folder',
  })

  setTimeout(() => {    
    var folder = document.getElementById(`folder_${randomId}`)
    folder.style.left = Math.random() * (windowWidth.value - 150) + 'px'
    folder.style.top = Math.random() * (windowHeight.value - 150) + 'px'

    makeDraggable(document.querySelector(`#folder_${randomId}`));
  }, 50);
}

const deleteElement = (element) => {
  if (element?.type === 'folder') {
    folders.value?.splice?.(folders?.value?.findIndex(el => el.id == element?.id), 1)
  } else if (element?.type === 'file') {
    files.value?.splice?.(files?.value?.findIndex(el => el.id == element?.id), 1)
  }
}

const initTerminal = (element) => {
  if (element?.id === 'terminal') {
    let app = document.getElementById(element?.id);
    let terminal = document.getElementById('dialog_terminal');
  
    if (app && terminal) {
      terminal.classList.remove('hidden');
      terminal.classList.add('flex');
  
      if (!terminalItems?.value?.length) {
        terminalItems.value.push({
          id: uuidv4(),
          text: '',
        });
      }
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: rgb(30, 64, 175);
}
</style>