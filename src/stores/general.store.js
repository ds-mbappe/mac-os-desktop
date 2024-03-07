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

import finder from '@/assets/finder.png'
import safari from '@/assets/safari.png'
import terminal from '@/assets/terminal.png'
import messages from '@/assets/messages.png'
import maps from '@/assets/maps.png'
import contacts from '@/assets/contacts.png'
import mail from '@/assets/mail.png'
import reminders from '@/assets/reminders.png'
import notes from '@/assets/notes.png'
import settings from '@/assets/settings.png'

let images = [original1, original2, original3, nature1, nature2, nature3, nature4, nature5, random1, random2, random3, sandhand, seoul, mall, aurora]
let bottomItems = [
  {
    id: 'finder',
    logo: finder,
    width: 62,
    active: true,
  },
  {
    id: 'safari',
    logo: safari,
    width: 53,
    active: false,
    onClick: null,
  },
  {
    id: 'terminal',
    logo: terminal,
    width: 56,
    active: false,
  },
  {
    id: 'messages',
    logo: messages,
    width: 52,
    active: false,
  },
  {
    id: 'maps',
    logo: maps,
    width: 62,
    active: false,
  },
  {
    id: 'contacts',
    logo: contacts,
    width: 58,
    active: false,
  },
  {
    id: 'mail',
    logo: mail,
    width: 65,
    active: false,
  },
  {
    id: 'reminders',
    logo: reminders,
    width: 54,
    active: false,
  },
  {
    id: 'notes',
    logo: notes,
    width: 63,
    active: false,
  },
  {
    id: 'settings',
    logo: settings,
    width: 63,
    active: false,
  },
];

export const useGeneralStore = defineStore('general', {
  state: () => ({
    background: images?.[Math.floor(Math.random() * 15)],
    apps: [],
    folders: [],
    files: [],
    deletedElements: [],
    terminalItems: [],
    bottomItems: bottomItems,
    trashActive: false,
  }),
  actions: {
    changeBackground(url) {
      this.backgroundImage = url
    }
  }
})