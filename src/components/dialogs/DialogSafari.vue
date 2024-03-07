<template>
  <dialog-skeleton
    id="dialgoSafari"
    ref="dialogSafari"
    :display-close="false"
    width="65%"
    height="70%"
    :scrim="false"
  >
    <template #activator-div>
      {{ null }}
    </template>

    <template #dialog>
      <div class="h-full !rounded-[8px] flex flex-col select-none overflow-hidden shadow-md shadow-white/20 bg-transparent dark:bg-black">
        <div class="w-full min-w-[600px] h-14 flex relative px-3 justify-between border-b border-b-gray dark:border-b-[#3C3B42] bg-[#FCF8F9] dark:bg-[#3C3B42]">
          <div class="w-[18%] flex items-center justify-start gap-5">
            <div class="flex gap-2 items-center justify-center">
              <div class="w-3 h-3 rounded-full bg-red-500" @click="closeDialog" />
        
              <div class="w-3 h-3 rounded-full bg-yellow-500" />
        
              <div class="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div class="flex items-center justify-center">
              <dsm-icon-button icon="mingcute:left-line" />
  
              <dsm-icon-button icon="mingcute:right-line" />
            </div>
          </div>

          <div class="w-[49%] flex items-center justify-center gap-3">
            <dsm-icon-button icon="mdi:shield-half-full" />

            <v-text-field
              v-model="search"
              placeholder="🔍 Search something"
              variant="outlined"
              density="compact"
              autocomplete="off"
              hide-details
              color="#CDCDCD"
              class="w-full text-center"
              :center-affix="true"
              @keyup.enter="goToPage"
            />
          </div>
    
          <div class="w-[18%] flex items-center justify-end gap-3">
            <dsm-icon-button icon="material-symbols:ios-share" />
  
            <dsm-icon-button icon="mdi:plus" />

            <dsm-icon-button icon="mdi:content-copy" />
          </div>
        </div>

        <div class="w-full h-full overflow-y-auto flex flex-col gap-8 py-28 backdrop-blur-[5px] bg-[#FFFFFF82]">
          <!-- Favorites -->
          <div class="flex flex-col gap-4 w-[600px] self-center mx-auto">
            <dsm-title h2 bold class="text-black dark:text-white">
              Favorites
            </dsm-title>

            <div class="flex flex-wrap gap-3">
              <div v-for="favorite in favorites" :key="favorite?.id" class="w-[75px] flex flex-col gap-1 items-center justify-center cursor-pointer scale-100 hover:scale-[1.15] transition-all">
                <a :href="`https://${favorite?.link}`" target="_blank">
                  <div class="w-[60px] h-[60px] rounded-[8px] flex items-center justify-center" :class="favorite?.bg">
                    <Icon :icon="favorite?.logo" :height="favorite?.height" :width="favorite?.width" :color="favorite?.color" />
                  </div>

                  <dsm-text xs medium class="mt-1 text-center text-fake-black dark:text-white">
                    {{ favorite?.name }}
                  </dsm-text>
                </a>
              </div>
            </div>
          </div>

          <!-- Frequently visited -->
          <div class="flex flex-col gap-4 w-[600px] self-center mx-auto">
            <dsm-title h2 bold class="text-black dark:text-white">
              Frequently visited
            </dsm-title>

            <div class="w-full flex flex-wrap gap-4">
              <div v-for="element in visited" :key="element?.id" class="w-full h-[140px] flex-1 flex flex-col gap-1 items-start justify-center cursor-pointer scale-100 hover:scale-[1.10] transition-all">
                <a :href="element?.link" target="_blank">
                  <div class="w-full h-[125px] flex-1 rounded-[8px] overflow-hidden">
                    <img :src="element?.image" class="w-full h-full" />
                  </div>
  
                  <dsm-text xs medium class="mt-1 text-fake-black dark:text-white">
                    {{ element?.name }}
                  </dsm-text>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </dialog-skeleton>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '../../stores/general.store';
import DialogSkeleton from './DialogSkeleton.vue';
import DsmIconButton from '../DsmIconButton.vue';
import DsmTitle from '../DsmTitle.vue';
import DsmText from '../DsmText.vue';
import google from '../../assets/google.png';
import youtube from '../../assets/youtube.png';
import wikipedia from '../../assets/wikipedia.jpg';

const search = ref('')
const dialogSafari = ref(null);
const favorites = ref([
  {
    id: 0,
    name: 'Apple',
    logo: 'grommet-icons:apple',
    bg: 'bg-white',
    height: 40,
    width: 40,
    link: 'www.apple.com',
  },
  {
    id: 1,
    name: 'Facebook',
    logo: 'devicon:facebook',
    bg: '',
    height: '100%',
    width: '100%',
    link: 'www.facebook.com',
  },
  {
    id: 2,
    name: 'Instagram',
    logo: 'skill-icons:instagram',
    bg: '',
    height: '100%',
    width: '100%',
    link: 'www.instagram.com',
  },
  {
    id: 3,
    name: 'X',
    logo: 'ri:twitter-x-fill',
    bg: 'bg-black',
    color: 'white',
    height: '75%',
    width: '75%',
    link: 'www.twitter.com',
  },
  {
    id: 4,
    name: 'LinkedIn',
    logo: 'logos:linkedin-icon',
    bg: '',
    height: '100%',
    width: '100%',
    link: 'www.linkedin.com',
  },
  {
    id: 5,
    name: 'Github',
    logo: 'radix-icons:github-logo',
    bg: 'bg-black',
    color: 'white',
    height: '90%',
    width: '90%',
    link: 'www.github.com',
  },
  {
    id: 6,
    name: 'Gitlab',
    logo: 'devicon:gitlab',
    bg: 'bg-white',
    color: '',
    height: '75%',
    width: '75%',
    link: 'www.gitlab.com',
  },
  {
    id: 7,
    name: 'Tripadvisor',
    logo: 'simple-icons:tripadvisor',
    bg: '!bg-[#31E99B]',
    height: 40,
    width: 40,
    link: 'www.tripadvisor.com',
  },
  {
    id: 8,
    name: 'Airbnb',
    logo: 'logos:airbnb-icon',
    bg: 'bg-white',
    height: '75%',
    width: '75%',
    link: 'www.airbnb.com',
  },
])
const visited = ref([
  {
    id: 0,
    name: 'Google',
    image: google,
    link: 'https://www.google.com',
  },
  {
    id: 1,
    name: 'Youtube',
    image: youtube,
    link: 'https://www.youtube.com',
  },
  {
    id: 2,
    name: 'Wikipedia',
    image: wikipedia,
    link: 'https://www.wikipedia.org',
  },
])

const closeDialog = () => {
  dialogSafari.value.dialog = false;
}

const goToPage = () => {
  if (search.value) {
    let trimmed = search.value.replace(' ', '+')
    window.open(`https://www.google.com/search?q=${trimmed}`);
  }
  search.value = '';
}

defineExpose({
  dialogSafari
})
</script>

<style scoped>
* :deep(.v-field__input) {
  text-align: center !important;
  margin-top: 0px !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  color: gray !important;

  font-size: 14px !important;
  font-weight: 500 !important;
  
  min-height: 26px !important;

  background-color: transparent !important;
}
</style>