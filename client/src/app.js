import App from './App.vue';
import states from './states.js';

const store = new Vuex.Store({
  state: states.idle(),
  mutations: {
    errorMissingField(state, payload) {
      state = Object.assign(state, states.errorMissingField(payload));
    },
    errorOutOfRange(state, payload) {
      state = Object.assign(state, states.errorOutOfRange(payload));
    }
  }
});

new Vue({
  el: '#app',
  store,
  components: { App },
  render: (h) => h(App)
});
