<template>
<div>
  <Header/>
  <aside class="sprite"></aside>
  <main class="interaction-container">
    <div class="quote"><span class="quote__speaker">Kaiki Ahiru</span>quote</div>
    <form class="graph-form">
      <label class="graph-form__label">R<input type="text" name="r" class="graph-form__input"></label>
      <label class="graph-form__label">X<input type="text" name="x" class="graph-form__input"></label>
      <label class="graph-form__label">Y<input type="text" name="y" class="graph-form__input"></label>
      <input type="submit" name="submit" value="Помоги, пожалуйста" class="graph-form__submit">
    </form>
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
.graph-form {
  margin-top: 6vw;
}
.graph-form__input {
  width: 100px;
  display: inline-block;
  border: 0px;
  text-align: right;
}
.graph-form__submit {
  margin-left: auto;
  margin-right: auto;
  display: block;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 6px 12px;
}
.graph-form__label {
  display: block;
  border: 1px solid #000;
  border-radius: 10px;
  width: 155px;
  margin-top: 2vw;
  padding: 6px 12px;
}
</style>
