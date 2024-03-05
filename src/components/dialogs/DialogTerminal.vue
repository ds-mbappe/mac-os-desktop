<template>
  <div
    id="dialog_terminal"
    class="absolute w-[600px] h-[500px] !rounded-[8px] hidden flex-col select-none overflow-hidden shadow-md shadow-white/20"
    :class="activeTheme === 'customLightTheme' ? 'bg-[#FCF8F9]' : 'bg-black'"
  >
    <div
      id="dialog_container"
      class="w-full h-7 flex relative px-3"
      :class="activeTheme === 'customLightTheme' ? 'border-b border-b-gray' : 'first-letter:'"
    >
      <div class="flex gap-2 items-center justify-center">
        <div class="w-3 h-3 rounded-full bg-red-500" @click="closeTerminal" />
  
        <div class="w-3 h-3 rounded-full bg-yellow-500" />
  
        <div class="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <p
        id="dialog_container"
        class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-sm font-semibold mx-auto"
        :class="activeTheme === 'customLightTheme' ? 'text-black' : 'text-white'"
      >
        {{ `ds-mbappe@my-portfolio${terminalTitle}` }}
      </p>
    </div>

    <div
      id="dialog_container"
      class="w-full h-[470px] overflow-y-auto flex-col pb-1 pl-1"
      :class="activeTheme === 'customLightTheme' ? 'bg-white' : 'bg-[#222433]'"
    >
      <div
        v-for="(item, index) in terminalItems"
        :key="item?.id"
        :id="item?.id?.split('-')?.[0]"
        class="flex items-center justify-start"
      >
        <p
          :id="`left_${item?.id}`"
          class="text-base font-semibold text-green-500 pl-1"
          :class="index === terminalItems?.length - 1 ?
            activeTheme === 'customLightTheme' ? 'cursor-class-light' : 'cursor-class-dark' : ''"
        >
          {{ 'ds-mbappe@my-portfolio' }}

          <span :class="activeTheme === 'customLightTheme' ? 'text-black' : 'text-white'">:</span>
          <span class="text-blue-500">{{ terminalTitle }}</span>
          <span :class="activeTheme === 'customLightTheme' ? 'text-black' : 'text-white'">$</span>

          <span
            class="text-base font-semibold"
            :class="activeTheme === 'customLightTheme' ? 'text-black' : 'text-white'"
          >
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
        @update:model-value="updateItem"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../../stores/general.store';

const { activeTheme, terminalItems } = storeToRefs(useGeneralStore());

const terminalTitle = ref('~');
const text = ref(null);

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
      addedElement.scrollIntoView();
    }, 100)
  }
});

const actions = () => {
  if (text?.value?.startsWith('cd ') && text?.value !== 'cd ..') {
    terminalTitle.value += `/${text?.value?.split('cd ')?.[1]}`
  } else if (text?.value?.startsWith('cd ') && text?.value === 'cd ..' && terminalTitle?.value?.includes('/')) {
    let lastIndexOfSlash = terminalTitle.value.lastIndexOf('/');
    terminalTitle.value = terminalTitle.value.substring(0, lastIndexOfSlash)
  } 
  text.value = '';
}

const closeTerminal = () => {
  let terminal = document.getElementById('dialog_terminal');
  if (terminal) {
    terminal.classList.add('hidden');
    terminal.classList.remove('flex');
  }
}
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