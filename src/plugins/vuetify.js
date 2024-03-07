// Styles
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';

// Vuetify
import { createVuetify } from "vuetify";
import { VuetifyDateAdapter } from 'vuetify/labs/date/adapters/vuetify'
import * as components from 'vuetify/components'
import * as labs from "vuetify/labs/components";

const theme = {
  dark: false,
  colors: {
    textWhite: '#FFFFFF',
    textBlack: '#000000',
    contextBlue: '#367ed0',
    tooltipBackground: '#000000',
    tooltipText: 'FFFFFF',
    fakeBlack: "#333333",
    darkGrey: "#787878",
    middleGrey: "#CDCDCD",
    lightGrey: "#ECECEC",
    veryLightGrey: "#F6F6F6",
  },
}

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    date: {
      adapter: VuetifyDateAdapter,
    },
    theme: {
      defaultTheme: 'theme',
      themes: {
        theme,
      },
    },
    components: {
      ...components,
      ...labs,
    }
  }
)