<template>
  <div id="dialogPdf" class="absolute w-fit max-w-[800px] h-fit max-h-[650px] !rounded-xl hidden flex-col p-3 z-50 select-none overflow-hidden border border-red-400">
    <div class="w-full h-[100px] bg-black">

    </div>

    <object data="https://www.uc.edu/content/dam/uc/ce/images/OLLI/Page%20Content/Muscular%20System%20s.pdf" type="application/pdf" width="800" height="600">
      <div>No PDF viewer available</div>
    </object>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import DsmText from '../DsmText.vue';
import DsmTitle from '../DsmTitle.vue';
import { useTheme } from 'vuetify';

const dialog = ref(true)

const theme = useTheme().name

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

const closeDialog = () => {
  document.getElementById("customDialog").classList.remove('flex')
  document.getElementById("customDialog").classList.add('hidden')
}
</script>