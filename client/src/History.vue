<template>
<div class="history">
  <div class="history__controls">
    <button class="history__button" @click.prevent="$emit('close-history')">Вернуться в реальность</button>
    <button class="history__button" @click.prevent="$emit('clear-history')">Забыть все</button>
  </div>
  <table class="history__table">
    <thead>
      <tr>
        <th>R</th>
        <th>X</th>
        <th>Y</th>
        <th>Результат</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in historyItems">
        <th>{{ item.r }}</th>
        <th>{{ item.x }}</th>
        <th>{{ item.y }}</th>
        <th>{{ item.status ? 'внутри' : 'снаружи' }}</th>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  name: 'History',
  components: {},
  computed: Vuex.mapState(['historyItems'])
}
</script>

<style>
.history {
  overflow-y: auto;
}

.history__controls {
  display: flex;
  justify-content: center;
}

.history__table {
  border-collapse: collapse;
  margin: 16px auto;

  & th {
    border: 1px solid #000;
    padding: 8px 16px;
  }
}

.history__button {
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 8px;

  font-family: var(--body-font);

  &:hover {
    cursor: pointer;
  }
}
</style>
