import App from './App.vue';
import states from './states.js';

const store = new Vuex.Store({
  state: {
    ...states.idle(),
    historyItems: []
  },
  mutations: {
    loadHistory(state, history) {
      if (history) state.historyItems = history;
      else state.historyItems = [];
    },
    storeResult(state, result) {
      state.historyItems.push(result);
    },
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
    },
    returnFromHistory(state) {
      state = Object.assign(state, states.returnFromHistory());
    }
  },
  actions: {
    fetchPointResult({ commit }, { r, x, y }) {
      commit('waitingForResult');

      const resultDelayMillis = 900;
      const fetchStartMillis = Date.now();

      fetch(`/areaCheck?r=${r}&x=${x}&y=${y}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => {
          if (!response.ok) { throw response }
          return response.text();
        })
        .then((result) => {
          const delay = Math.max(0, fetchStartMillis + resultDelayMillis - Date.now());
          return new Promise((resolve) => setTimeout(() => resolve(result), delay));
        })
        .then((delayedResult) => {
          if (delayedResult === 'true') commit('resultInside');
          else commit('resultOutside');

          commit('storeResult', { r, x, y, status: delayedResult === 'true' });
        });
    }
  }
});

//Vue.use(vueMq, {
//  breakpoints: {
//    mobile: 685,
//    desktop: Infinity
//  }
//});

new Vue({
  el: '#app',
  store,
  components: { App },
  render: (h) => h(App),
  beforeMount() {
    store.commit('loadHistory', JSON.parse(document.getElementById("app").dataset.history));
  }
});
