<template>
  <dialog-skeleton
    ref="dialogTerminal"
    :display-close="false"
    :scrim="false"
  >
    <template #activator-div>
      {{ null }}
    </template>

    <template #dialog>
      <div class="w-[100%] h-[500px] !rounded-[8px] flex flex-col select-none overflow-hidden shadow-md shadow-white/20 bg-[#FCF8F9] dark:bg-black">
        <div class="w-full min-w-[600px] h-7 flex relative px-3 border-b border-b-gray">
          <div class="flex gap-2 items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-red-500" @click="closeDialog" />
      
            <div class="w-3 h-3 rounded-full bg-yellow-500" />
      
            <div class="w-3 h-3 rounded-full bg-green-500" />
          </div>
    
          <p class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-sm font-semibold mx-auto text-black dark:text-white">
            {{ `ds-mbappe@my-portfolio${terminalTitle}` }}
          </p>
        </div>
    
        <div class="w-full h-[470px] overflow-y-auto flex-col pb-1 pl-1 bg-white dark:bg-[#222433]">
          <div
            v-for="(item, index) in terminalItems"
            :key="item?.id"
            :id="item?.id?.split('-')?.[0]"
            class="flex items-center justify-start"
          >
            <p
              :id="`left_${item?.id}`"
              class="text-base font-semibold text-green-500 pl-1"
              :class="index === terminalItems?.length - 1 ? 'cursor-class-light dark:cursor-class-dark' : ''"
            >
              {{ 'ds-mbappe@my-portfolio' }}
    
              <span class="text-black dark:text-white">:</span>
              <span class="text-blue-500">{{ terminalTitle }}</span>
              <span class="text-black dark:text-white">$</span>
    
              <span class="text-base font-semibold text-black dark:text-white">
                {{ item?.text }}
              </span>
            </p>
          </div>
    
          <v-text-field
            id="textFieldTerminal"
            v-model="text"
            autofocus
            autocomplete="off"
            hide-details
            type="text"
            variant="plain"
            density="compact"
            spellcheck="false"
            class="mb-40"
            @click.stop
            @blur="setFocusAgain"
            @update:model-value="updateItem"
          />
        </div>
      </div>
    </template>
  </dialog-skeleton>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../../stores/general.store';
import DialogSkeleton from './DialogSkeleton.vue';

const { terminalItems } = storeToRefs(useGeneralStore());

const terminalTitle = ref('~');
const text = ref(null);
const dialogTerminal = ref(null);

const updateItem = () => {
  let item = terminalItems?.value?.[terminalItems?.value?.length - 1]
  item.text = text.value
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let id = uuidv4()
    terminalItems.value.push({
      id: id,
      text: '',
    });
    actions();

    text.value = '';

    setTimeout(() => {
      let addedElement = document.getElementById(`${id?.split('-')?.[0]}`);
      if (addedElement) {
        addedElement.scrollIntoView();
      }
    }, 100)
  }
});

const actions = () => {
  if (text?.value?.startsWith('cd ') && text?.value !== 'cd ..') {
    terminalTitle.value += `/${text?.value?.split('cd ')?.[1]}`
  } else if (text?.value?.startsWith('cd ') && text?.value === 'cd ..' && terminalTitle?.value?.includes('/')) {
    let lastIndexOfSlash = terminalTitle.value.lastIndexOf('/');
    terminalTitle.value = terminalTitle.value.substring(0, lastIndexOfSlash)
  } else if (text?.value === 'clear') {
    terminalItems.value = [];
    terminalItems.value.push({
      id: uuidv4(),
      text: '',
    });
    terminalTitle.value = '~';
  }
  text.value = '';
}

const closeDialog = () => {
  dialogTerminal.value.dialog = false;
}

const setFocusAgain = (e) => {
  let found = document.getElementById('textFieldTerminal');

  if (found) {
    found.focus();
  }
}

defineExpose({
  dialogTerminal
})
</script>

<style scoped>
* :deep(.v-field__input) {
  margin-top: 0px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  opacity: 0 !important;

  font-size: 16px !important;
  font-weight: 600 !important;
  
  min-height: 24px !important;

  background-color: transparent !important;
}

@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}

.cursor-class-dark::after {
  content: "";
  position: absolute;
  padding-top: 5px;
  margin-left: 1px;
  width: 8px;
  height: 20px;
  background: white;
  display: inline-block;
  animation: cursor-blink 1.4s steps(2) infinite;
}

.cursor-class-light::after {
  content: "";
  position: absolute;
  padding-top: 5px;
  margin-left: 1px;
  width: 8px;
  height: 20px;
  background: black;
  display: inline-block;
  animation: cursor-blink 1.4s steps(2) infinite;
}
</style>