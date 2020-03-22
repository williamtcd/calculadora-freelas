<template>
  <v-app>
    <div style="background-image: url('img/background.jpg'); opacity: 0.9; background-size: cover; position: absolute; 
  width: 100%; 
  height: 100%; filter:blur(2px); filter:hue-rotate(222deg);">
    </div>
    <div style="background-color: #006064; opacity: 0.7; background-size: cover; position: absolute; 
  width: 100%; 
  height: 100%; filter:blur(2px);">
    </div>
    <v-content>
      <Calculadora/>
    </v-content>
    <v-footer
      color="primary lighten-1"
      padless
      >
      <v-row
        class="d-flex "
      >
        <v-col
          class="primary lighten-2 py-4 text-center white--text d-flex justify-space-between" 
          align="center"
        >
         <v-btn
          href="https://vuetifyjs.com/"
          target="_blank"
          text
        >
        <img width="32px" src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png">
        </v-btn> <v-btn
          href="https://github.com/willtavarescd/calculadora-freelas/tree/develop"
          target="_blank"
          text
        >
          <span class="mr-2">GitHub</span>
        <svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import Calculadora from './components/Calculadora';

export default {
  name: 'App',

  components: {
    Calculadora,
  },

  data: () => ({
    //
  }),
};
</script>