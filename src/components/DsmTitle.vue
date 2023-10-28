<template>
  <h1 v-if="h1" :class="[`text-${color} text-3xl leading-10`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </h1>

  <h2 v-else-if="h2" :class="[`text-${color} text-2xl leading-8`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </h2>

  <h3 v-else-if="h3" :class="[`text-${color} text-xl leading-6`, getFontWeight(), italic ? 'italic' : '']">
    <slot>
      On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et
      empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du
      texte. Du texte.
    </slot>
  </h3>
</template>

<script setup>
const props = defineProps({
  h1: { type: Boolean, default: false },
  h2: { type: Boolean, default: false },
  h3: { type: Boolean, default: false },
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