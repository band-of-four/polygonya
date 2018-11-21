export const SCRIPT_CUTSCENE = 'SCRIPT_CUTSCENE';
export const SCRIPT_DIALOGUE = 'SCRIPT_DIALOGUE';
export const SCRIPT_GRAPH = 'SCRIPT_GRAPH';
export const SCRIPT_RELATIONSHIP_UP_END_DAY = 'SCRIPT_RELATIONSHIP_UP_END_DAY';
export const SCRIPT_RELATIONSHIP_DOWN_END_DAY = 'SCRIPT_RELATIONSHIP_DOWN_END_DAY';
export const SCRIPT_TEST_END_DAY = 'SCRIPT_TEST_END_DAY';

const SPRITE_IDLE = '/assets/kaiki-chan-idle.png';
const SPRITE_ANGRY = '/assets/kaiki-chan-angry.png';
const SPRITE_THINKING = '/assets/kaiki-chan-thinking.png';
const SPRITE_BLUSHING = '/assets/kaiki-chan-blushing.png';
const SPRITE_SLEEPING = '/assets/kaiki-chan-sleeping.png';
const SPRITE_SLEEPING_ZZZ = '/assets/kaiki-chan-sleeping-zzz.png';
const SPRITE_ZZZ = '/assets/zzz.png';

export const scriptIdForDay = (day) => `DAY_${day}`;

export const screenType = (screenId) => SCRIPT[screenId].type;

export const SCRIPT = {
  GRAPH_DEFAULT: {
    type: SCRIPT_GRAPH,
    neutral: [SPRITE_IDLE, 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон.'],
    error: [SPRITE_BLUSHING, 'Прости, я задумалась... Не повторишь?'],
    end: {
      type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE, text: 'Отлично. Думаю, на сегодня хватит.',
      choices: [['Пойду, пожалуй...', SCRIPT_TEST_END_DAY]]
    },
    loading: [
      [SPRITE_THINKING, 'Хмм, дай подумать...']
    ],
    inside: [
      [SPRITE_BLUSHING, 'Ты прав, точка действительно внутри... Попробуй еще один раз.']
    ],
    outside: [
      [SPRITE_ANGRY, 'Я устала смотреть на твои ошибки! Не могу поверить, что ты до сих пор не усвоил этот вариант.']
    ],
    invalidField: (field, min, max) => (
      [SPRITE_ANGRY, `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?`]
    )
  },
  GRAPH_SLEEPING: {
    type: SCRIPT_GRAPH,
    neutral: [SPRITE_ZZZ, '*спит*'],
    error: [SPRITE_ZZZ, 'Мм?'],
    end: {
      type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE, text: '*трет глаза* Смотрю, ты и без меня уже справляешься.',
      choices: [['Да... Пойду домой, и тебе советую, отдохнешь получше.', SCRIPT_TEST_END_DAY]]
    },
    loading: [
      [SPRITE_ZZZ, '...']
    ],
    inside: [
      [SPRITE_ZZZ, '*улыбается во сне*']
    ],
    outside: [
      [SPRITE_ZZZ, '*хмурится*']
    ],
    invalidField: (field, min, max) => (
      [SPRITE_ZZZ, `*бормочит что-то про ${field.toUpperCase()} и числа ${min} и ${max}*`]
    )
  },

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
      ['А ты, я понимаю, та самая Каики?', 'DAY_0_4'],
      ['Эм, привет...', 'DAY_0_4']
    ]
  },
  DAY_0_4: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Что ж, приступим. Дан полигон. Ты должен расставить точки в его пределах. Уяснил?',
    choices: [
      ['Мда, не могу поверить, что эта история настолько линейна.', 'GRAPH_DEFAULT'],
      ['Линейна ли?.. Давай закончим этот день вместе', SCRIPT_RELATIONSHIP_UP_END_DAY]
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
      ['Бодрого утра! Доставай вариант, я готов', 'DAY_1_A1'],
      ['Засиделась с уроками?', 'DAY_1_B1']
    ]
  },
  DAY_1_A1: {
    type: SCRIPT_DIALOGUE,
    sprite: SPRITE_IDLE,
    text: 'Я рада твоему энтузиазму... *медленно протягивает листок, потягивается*',
    choices: [
      ['Ох, ща нарешаю!', 'DAY_1_2'],
      ['Так-так, что тут у нас?', 'DAY_1_2']
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
      ['Может, укрою ее?', 'DAY_1_4'],
      ['Не буду ее беспокоить, позанимаюсь сам.', 'GRAPH_SLEEPING']
    ]
  },
  DAY_1_4: {
    type: SCRIPT_CUTSCENE,
    text: 'Тик-так',
    sprite: SPRITE_SLEEPING,
    choices: [['Тик-так', 'DAY_1_4']]
  },
  DAY_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_1',
    text: 'Трудно...'
  }
};
