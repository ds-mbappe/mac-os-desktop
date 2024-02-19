import { defineStore } from 'pinia'
import original1 from '@/assets/wallpapers/Appearance_Light-min.png';
import original2 from '@/assets/wallpapers/M2MacBookProMac-min.png';
import original3 from '@/assets/wallpapers/ventura.jpg';
import nature1 from '@/assets/wallpapers/nature1.jpg';
import nature2 from '@/assets/wallpapers/nature2.jpg';
import nature3 from '@/assets/wallpapers/nature3.jpg';
import nature4 from '@/assets/wallpapers/nature4.jpg';
import nature5 from '@/assets/wallpapers/nature5.jpg';
import random1 from '@/assets/wallpapers/random1.jpg';
import random2 from '@/assets/wallpapers/random2.jpg';
import random3 from '@/assets/wallpapers/random3.jpg';
import sandhand from '@/assets/wallpapers/sandhand.mp4';
import seoul from '@/assets/wallpapers/seoul.mp4';
import aurora from '@/assets/wallpapers/aurora.mp4';
import mall from '@/assets/wallpapers/mall.mp4';

let images = [original1, original2, original3, nature1, nature2, nature3, nature4, nature5, random1, random2, random3, sandhand, seoul, mall, aurora]

export const useGeneralStore = defineStore('general', {
  state: () => ({
    background: images?.[Math.floor(Math.random() * 15)],
    apps: [],
    folders: [],
    deletedFolders: [],
  }),
  actions: {
    changeBackground(url) {
      this.backgroundImage = url
    }
  }
})