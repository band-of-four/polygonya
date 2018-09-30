<template>
<div class="history">
  <slot></slot>
  <section v-for="item in historyItems">
    R: {{ item.r }}, X: {{ item.x }}, Y: {{ item.y }} is {{ item.result ? 'inside the polygon' : 'outside the polygon' }}
  </section>
</div>
</template>

<script>
export default {
  name: 'History',
  components: {},
  computed: Vuex.mapState(['historyItems'])
}
</script>
