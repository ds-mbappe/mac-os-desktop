<template>
  <p v-if="base" :class="[`text-${color} text-base leading-6`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </p>

  <p v-else-if="sm" :class="[`text-${color} text-sm leading-5`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </p>

  <p v-else-if="xs" :class="[`text-${color} text-xs leading-4`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </p>

  <p v-else-if="xxs" :class="[`text-${color} text-[10px] leading-4`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </p>
</template>

<script setup>
const props = defineProps({
  base: { type: Boolean, default: false },
  sm: { type: Boolean, default: false },
  xs: { type: Boolean, default: false },
  xxs: { type: Boolean, default: false },
  bold: { type: Boolean, default: false },
  semiBold: { type: Boolean, default: false },
  medium: { type: Boolean, default: false },
  regular: { type: Boolean, default: false },
  italic: { type: Boolean, default: false },
  color: { type: String, default: 'fake-black' },
})

const getFontWeight = () => {
  if (props?.bold) {
    return '!font-bold'
  }
  else if (props?.semiBold) {
    return '!font-semibold'
  }
  else if (props?.medium) {
    return '!font-medium'
  }
  else if (props?.regular) {
    return '!font-normal'
  }
  else {
    return '!font-normal'
  }
}
</script>