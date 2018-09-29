<template>
<div class="grid">
  <Header class="grid__header"/>
  <Sprite class="grid__sprite"/>
  <GraphForm class="grid__form">
    <Quote/>
  </GraphForm>
</div>
</template>

<script>
import Header from './Header.vue';
import Sprite from './Sprite.vue';
import Quote from './Quote.vue';
import GraphForm from './GraphForm.vue';

export default {
  name: 'App',
  components: { Header, Sprite, Quote, GraphForm }
}
</script>

<style>
:root {
  --body-font: 'Merriweather', serif;
  --body-sans-font: 'Merriweather Sans', sans-serif;
  --header-font: 'Gloria Hallelujah', serif;

  --header-height: 64px;

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
    [row1-start] "header header" var(--header-height) [row2-end]
    [row2-start] "sprite form" auto [row2-end]
    / 20fr 30fr;
  grid-column-gap: 4vw;

  /* Min-height is chosen such that no elements overlap
   * and scrolling is forced when the viewport is too short */
  min-height: 500px;
}

.grid__header {
  grid-area: header;
}

.grid__sprite {
  grid-area: sprite;
  justify-self: end;
}

.grid__form {
  grid-area: form;
  justify-self: start;

  width: 100%;
  height: calc(100vh - var(--header-height));
}
</style>
