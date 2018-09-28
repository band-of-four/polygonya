<template>
<form class="graph-form">
  <slot></slot>
  <section class="graph-form__columns">
    <div class="graph-form__input-column">
      <label class="graph-form__label">R<input type="text" name="r" class="graph-form__input"></label>
      <label class="graph-form__label">X<input type="text" name="x" class="graph-form__input"></label>
      <label class="graph-form__label">Y<input type="text" name="y" class="graph-form__input"></label>
    </div>
    <Graph class="graph-form__graph-column"/>
  </section>
  <input type="submit" name="submit" value="Помоги, пожалуйста" class="graph-form__submit">
</form>
</template>

<script>
import Graph from './Graph.vue';
export default {
  name: 'GraphForm',
  components: { Graph }
}
</script>

<style>
.graph-form {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  align-items: center;

  padding: 6vh 0;
  max-height: 100%;
}

.graph-form__columns {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 24px 0;
}

.graph-form__input-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 24px;
}

.graph-form__graph-column {
  flex: 1 1;
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
  padding: 6px 12px;
}

.graph-form__label:not(:last-child) {
  margin-bottom: 6px;
}
</style>
