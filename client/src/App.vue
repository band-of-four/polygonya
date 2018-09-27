<template>
<div>
  <Header/>
  <aside class="sprite"></aside>
  <main class="interaction-container">
    <div class="quote"><span class="quote__speaker">Kaiki Ahiru</span>quote</div>
    <GraphForm/>
  </main>
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

  --character-width: 40vw;
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

.sprite {
  position: fixed;
  top: var(--header-height);
  bottom: 0;
  left: 0;
  width: var(--character-width);
  min-width: 400px;
  padding: 0 3vw;
  display: flex;
  justify-content: center;
  background-image: url(tech-chan-sketch.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.interaction-container {
  margin-top: var(--header-height);
  margin-right: 3vw;
  margin-left: calc(var(--character-width) + 3vw);
  padding: 3vw 0;
  overflow-y: auto;
}
.quote {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 6px 12px;
  width: 100%
}
.quote__speaker {
  display: block
}
</style>
