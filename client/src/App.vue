<template>
<div>
  <Header/>
  <main class="character-panel">
    Tech-chan
  </main>
  <main class="interaction-panel">
    Interaction
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
    .
    <br><br><br><br>
  </main>
</div>
</template>

<script>
import Header from './Header.vue';
export default {
  name: 'App',
  components: { Header }
}
</script>

<style>
:root {
  --body-font: 'Merriweather', serif;
  --header-font: 'Gloria Hallelujah', serif;

  --character-width: 40vw;
  --header-height: 64px;

  --text-color: #000;
}

body {
  margin: 0;
  font-family: var(--body-font);
}

.character-panel {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  width: var(--character-width);
  padding: 3vw 6vw;
}

.interaction-panel {
  margin-top: var(--header-height);
  margin-right: 6vw;
  margin-left: calc(var(--character-width) + 6vw);
  padding: 3vw 0;
  overflow-y: auto;
}
</style>
