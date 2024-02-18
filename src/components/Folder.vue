<template>
  <div :id="`folder_${folder?.id}`"
    class="w-fit absolute select-none flex flex-col items-center justify-center rounded-[8px]"
    :class="folder?.selected ? 'bg-blue-800' : 'bg-transparent'" @click="setSelectedFolder"
  >
    <div>
      <Icon icon="ic:baseline-folder" height="100" width="100" class="text-blue-400" />
    </div>

    <dsm-text
      v-if="!folder?.isRenaming"
      :id="`folder_${folder?.id}_name`"
      xs
      medium
      color="white"
      class="max-w-[150px] -mt-2 pb-1.5 px-1.5 text-center"
    >
      {{ folder?.title }}
    </dsm-text>

    <v-text-field
      v-else
      v-model="folder.title"
      autofocus
      hide-details
      type="text"
      variant="plain"
      density="compact"
      spellcheck="false"
      class="w-[150px] pb-1.5 text-white"
      @input="renameFolder"
      @click.stop
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import DsmText from '../components/DsmText.vue';

const props = defineProps({
  folder: { type: Object, default: () => {} },
});

const emit = defineEmits(['set-select-folder', 'set-rename-folder', 'rename-folder']);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && props?.folder?.isRenaming) {
    emit('set-rename-folder', false);
  }
});

window.addEventListener("dblclick", (e) => {
  if (e?.target?.id === `folder_${props?.folder?.id}_name`) {
    emit('set-rename-folder', true);
  }
});

const setSelectedFolder = () => {
  emit('set-select-folder');
}

const renameFolder = (e) => {
  emit('rename-folder', e?.target?.value);
}
</script>

<style scoped>
* :deep(.v-field) {
  border-radius: 8px;
}

* :deep(.v-field__input) {
  margin-top: -10px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;

  font-size: 12px !important;
  font-weight: 500 !important;
  
  min-height: 24px !important;

  background-color: transparent !important;
}
</style>