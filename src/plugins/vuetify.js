// Styles
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';

// Vuetify
import { createVuetify } from "vuetify";
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'
import * as components from 'vuetify/components'
import * as labs from "vuetify/labs/components";

const customLightTheme = {
  dark: false,
  colors: {
    textWhite: '#FFFFFF',
    textBlack: '#000000',
    contextBlue: '#367ed0',
  },
}

const customDarkTheme = {
  dark: true,
  colors: {
    textWhite: '#000000',
    textBlack: '#FFFFFF',
    contextBlue: '#2070CB',
  },
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    date: {
      adapter: VuetifyDateAdapter,
    },
    theme: {
      defaultTheme: 'customDarkTheme',
      themes: {
        customLightTheme,
        customDarkTheme,
      },
    },
    components: {
      ...components,
      ...labs,
    }
  }
)