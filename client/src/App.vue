<template>
<div class="grid">
  <Header class="grid__header" @toggle-about="screen = (screen === 'about' ? 'graph-form' : 'about') "/>
  <Sprite class="grid__sprite"/>
  <transition name="screen-fade" mode="out-in">
    <GraphForm v-if="screen === 'graph-form'" @show-history="screen = 'history'" class="grid__main">
      <Quote/>
    </GraphForm>
    <History v-if="screen === 'history'" @close-history="closeHistory" @clear-history="clearHistory"/>
    <AboutPage v-if="screen === 'about'"/>
  </transition>
</div>
</template>

<script>
import Header from './Header.vue';
import Sprite from './Sprite.vue';
import Quote from './Quote.vue';
import GraphForm from './GraphForm.vue';
import History from './History.vue';
import AboutPage from './AboutPage.vue';

export default {
  name: 'App',
  components: { Header, Sprite, Quote, GraphForm, History, AboutPage },
  data() {
    return { screen: 'graph-form' }
  },
  methods: {
    closeHistory() {
      this.screen = 'graph-form';
      this.$store.commit('returnFromHistory');
    },
    clearHistory() {
      this.screen = 'graph-form';
      this.$store.commit('clearHistory');
      this.$store.commit('returnFromHistoryCleared');
    }
  }
}
</script>

<style>
:root {
  --body-font: 'Merriweather', serif;
  --body-sans-font: 'Merriweather Sans', sans-serif;
  --header-font: 'Gloria Hallelujah', serif;

  --header-height: 64px;
  --min-layout-height: 500px;

  --quote-height: 120px;

  --text-color: #000;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--body-font);
}

.grid {
  height: 100vh;
  padding: 0 24px;

  display: grid;
  grid:
    [row1-start] "header header" var(--header-height) [row1-end]
    [row2-start] "sprite main" auto [row2-end]
    / 20fr 35fr;
  grid-column-gap: 8px;

  /* Min-height is chosen such that no elements overlap
   * and scrolling is forced when the viewport is too short */
  min-height: var(--min-layout-height);
}

.grid__header {
  grid-area: header;
}

.grid__sprite {
  grid-area: sprite;
  justify-self: end;
}

.grid__main {
  grid-area: main;
  justify-self: start;

  width: 100%;
  height: calc(100vh - var(--header-height));
}

.screen-fade-enter-active, .screen-fade-leave-active {
  transition: opacity 0.4s;
}

.screen-fade-enter, .screen-fade-leave-to {
  opacity: 0;
}

/* JSF-specific styles
 * TODO: decouple CSS from Vue */
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: var(--min-layout-height);
  max-height: calc(80% - var(--quote-height));
}

.view__button {
  display: block;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 8px;

  font-size: 15px;
  text-decoration: none;
  color: black;

  font-family: var(--body-font);

  &:hover {
    cursor: pointer;
  }
}

.view__field {
  width: 180px;
  display: block;
  padding: 8px;
  margin-bottom: 16px;

  border: 1px solid black;
  border-radius: 8px;

  font-family: var(--body-sans-font);
}

.view__below {
  margin-top: 48px;
}

.view--overflowing {
  overflow: auto;
  margin-top: 48px;
  justify-content: flex-start;
}

.clock {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
}
</style>
