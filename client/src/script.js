export const SCRIPT_CUTSCENE = 'SCRIPT_CUTSCENE';
export const SCRIPT_DIALOGUE = 'SCRIPT_DIALOGUE';
export const SCRIPT_GRAPH = 'SCRIPT_GRAPH';
export const SCRIPT_RELATIONSHIP_UP_END_DAY = 'SCRIPT_RELATIONSHIP_UP_END_DAY';
export const SCRIPT_RELATIONSHIP_DOWN_END_DAY = 'SCRIPT_RELATIONSHIP_DOWN_END_DAY';

const SPRITE_IDLE = 'kaiki-chan-idle.png1';
const SPRITE_ANGRY = 'kaiki-chan-angry.png1';
const SPRITE_THINKING = 'kaiki-chan-thinking.png1';
const SPRITE_BLUSHING = 'kaiki-chan-blushing.png1';

export const SCRIPT_GRAPH_AWAIT = [
  { type: SCRIPT_GRAPH, sprite: SPRITE_THINKING, text: 'Хмм, дай подумать...' }
];

export const SCRIPT_GRAPH_INSIDE = [
  { type: SCRIPT_GRAPH, sprite: SPRITE_BLUSHING, text: 'Ты прав, точка действительно внутри... Попробуй еще один раз.' }
];

export const SCRIPT_GRAPH_OUTSIDE = [
  { type: SCRIPT_GRAPH, sprite: SPRITE_ANGRY, text: 'Я устала смотреть на твои ошибки! Не могу поверить, что мой код пишет такой идиот. Консоль браузера открывал? Сможешь сосчитать, сколько там предупреждений, или умственных способностей не хватит?' }
];

export const SCRIPT_GRAPH_ERROR =
  { type: SCRIPT_GRAPH, sprite: SPRITE_BLUSHING, text: 'Прости, я задумалась... Не повторишь?' };

export const SCRIPT_GRAPH_NEUTRAL =
  { type: SCRIPT_GRAPH, sprite: SPRITE_IDLE, text: 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон.' };

export const SCRIPT_GRAPH_END =
  { type: SCRIPT_GRAPH, sprite: SPRITE_IDLE, text: 'Отлично. Думаю, на сегодня хватит.' };

export const scriptGraphInvalidField = (field, min, max) => (
  { type: SCRIPT_GRAPH, sprite: SPRITE_ANGRY, text: `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?` });

export const scriptIdForDay = (day) => `DAY_${day}`;

export const SCRIPT = {
  DAY_0: {
    type: SCRIPT_CUTSCENE, next: 'DAY_0_1',
    text: 'В новой школе все совсем не так, как в старой — учителя строже, ребята все какие-то высокомерные...'
  },
  DAY_0_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_0_2',
    text: 'А еще две недели нужно написать этот тест по математике, а я за всю жизнь ни одной задачи сам не решил.'
  },
  DAY_0_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_0_3',
    text: 'Сегодня я должен заниматься со старостой класса, Ахиру-сан. Надеюсь, она быстро покажет мне, как списать под носом учителя, и больше мы не увидимся.'
  },
  DAY_0_3: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Ах, это ты, [name]? И теперь из-за этой *бормочет* я должна тратить на тебя свое время!..',
    choices: [
      { text: 'А ты, я понимаю, та самая Каики?', next: 'DAY_0_4' },
      { text: 'Эм, привет...', next: 'DAY_0_4' }
    ]
  },
  DAY_0_4: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Что ж, приступим. Дан полигон. Ты должен расставить точки в его пределах. Уяснил?',
    choices: [
      { text: 'Мда, не могу поверить, что эта история настолько линейна.', next: SCRIPT_GRAPH }
    ]
  },
  DAY_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_1',
    text: 'Тяжело...'
  },
  DAY_1_1: {
    type: SCRIPT_DIALOGUE,
    text: 'Приветствуя тебя, я соблюдаю нормы общества, в котором мы живем.',
    choices: [
      { text: 'Обнимая тебя, я сокрушаю одиночество, в котором мы живем', next: SCRIPT_RELATIONSHIP_UP_END_DAY },
      { text: 'Кивая головой, я остаюсь холодным к чувствам, скрывающимися за твоими словами', next: SCRIPT_RELATIONSHIP_DOWN_END_DAY }
    ]
  },
  DAY_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_1',
    text: 'Трудно...'
  }
};
