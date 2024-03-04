<template>
  <div :id="`file_${file?.id}`"
    class="w-fit absolute select-none flex flex-col items-center justify-center rounded-[8px] pt-2 px-2"
    :class="file?.selected ? 'bg-blue-800' : 'bg-transparent'" @click="setSelectedFile"
  >
    <img :id="`file_${file?.id}`" :src="file?.logo" :aspect-ratio="1" height="100" width="100" alt="Broken file image" />

    <dsm-text
      v-if="!file?.isRenaming"
      :id="`file_${file?.id}_name`"
      xs
      medium
      color="white"
      class="max-w-[150px] mt-1 pb-1.5 px-1.5 text-center"
    >
      {{ file?.title }}
    </dsm-text>

    <v-text-field
      v-else
      v-model="file.title"
      autofocus
      hide-details
      type="text"
      variant="plain"
      density="compact"
      spellcheck="false"
      class="w-[150px] pb-1.5 text-white"
      :class="file?.isRenaming ? 'mt-3' : ''"
      @input="renameFile"
      @click.stop
    />
  </div>
</template>

<script setup>
import DsmText from '../components/DsmText.vue';

const props = defineProps({
  file: { type: Object, default: () => {} },
});

const emit = defineEmits(['set-select-file', 'set-rename-file', 'rename-file']);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && props?.file?.isRenaming) {
    emit('set-rename-file', false);
  }
});

window.addEventListener("dblclick", (e) => {
  if (e?.target?.id === `file_${props?.file?.id}_name`) {
    emit('set-rename-file', true);
  }
});

const setSelectedFile = () => {
  emit('set-select-file');
}

const renameFile = (e) => {
  emit('rename-file', e?.target?.value);
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