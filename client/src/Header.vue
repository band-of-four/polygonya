<template>
<header class="header">
  <a class="header__link" href="#">Polygonya</a>
  <a class="header__link" href="#" @click.prevent="$emit('toggle-about')">?</a>
</header>
</template>

<script>
export default {
  name: 'Header',
  components: {}
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
}

.header__link {
  color: var(--text-color);
  text-decoration: none;
  font: bold 24px/var(--header-height) var(--header-font);

  &:hover {
    cursor: pointer;
  }
}

.header__link--sub {
  font-size: 18px;
}
</style>
