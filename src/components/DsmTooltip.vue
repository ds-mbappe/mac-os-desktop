<template>
  <v-tooltip
    :location="location"
    :origin="origin"
    :content-class="[activeTheme === 'customDarkTheme' ? '!bg-black/50' : '!bg-white/50', '!w-fit !max-w-[250px] !p-2 !rounded-lg']"
    attach
  >
    <template #activator="{ props }">
      <div
        :id="id"
        v-bind="props"
        class="cursor-pointer"
      >
        <slot name="activator-content">
          Hover me
        </slot>
      </div>
    </template>

    <template #default>
      <span class="!text-sm !font-normal">
        <slot name="tooltip-content">
          {{ tooltipText }}
        </slot>
      </span>
    </template>
  </v-tooltip>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../stores/general.store';

const { activeTheme } = storeToRefs(useGeneralStore())

const props = defineProps({
  id: { type: String, default: null },
  location: { type: String, default: "top center" },
  origin: { type: String, default: "bottom center" },
  contentClass: { type: String, default: '' },
  tooltipText: { type: String, default: "This is just a tooltip, but lorem ipsum am sir dolot" },
})
</script>