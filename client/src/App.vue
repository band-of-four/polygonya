<template>
<div class="page">
  <Header/>
  <div class="container">
    <aside class="sprite"></aside>
    <GraphForm>
      <div class="quote"><span class="quote__speaker">Kaiki Ahiru</span>quote</div>
    </GraphForm>
  </div>
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

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  display: flex;
  justify-content: center;
  height: 100%;
}

.sprite {
  display: flex;
  justify-content: center;
  min-width: 400px;
  background-image: url(tech-chan-sketch.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
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
