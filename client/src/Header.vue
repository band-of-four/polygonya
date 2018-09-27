<template>
<header class="header">
  <a class="header__link" href="#">Polygonya</a>
  <a class="header__link" href="#">?</a>
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
  height: var(--header-height);
  margin: 0 6vw;
  display: flex;
  justify-content: space-between;
}

.header__link {
  color: var(--text-color);
  text-decoration: none;
  font: bold 24px/var(--header-height) var(--header-font);
}
</style>
