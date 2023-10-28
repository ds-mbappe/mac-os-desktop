<template>
  <v-menu :close-on-content-click="closeOnContentCLick">
    <template #activator="{ props }">
      <div v-bind="props">
        <slot name="activator">
          <dsm-button />
        </slot>
      </div>
    </template>

    <v-list>
      <slot name="dropdown">
        <v-list-item v-for="(item, index) in items" :key="item?.id" :value="item">
          <v-list-item-title @click="item?.onClick">
            {{ item?.title }}
          </v-list-item-title>
        </v-list-item>
      </slot>
    </v-list>
  </v-menu>
</template>

<script setup>
import DsmButton from "@/components/DsmButton.vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  closeOnContentCLick: { type: Boolean, default: true },
})
</script>