<template>
  <div class="w-full h-full flex flex-col relative">
    <!-- Navbar -->
    <top-bar />

    <!-- Content -->
    <div class="w-full h-full flex-col block relative">

      <!-- <p>
        Home
      </p> -->
    </div>

    <!-- Bottom bar -->
    <div class="self-center fixed bottom-4">
      <bottom-bar />
    </div>
  </div>

  <right-click-menu />
</template>

<script setup>
import TopBar from '../components/TopBar.vue';
import BottomBar from '../components/BottomBar.vue';
import RightClickMenu from '../components/RightClickMenu.vue';

document.onclick = hideMenu;
document.oncontextmenu = rightClick;

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
</script>