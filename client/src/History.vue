<template>
<div>
  <button class="history-button" @click.prevent="$emit('close-history')">Закрыть историю</button>
  <table class="history-table">
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
.history-table {
  border-collapse: collapse;
  margin: 16px auto;

  & th {
    border: 1px solid #000;
    padding: 8px 16px;
  }
}

.history-button {
  display: block;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 0 auto;

  font-family: var(--body-font);

  &:hover {
    cursor: pointer;
  }
}
</style>
