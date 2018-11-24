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

  /* Layer 01 */
  DAY_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_1',
    text: 'В новой школе все совсем не так, как в старой — учителя строже, ребята все какие-то высокомерные...'
  },
  DAY_1_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_2',
    text: 'А еще две недели нужно написать этот тест по математике, а я за всю жизнь ни одной задачи сам не решил.'
  },
  DAY_1_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_3',
    text: 'Сегодня я должен заниматься со старостой класса, Ахиру-сан. Надеюсь, она быстро покажет мне, как списать под носом учителя, и больше мы не увидимся.'
  },
  DAY_1_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Решил прийти сегодня пораньше? Это хорошо. Чем быстрее мы начнем, тем скорее я освобожусь и займусь своими делами.',
    choices: [
      ['Просто расскажи, как списать, и ты освободишься еще раньше.', 'DAY_1_A'],
      ['Зачем мне это все? Я и сам справлюсь.', 'DAY_1_B']
    ]
  },
  /* Layer 01. Branch A */
  DAY_1_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Так. Я должна подготовить тебя к тесту, и я это сделаю, хочешь ты того или нет.',
    choices: [['Ты правда думаешь, что мне нужна математика?', 'DAY_1_A1']]
  },
  DAY_1_A1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Как глупо. Математика — это язык логики, а логическое объяснение есть всему, что нас окружает. Тебе окружающий мир не интересен?',
    choices: [
      ['Живут же люди как-то и без этого...', 'DAY_1_A1_A'],
      ['Ты говоришь прямо как наши учителя.', 'DAY_1_A1_B'],
    ]
  },
  DAY_1_A1_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'А ты не равняйся на кого попало.',
    choices: [['Будешь мне жизненные уроки давать?', 'DAY_1_A2']]
  },
  DAY_1_A1_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'А тебе стоит к ним хоть иногда прислушиваться.',
    choices: [['Будешь мне жизненные уроки давать?', 'DAY_1_A2']]
  },
  DAY_1_A2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Знаешь, я не вижу смысла продолжать этот разговор. Приходи завтра и будь сразу готов к занятию.',
    choices: [['Как скажешь.', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },
  /* Layer 01. Branch B */
  DAY_1_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Не слишком ли ты самоуверен? Вот, держи простенький вариант. Я посижу здесь, подожду тебя.',
    choices: [
      ['Давай сюда!', 'DAY_1_B1'],
      ['Не волнуйся, ждать тебе не придется.', 'DAY_1_B1']
    ]
  },
  DAY_1_B1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_B2',
    text: 'Кажется, я погорячился… Как решить — понятия не имею, а пустой лист отдать стыдно.'
  },
  DAY_1_B2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_1_B3',
    text: 'Поставлю наугад, а там посмотрим.'
  },
  DAY_1_B3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Мда, такого я от тебя не ожидала. Иди-ка ты домой, подумай над собой хорошенько, а завтра начнем с нуля.',
    choices: [['Хорошо...', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },
  /* Layer 02 */
  DAY_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_1',
    text: 'Неужели она заставит меня заниматься с ней все эти две недели?..'
  },
  DAY_2_1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Доброе утро, Анон. Готов к занятию?',
    choices: [
      ['*кивнуть*', 'DAY_2_2'],
      ['Я хотел кое-что спросить...', 'DAY_2_1_FALSE_HOOK'],
    ]
  },
  DAY_2_1_FALSE_HOOK: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Давай я сначала объясню тебе задание, а потом ты задашь свой вопрос.',
    choices: [['Ладно...', 'DAY_2_2']]
  },
  DAY_2_2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Смотри: у тебя есть чертеж, на него нанесены координатные оси. На каком-то расстоянии от них проложены линии. Посмотри на рисунок и скажи, что из этого получается.',
    choices: [['...', 'DAY_2_3']]
  },
};

/* Yes I'm aware this is a hack */
SCRIPT.DAY_0 = SCRIPT.DAY_1;

