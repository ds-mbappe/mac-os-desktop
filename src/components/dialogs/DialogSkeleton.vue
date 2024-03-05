<template>
  <v-dialog
    v-model="dialog"
    width="auto"
    content-class="!rounded"
    :persistent="persistent"
  >
    <template #activator="{ props }">
      <slot name="activator-div">
        <div
          v-bind="bind ? props : null"
        >
          <slot
            name="activator"
          >
            <dsm-button
              :variant="activatorVariant"
            >
              <template #button-text>
                <slot name="activator-text">
                  {{ activatorText }}
                </slot>
              </template>
            </dsm-button>
          </slot>
        </div>
      </slot>
    </template>

    <slot name="dialog">
      <div
        class="flex flex-col p-6 bg-white overflow-auto !rounded-xl text-fake-black gap-8"
        :class="[dialogVerticalClass(), dialogCustomClass]"
      >
        <div class="flex flex-col gap-4 relative">
          <slot
            name="close"
            :close="closeDialog"
          >
            <div
              v-if="displayClose"
              class="absolute right-0 top-0"
            >
              <Icon
                :icon="closeIcon"
                class="h-6 w-6 text-dark-grey hover:text-fake-black cursor-pointer"
                @click="dialog = false"
              />
            </div>
          </slot>
          <slot name="icon">
            <div
              v-if="icon"
              class="flex text-center justify-center"
            >
              <Icon
                v-if="icon"
                :icon="icon"
                :height="iconSize"
                :width="iconSize"
              />
            </div>
          </slot>

          <slot name="title">
            <div
              class="text-xl text-center font-medium text-fake-black break-words"
            >
              <slot name="title-text">
                {{ (title) }}
              </slot>
            </div>
          </slot>

          <slot name="subtitle">
            <div
              v-if="subtitle"
              class="text-sm font-semibold text-center text-dark-grey break-words"
            >
              <slot name="subtitle-text">
                {{ (subtitle) }}
              </slot>
            </div>
          </slot>

          <slot name="description">
            <div
              v-if="description"
              class="text-sm text-center text-dark-grey break-words"
            >
              <slot name="description-text">
                {{ (description) }}
              </slot>
            </div>
          </slot>

          <div v-if="withInputs" class="flex flex-col gap-4">
            <v-text-field variant="outlined" hide-details density="compact" placeholder="Input" />
            <v-text-field variant="outlined" hide-details density="compact" placeholder="Input" />
            <v-select variant="outlined" hide-details density="compact" placeholder="Input" :items="['Number 1', 'Number 2', 'Number 3']" />
          </div>

          <slot name="input" />

          <slot name="body" />
        </div>
        <slot name="actionButtons">
          <div
            v-if="secondaryButtonText || primaryButtonText"
            class="w-full gap-3"
            :class="[isMobile ? 'flex flex-col' : 'flex flex-row-reverse justify-center']"
          >
            <slot name="primary-button">
              <dsm-button
                v-if="primaryButtonText"
                variant="default"
                :disable="primaryButtonDisabled"
                :loading="primaryButtonLoading"
                :danger="primaryButtonDanger"
                :color-class="primaryButtonClass"
                @click="primaryButtonClick"
                block
              >
                <template #button-text>
                  <slot name="primary-button-text">
                    <p class="font-medium text-xs whitespace-nowrap">
                      {{ primaryButtonText }}
                    </p>
                  </slot>
                </template>
              </dsm-button>
            </slot>
            <slot name="secondary-button">
              <dsm-button
                v-if="secondaryButtonText"
                variant="outlined"
                :disable="false"
                :loading="secondaryButtonLoading"
                :danger="secondaryButtonDanger"
                :color-class="secondaryButtonClass"
                @click="secondaryButtonClick"
                block
              >
                <template #button-text>
                  <slot name="secondary-button-text">
                    <p class="font-medium text-xs whitespace-nowrap">
                      {{ secondaryButtonText }}
                    </p>
                  </slot>
                </template>
              </dsm-button>
            </slot>
          </div>
        </slot>
      </div>
    </slot>
  </v-dialog>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { Icon } from "@iconify/vue";
import DsmButton from "../DsmButton.vue";

const dialog = ref(false)

const emit = defineEmits(['clickPrimaryButton', 'clickSecondaryButton'])

defineExpose({
  dialog
})

const props = defineProps({
  bind: {
    type: Boolean,
    default: true
  },
  activatorText: {
    type: String,
    default: 'Open Dialog'
  },
  activatorVariant: {
    type: String,
    default: 'default'
  },
  icon: {
    type: String,
    default: ''
  },
  displayClose: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: false
  },
  withInputs: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: String,
    default: 'material-symbols:close'
  },
  title: {
    type: String,
    default: ''
  },
  primaryButtonClass: {
    type: String,
    default: ''
  },
  secondaryButtonClass: {
    type: String,
    default: 'border border-middle-grey bg-white text-fake-black text-xs font-medium'
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  primaryButtonDisabled: {
    type: Boolean,
    default: false,
  },
  primaryButtonLoading: {
    type: Boolean,
    default: false,
  },
  primaryButtonText: {
    type: String,
    default: ''
  },
  secondaryButtonText: {
    type: String,
    default: ''
  },
  iconSize: {
    type: Number,
    default: 32
  },
  primaryButtonDanger: {
    type: Boolean,
    default: false
  },
  secondaryButtonDanger: {
    type: Boolean,
    default: false
  },
  secondaryButtonLoading: {
    type: Boolean,
    default: false
  },
  primaryButtonCloseOnClick: {
    type: Boolean,
    default: true
  },
  secondaryButtonCloseOnClick: {
    type: Boolean,
    default: true
  },
  dialogCustomClass: {
    type: String,
    default: ''
  },
})

const isMobile = ref(false)

onMounted(() => {
  isMobile.value = window.innerWidth < 640
  window.addEventListener("resize", handleWindowResize)
})

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResize)
})

const handleWindowResize = (e) => {
  isMobile.value = e.target.innerWidth < 640
}

const dialogVerticalClass = () => {
  let customClass = ''

  if (isMobile.value) {
    customClass = '!w-full !max-w-[300px]'
  }

  return customClass
}

const closeDialog = () => {
  dialog.value = false
}

const secondaryButtonClick = () => {
  emit('clickSecondaryButton')

  if (props.secondaryButtonCloseOnClick) {
    closeDialog()
  }
}

const primaryButtonClick = () => {
  emit('clickPrimaryButton')

  if (props.primaryButtonCloseOnClick) {
    closeDialog()
  }
}
</script>
