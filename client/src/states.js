export default {
  idle() {
    return {
      sprite: 'static/kaiki-chan-idle.png',
      quote: 'Снова ты?! Вот идиот, даже не можешь график прочитать... Ну, раз уж пришел, давай посмотрим вместе.'
    };
  },
  errorMissingField({ field }) {
    return {
      sprite: 'static/kaiki-chan-angry.png',
      quote: `А ${field.toUpperCase()} не забыл? :/`
    };
  },
  errorOutOfRange({ field, min, max }) {
    return {
      sprite: 'static/kaiki-chan-angry.png',
      quote: `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?`
    };
  },
  waitingForResult() {
    return {
      sprite: 'static/kaiki-chan-thinking.png',
      quote: 'Хмм, дай подумать...'
    };
  },
  resultInside() {
    return {
      sprite: 'static/kaiki-chan-blushing.png',
      quote: 'Я всё посчитала, и, знаешь, кажется, точка внутри... Только не смей зазнаваться теперь!'
    };
  },
  resultOutside() {
    return {
      sprite: 'static/kaiki-chan-angry.png',
      quote: 'Хей, сколько можно? Опять мимо!'
    };
  },
};
