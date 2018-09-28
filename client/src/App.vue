<template>
<div class="grid">
  <Header class="grid__header"/>
  <aside class="grid__sprite"></aside>
  <GraphForm class="grid__form">
    <div class="quote"><span class="quote__speaker">Kaiki Ahiru</span>quote</div>
  </GraphForm>
</div>
</template>

<script>
import Header from './Header.vue';
import GraphForm from './GraphForm.vue';
export default {
  name: 'App',
  components: { Header, GraphForm }
}
</script>

<style>
:root {
  --body-font: 'Merriweather', serif;
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
}

.grid__header {
  grid-area: header;
}

.grid__sprite {
  grid-area: sprite;
  justify-self: end;

  display: flex;
  flex: 1 0 auto;
  width: 100%;
  max-width: calc(100vh * 14/29); 
  background-image: url(tech-chan-sketch.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
}

.grid__form {
  grid-area: form;
  justify-self: start;

  width: 100%;
}

.quote {
  max-width: 500px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 6px 12px;
  width: 100%
}

.quote__speaker {
  display: block;
}
</style>
