<template>
<form class="graph-form" @submit.prevent="processGraphForm" novalidate="true">
  <slot></slot>
  <section class="graph-form__columns">
    <div class="graph-form__input-column">
      <div class="graph-form__field">
        <label class="graph-form__label">R</label>
        <input type="number" step="0.1" v-model="r" name="r" class="graph-form__input" autofocus="true">
      </div>
      <div class="graph-form__field">
        <label class="graph-form__label">X</label>
        <input type="number" step="0.1" v-model="x" name="x" class="graph-form__input">
      </div>
      <div class="graph-form__field">
        <label class="graph-form__label">Y</label>
        <input type="number" step="0.1" v-model="y" name="y" class="graph-form__input">
      </div>
    </div>
    <Graph class="graph-form__graph-column"/>
  </section>
  <input type="submit" name="submit" value="Помоги, пожалуйста" class="graph-form__submit">
</form>
</template>

<script>
import Graph from './Graph.vue';

const fieldConstraints = [
  { field: 'r', min: 1.0, max: 5.0 },
  { field: 'x', min: -3.0, max: 5.0 },
  { field: 'y', min: -5.0, max: 5.0 }
];

export default {
  name: 'GraphForm',
  components: { Graph },
  data: {
    r: '',
    x: '',
    y: ''
  },
  methods: {
    ...Vuex.mapMutations(['errorMissingField', 'errorOutOfRange']),
    processGraphForm() {
      for (const field of ['r', 'x', 'y']) {
        if (!this[field]) return this.errorMissingField({ field });
      }

      for (const constraint of fieldConstraints) {
        const { field, min, max } = constraint;
        const val = parseFloat(this[field]);
        if (val < min || val > max) return this.errorOutOfRange(constraint);
      }

      console.log({ r: this.r, x: this.x, y: this.y });
    }
  }
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

.graph-form__field {
  position: relative;
}

.graph-form__field:not(:last-child) {
  margin-bottom: 12px;
}

.graph-form__label {
  position: absolute;
  line-height: 33px;
  left: 12px;
}

.graph-form__input {
  width: 120px;
  display: inline-block;
  padding: 8px 8px 8px 30px;

  border: 1px solid black;
  border-radius: 8px;

  font-family: var(--body-sans-font);
  text-align: right;
}

.graph-form__submit {
  display: block;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;

  font-family: var(--body-font);

  &:hover {
    cursor: pointer;
  }
}
</style>
