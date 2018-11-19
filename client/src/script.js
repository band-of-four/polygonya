export const SCRIPT_CUTSCENE = 'SCRIPT_CUTSCENE';
export const SCRIPT_DIALOGUE = 'SCRIPT_DIALOGUE';
export const SCRIPT_GRAPH = 'SCRIPT_GRAPH';
export const SCRIPT_RELATIONSHIP_UP_END_DAY = 'SCRIPT_RELATIONSHIP_UP_END_DAY';
export const SCRIPT_RELATIONSHIP_DOWN_END_DAY = 'SCRIPT_RELATIONSHIP_DOWN_END_DAY';

const SPRITE_IDLE = '/assets/kaiki-chan-idle.png';
const SPRITE_ANGRY = '/assets/kaiki-chan-angry.png';
const SPRITE_THINKING = '/assets/kaiki-chan-thinking.png';
const SPRITE_BLUSHING = '/assets/kaiki-chan-blushing.png';
const SPRITE_SLEEPING = '/assets/kaiki-chan-sleeping.png';
const SPRITE_SLEEPING_ZZZ = '/assets/kaiki-chan-sleeping-zzz.png';

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
    text: 'Как же хорошо я сегодня поспал! Еще и сон такой приятный приснился.'
  },
  DAY_1_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_1',
    text: 'Вот решу все задачи и заставлю Каики мной гордиться!'
  },
  DAY_1_1: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: '*зевает*',
    choices: [
      { text: 'Бодрого утра! Доставай вариант, я готов', next: 'DAY_1_A1' },
      { text: 'Засиделась с уроками?', next: 'DAY_1_B1' }
    ]
  },
  DAY_1_A1: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Я рада твоему энтузиазму... *медленно протягивает листок, потягивается*',
    choices: [
      { text: 'Ох, ща нарешаю!', next: 'DAY_1_2' },
      { text: 'Так-так, что тут у нас?', next: 'DAY_1_2' }
    ]
  },
  DAY_1_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_3',
    text: '...Каики?'
  },
  DAY_1_3: {
    type: SCRIPT_CUTSCENE,
    text: '...Во сне она выглядит такой милой.',
    sprite: SPRITE_SLEEPING,
    choices: [
      { text: 'Может, укрою ее?', next: 'DAY_1_4' },
      { text: 'Не буду ее беспокоить, позанимаюсь сам.', next: 'DAY_1_4' }
    ]
  },
  DAY_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_1',
    text: 'Трудно...'
  }
};
