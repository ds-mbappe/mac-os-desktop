import { defineStore } from 'pinia'
import sonoma from '../assets/sonoma.jpg'

export const useBackgroundStore = defineStore('background', {
  state: () => ({
    background: sonoma,
  }),
  actions: {
    changeBackground(url) {
      this.backgroundImage = url
    }
  }
})