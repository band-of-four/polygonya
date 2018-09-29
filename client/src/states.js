export default {
  idle() {
    return {
      sprite: 'static/tech-chan-sketch.png',
      quote: 'Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе.'
    };
  },
  errorMissingField({ field }) {
    return {
      sprite: 'static/tech-chan-sketch.png',
      quote: `А ${field.toUpperCase()} не забыл? :/`
    };
  },
  errorOutOfRange({ field, min, max }) {
    return {
      sprite: 'static/tech-chan-sketch.png',
      quote: `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?`
    }
  }
};