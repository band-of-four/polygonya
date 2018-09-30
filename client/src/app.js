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
    },
    waitingForResult(state) {
      state = Object.assign(state, states.waitingForResult());
    },
    resultInside(state) {
      state = Object.assign(state, states.resultInside());
    },
    resultOutside(state) {
      state = Object.assign(state, states.resultOutside());
    }
  },
  actions: {
    fetchPointResult({ commit }, { r, x, y }) {
      commit('waitingForResult');

      /* fetch(...).then(json) */
      const fetchResult = new Promise((resolve) =>
        setTimeout(() => resolve(true), 1000));

      fetchResult.then((result) => {
        if (result) commit('resultInside')
        else commit('resultOutside')
      });
    }
  }
});

new Vue({
  el: '#app',
  store,
  components: { App },
  render: (h) => h(App)
});
