import { defineStore } from 'pinia'
import sonoma from '../assets/sonoma.jpg'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    background: sonoma,
    folders: [
      {
        id: 1,
        title: 'Empty folder',
        selected: false,
      }
    ],
  }),
  actions: {
    changeBackground(url) {
      this.backgroundImage = url
    }
  }
})