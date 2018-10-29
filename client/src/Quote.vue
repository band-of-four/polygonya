<template>
  <div class="quote">
    <span class="quote__speaker">Kaiki Ahiru</span>
    {{ this.$store.state.quote }}
  </div>
</template>

<script>
export default {
  name: 'Quote',
  components: {}
}
</script>

<style>
.quote {
  max-width: 500px;
  min-height: var(--quote-height);
  margin: 0 auto;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 12px 18px;
  width: 100%
}

.quote__speaker {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.quote__content {
  margin: 12px 0 0;
}
</style>
