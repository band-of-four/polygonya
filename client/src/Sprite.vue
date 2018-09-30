<template>
<aside class="sprite" :style="spriteStyle"></aside>
</template>

<script>
export default {
  name: 'Sprite',
  components: {},
  computed: {
    spriteStyle() {
      return { backgroundImage: `url(${this.$store.state.sprite})` };
    }
  }
}
</script>

<style>
.sprite {
  display: flex;
  flex: 1 0 auto;
  width: 100%;

  /* Max-width forces the sprite to have at least 14/31 of the height
   * visible regardless of viewport size. On narrower screens,
   * a little bit more is revealed ;) */
  max-width: calc(100vh * 14/31); 
  /* Min-width prevents the image from squashing when the viewport is
   * too short. The value is set to the computed sprite width @ 500px
   * viewport height (see the min-height property of .grid) */
  min-width: 240px;

  /* The image is set as an inline attribute */
  background: no-repeat center top/cover;
}
</style>
