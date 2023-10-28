import { defineStore } from 'pinia'
import sonoma from '../assets/sonoma.jpg'

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    background: sonoma,
    type: 'image',
  }),
  actions: {
    changeBackground(url) {
      this.backgroundImage = url
    }
  }
})