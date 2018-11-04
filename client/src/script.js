export const GAME_CUTSCENE = 'GAME_CUTSCENE';
export const GAME_DIALOGUE = 'GAME_DIALOGUE';
export const GAME_TEST = 'GAME_TEST';

const SPRITE_IDLE = 'kaiki-chan-idle.png';
const SPRITE_ANGRY = 'kaiki-chan-angry.png';
const SPRITE_THINKING = 'kaiki-chan-thinking.png';
const SPRITE_BLUSHING = 'kaiki-chan-blushing.png';

export const GAME_SCRIPT_GRAPH_AWAIT = [
  { type: GAME_TEST, sprite: SPRITE_THINKING, text: 'Хмм, дай подумать...' }
];

export const GAME_SCRIPT_GRAPH_INSIDE = [
  { type: GAME_TEST, sprite: SPRITE_BLUSHING, text: 'Ты прав, точка действительно внутри... Попробуй еще один раз.' }
];

export const GAME_SCRIPT_GRAPH_OUTSIDE = [
  { type: GAME_TEST, sprite: SPRITE_ANGRY, text: 'Я устала смотреть на твои ошибки! Не могу поверить, что мой код пишет такой идиот. Консоль браузера открывал? Сможешь сосчитать, сколько там предупреждений, или умственных способностей не хватит?' }
];

export const GAME_SCRIPT_GRAPH_ERROR =
  { type: GAME_TEST, sprite: SPRITE_BLUSHING, text: 'Прости, я задумалась... Не повторишь?' };

export const GAME_SCRIPT_GRAPH_NEUTRAL =
  { type: GAME_TEST, sprite: SPRITE_IDLE, text: 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон.' };

export const gameScriptInvalidField = (field, min, max) => (
  { type: GAME_TEST, sprite: SPRITE_ANGRY, text: `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?` });

export const GAME_SCRIPT = {
  GAME_TEST: GAME_SCRIPT_GRAPH_NEUTRAL,

  DAY_0: {
    type: GAME_CUTSCENE, next: 'DAY_0_1',
    text: 'В новой школе все совсем не так, как в старой — учителя строже, ребята все какие-то высокомерные...'
  },
  DAY_0_1: {
    type: GAME_CUTSCENE, next: 'DAY_0_2',
    text: 'А еще две недели нужно написать этот тест по математике, а я за всю жизнь ни одной задачи сам не решил.'
  },
  DAY_0_2: {
    type: GAME_CUTSCENE, next: 'DAY_0_3',
    text: 'Сегодня я должен заниматься со старостой класса, Ахиру-сан. Надеюсь, она быстро покажет мне, как списать под носом учителя, и больше мы не увидимся.'
  },
  DAY_0_3: {
    type: GAME_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Ах, это ты, [name]? И теперь из-за этой *бормочет* я должна тратить на тебя свое время!..',
    choices: [
      { text: 'А ты, я понимаю, та самая Каики?', next: 'DAY_0_4' },
      { text: 'Эм, привет...', next: 'DAY_0_4' }
    ]
  },
  DAY_0_4: {
    type: GAME_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Что ж, приступим. Дан полигон. Ты должен расставить точки в его пределах. Уяснил?',
    choices: [
      { text: 'Мда, не могу поверить, что эта история настолько линейна.', next: GAME_TEST }
    ]
  }
};
