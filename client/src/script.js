export const SCRIPT_CUTSCENE = 'SCRIPT_CUTSCENE';
export const SCRIPT_DIALOGUE = 'SCRIPT_DIALOGUE';
export const SCRIPT_GRAPH = 'SCRIPT_GRAPH';
export const SCRIPT_RELATIONSHIP_UP_END_DAY = 'SCRIPT_RELATIONSHIP_UP_END_DAY';
export const SCRIPT_RELATIONSHIP_DOWN_END_DAY = 'SCRIPT_RELATIONSHIP_DOWN_END_DAY';
export const SCRIPT_RELATIONSHIP_NONE_END_DAY = 'SCRIPT_RELATIONSHIP_NONE_END_DAY';
export const SCRIPT_TEST_END_DAY = 'SCRIPT_TEST_END_DAY';

const SPRITE_IDLE = '/assets/kaiki-chan-idle.png';
const SPRITE_ANGRY = '/assets/kaiki-chan-angry.png';
const SPRITE_THINKING = '/assets/kaiki-chan-thinking.png';
const SPRITE_BLUSHING = '/assets/kaiki-chan-blushing.png';
const SPRITE_SLEEPING = '/assets/kaiki-chan-sleeping.png';
const SPRITE_SLEEPING_ZZZ = '/assets/kaiki-chan-sleeping-zzz.png';
const SPRITE_ZZZ = '/assets/zzz.png';
const SPRITE_PROM_INV = '/assets/prom-invitation.png';
const SPRITE_EMPTY_GRAPH = '/assets/empty-graph.svg';
const SPRITE_GRAPH_INSIDE = '/assets/graph-inside.svg';
const SPRITE_GRAPH_INSIDE_OUTSIDE = '/assets/graph-outside.svg';

export const scriptIdForDay = (day) => `DAY_${day}`;

export const screenType = (screenId) => SCRIPT[screenId] && SCRIPT[screenId].type;

export const SCRIPT = {
  GRAPH_DEFAULT: {
    type: SCRIPT_GRAPH,
    neutral: [SPRITE_IDLE, 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон.'],
    error: [SPRITE_BLUSHING, 'Прости, я задумалась... Не повторишь?'],
    end: {
      type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE, text: 'Отлично. Думаю, на сегодня хватит.',
      choices: [['Пойду, пожалуй...', SCRIPT_TEST_END_DAY]]
    },
    loading: [SPRITE_THINKING, 'Дай подумать...'],
    inside: [SPRITE_BLUSHING, 'Ты прав, точка действительно внутри... Попробуй еще один раз.'],
    outside: [SPRITE_ANGRY, 'Я устала смотреть на твои ошибки! Не могу поверить, что ты до сих пор не усвоил этот вариант.'],
    invalidField: (field, min, max) => [SPRITE_ANGRY, `Разве я не говорила тебе, что ${field.toUpperCase()} должен быть между ${min} и ${max}?`]
  },
  GRAPH_FIRST_TRY: {
    type: SCRIPT_GRAPH,
    neutral: [SPRITE_IDLE, 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон.'],
    error: [SPRITE_BLUSHING, 'Прости, я задумалась... Не повторишь?'],
    end: {
      type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE, text: 'Для первого раза ты справился очень даже неплохо. Жду тебя завтра в это же время.',
      choices: [['До встречи, Ахиру-сан.', SCRIPT_TEST_END_DAY]]
    },
    loading: [SPRITE_THINKING, 'Давай посмотрим...'],
    inside: [SPRITE_BLUSHING, 'Ты прав, точка действительно внутри... Поставь еще одну.'],
    outside: [SPRITE_IDLE, 'Не торопись, подумай и поставь точку так, чтобы она попадала в полигон'],
    invalidField: (field, min, max) => [SPRITE_IDLE, `Не спеши, помни, что ${field.toUpperCase()} должен быть между ${min} и ${max}.`]
  },
  GRAPH_SLEEPING: {
    type: SCRIPT_GRAPH,
    neutral: [SPRITE_ZZZ, '*спит*'],
    error: [SPRITE_ZZZ, 'Мм?'],
    end: {
      type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE, text: '*трет глаза* Смотрю, ты и без меня уже справляешься.',
      choices: [['Да... Пойду домой, и тебе советую, отдохнешь получше.', SCRIPT_TEST_END_DAY]]
    },
    loading: [SPRITE_ZZZ, '...'],
    inside: [SPRITE_ZZZ, '*улыбается во сне*'],
    outside: [SPRITE_ZZZ, '*хмурится*'],
    invalidField: (field, min, max) => [SPRITE_ZZZ, `*бормочит что-то про ${field.toUpperCase()} и числа ${min} и ${max}*`]
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
    choices: [['Хорошо...', SCRIPT_RELATIONSHIP_NONE_END_DAY]]
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
    text: 'Смотри: у тебя есть чертеж, на нем координатные оси и линии. Посмотри на рисунок и скажи, что из этого получается.',
    choices: [['...', 'DAY_2_3']]
  },
  DAY_2_3: {
    type: SCRIPT_CUTSCENE, sprite: SPRITE_EMPTY_GRAPH,
    text: 'Хмм, никаких осей здесь нет. Только две стрелочки и...',
    choices: [
      ['Фигура из линий', 'DAY_2_4'],
      ['План комнаты', 'DAY_2_3_WRONG']
    ]
  },
  DAY_2_3_WRONG: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '*осудительно качая головой* Подумай еще.',
    choices: [['Ладно...', 'DAY_2_3']]
  },
  DAY_2_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Правильно, они образуют фигуру, причем замкнутую, то есть полигон. Твое задание — расставить точки так, чтобы они все были внутри него.',
    choices: [['Точки?..', 'DAY_2_5']]
  },
  DAY_2_5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Просто возьми карандаш и поставь его в любое место на чертеже, а потом скажи мне, попал ли ты внутрь полигона или оказался снаружи.',
    choices: [['Понял.', 'DAY_2_6']]
  },
  DAY_2_6: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_7', sprite: SPRITE_GRAPH_INSIDE,
    text: 'Вот эта точка — внутри.'
  },
  DAY_2_7: {
    type: SCRIPT_CUTSCENE, next: 'DAY_2_8', sprite: SPRITE_GRAPH_INSIDE_OUTSIDE,
    text: 'А вот эта — снаружи.'
  },
  DAY_2_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Все верно. Попробуешь решить настоящий вариант?',
    choices: [
      ['Да, давай', 'GRAPH_FIRST_TRY'],
      ['Знаешь, я немного устал...', 'DAY_2_9']
    ]
  },
  DAY_2_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Понимаю, нужно время, чтобы это усвоить. Увидимся завтра.',
    choices: [['Договорились.', SCRIPT_RELATIONSHIP_NONE_END_DAY]]
  },
  /* Layer 03 */
  DAY_3: {
    type: SCRIPT_CUTSCENE, next: 'DAY_3_1',
    text: 'Ну и попал. Я уже вижу, как день за днем сижу, согнувшись над листочком, и выслушиваю поучения Ахиру-сан...'
  },
  DAY_3_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_3_2',
    text: 'Нет, так дело не пойдет. Надо найти с ней что-то общее, иначе к концу занятий мы начнем друг друга ненавидеть.'
  },
  DAY_3_2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Надеюсь, ты помнишь, что мы вчера учили?',
    choices: [
      ['Более-менее.', 'DAY_3_A'],
      ['Да, и я как раз хотел спросить...', 'DAY_3_B']
    ]
  },
  /* Layer 03. Branch A */
  DAY_3_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Хорошо, вот, держи сегодняшний вариант.',
    choices: [['Постараюсь решить его сам.', 'GRAPH_DEFAULT']]
  },
  /* Layer 03. Branch B */
  DAY_3_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Это как-то относится к нашему занятию?',
    choices: [['Нет, но...', 'DAY_3_B1']]
  },
  DAY_3_B1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_3_B2',
    text: 'И почему я заранее не подумал о том, что скажу дальше?'
  },
  DAY_3_B2: {
    type: SCRIPT_CUTSCENE, text: 'Что сказать, что сказать, что сказать?',
    choices: [['— Ты смотрела вчерашнюю серию ДжоДжо?', 'DAY_3_B3']]
  },
  DAY_3_B3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '... ... ...',
    choices: [['...', 'DAY_3_B4']]
  },
  DAY_3_B4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_THINKING,
    text: 'Какими еще бесполезными вещами ты занимаешься?',
    choices: [
      ['А-а ты не думала, что сериалы — тоже в каком-то роде математика?', 'DAY_3_B4_A'],
      ['Ну, не математикой уж точно.', 'DAY_3_B4_B']
    ]
  },
  /* Layer 03. Branch B -> branch B (quick fail) */
  DAY_3_B4_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Что ты сказал?! Я вообще-то на тебя свободное время трачу, мог бы хоть немного уважения проявить!',
    choices: [['Думаю, сегодня нам не о чем больше говорить.', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  /* Layer 03. Branch B -> branch A. */
  DAY_3_B4_A: {
    type: SCRIPT_DIALOGUE, next: 'DAY_3_B4_A1',
    text: 'Что я только что сказал?..',
  },
  DAY_3_B4_A1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_THINKING,
    text: 'Хмм, продолжай.',
    choices: [
      ['Ну, весь сюжет можно представить... Представить графом переходов между устойчивыми состояниями!', 'DAY_3_B4_A2'],
      ['З-знаешь, давай лучше позанимаемся.', 'GRAPH_DEFAULT']
    ]
  },
  DAY_3_B4_A2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '...Откуда ты знаешь про графы переходов?',
    choices: [
      ['Я это только что придумал..?', 'DAY_3_B4_A3'],
      ['Не стоит меня недооценивать.', 'DAY_3_B4_A3']
    ]
  },
  DAY_3_B4_A3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Лучше бы ты на учебу свою энергию направил! Мысль интересная, но я бы кое-что уточнила...',
    choices: [['Мм?', 'DAY_3_B4_A4']]
  },
  DAY_3_B4_A4: {
    type: SCRIPT_CUTSCENE, text: 'Тик-так, тик-так, тик-так',
    choices: [['Тик-так', 'DAY_3_B4_A5']]
  },
  DAY_3_B4_A5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '...И вот что я хотела уточнить про теорию графов. Есть вопросы?',
    choices: [['У-уф, мне кажется, за окном стемнело.', 'DAY_3_B4_A6']]
  },
  DAY_3_B4_A6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Что-то я заговорилась... Давно такого не было.',
    choices: [['Все хорошо. Увидимся завтра!', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },
  /* Layer 07 */
  DAY_7: {
    type: SCRIPT_CUTSCENE, next: 'DAY_7_1', sprite: SPRITE_PROM_INV,
    text: ''
  },
  DAY_7_1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'На что ты там уставился?',
    choices: [
      ['*протянуть листовку*', 'DAY_7_А'],
      ['Что ЭТО такое???', 'DAY_7_B'],
      ['А почему день 15?', 'DAY_7_C']
    ]
  },
  /* Layer 07. Branch A */
  DAY_7_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Это не похоже на решение задачи, что я должна там увидеть?',
    choices: [['У тебя... Уже есть планы?', 'DAY_7_A2']]
  },
  DAY_7_A2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Х-хватит говорить о глупостях!.. Тем более, не сдашь тест — всё равно на бал не пойдешь. Доставай уже тетрадь!',
    choices: [['...', 'GRAPH_DEFAULT']]
  },
  /* Layer 07. Branch B */
  DAY_7_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Это называется Осенняя трата времени, ты что, захотел пойти?',
    choices: [['У тебя... Уже есть планы?', 'DAY_7_A2']]
  },
  /* Layer 07. Branch C */
  DAY_7_C: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '...Ты безнадежен.',
    choices: [
      ['*протянуть листовку*', 'DAY_7_А'],
      ['Что ЭТО такое???', 'DAY_7_B']
    ]
  },
  /* Layer 08 */
  DAY_8: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_1',
    text: 'Похоже, она не собирается на бал... Что, если ей просто не с кем идти?'
  },
  DAY_8_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_2',
    text: 'Надо набраться смелости и пригласить её.'
  },
  DAY_8_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_3',
    text: 'А вдруг она откажет? Я же всю оставшуюся неделю не смогу смотреть ей в глаза...'
  },
  DAY_8_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '*задумчиво смотрит перед собой*',
    choices: [['Ахиру-сан?', 'DAY_8_4']]
  },
  DAY_8_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Прости, я задумалась. Твой вариант лежит на парте. Обращайся, если будут вопросы.',
    choices: [['...', 'DAY_8_5']]
  },
  DAY_8_5: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_6',
    text: 'Что же это такое? Никак не могу сосредоточиться и решить хотя бы что-нибудь…'
  },
  DAY_8_6: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_7',
    text: 'Резкий стук в окно заставил меня подпрыгнуть. Через стекло на меня смотрел воробей. Каики даже не пошевелилась, продолжая вертеть в руке брелок.'
  },
  DAY_8_7: {
    type: SCRIPT_CUTSCENE, next: 'DAY_8_8',
    text: 'Комнату будто целиком заполнил неосуществившийся разговор, густой и едкий, как табачный дым.'
  },
  DAY_8_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '*задумчиво смотрит перед собой*',
    choices: [['Ахиру-сан?', 'DAY_8_9']]
  },
  DAY_8_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Прости, я задумалась. У тебя появился вопрос?',
    choices: [
      ['Ты переживаешь из-за бала, не так ли?', 'DAY_8_10'],
      ['Ты не могла бы мне помочь с графом?', 'GRAPH_DEFAULT']
    ]
  },
  DAY_8_10: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Почему-то такие вещи всегда заставляют меня нервничать. Прости, если вела себя слишком резко с тобой',
    choices: [['Нервничать? Но почему? Ты, должно быть, очень популярна…', 'DAY_8_11']]
  },
  DAY_8_11: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Ты так думаешь? Боюсь, ты будешь разочарован.',
    choices: [['Но… Твоё фото висит в холле на первом этаже, ты староста лучшего класса, я о таком только мечтать могу.', 'DAY_8_12']]
  },
  DAY_8_12: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Я никогда не была популярной в твоем понимании. Наверное, просто не стремилась к этому',
    choices: [['И поэтому тебе не по душе идея с балом?', 'DAY_8_13']]
  },
  DAY_8_13: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Идея с балом просто глупа. Притвориться на один день, что мы лучше, чем есть на самом деле - какой в этом толк? Все равно на следующий день пойдем на занятия, как раньше.',
    choices: [['Тебе не кажется, что это прекрасная возможность наладить отношения с одноклассниками?', 'DAY_8_14']]
  },
  DAY_8_14: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ты думаешь, мне это интересно? Снова тебя разочарую',
    choices: [['Может тебе просто не с кем пойти?', 'DAY_8_15']]
  },
  DAY_8_15: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'А тебе-то что?',
    choices: [['Просто интересно...', 'DAY_8_16']]
  },
  DAY_8_16: {
    type: SCRIPT_CUTSCENE, next: SCRIPT_RELATIONSHIP_NONE_END_DAY,
    text: 'Мне слабо верится, что она совсем не заинтересована в этом балу, пожалуй, она не откровенна со мной'
  },
  /* Layer 09 */
  DAY_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Доброе утро! Приступим?',
    choices: [['*зевает* Да, давай', 'DAY_9_1']]
  },
  DAY_9_1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Не выспался?',
    choices: [
      ['Нет, все в порядке', 'GRAPH_DEFAULT'],
      ['Знаешь, сегодня ночью я прошел Дум в хард режиме!', 'DAY_9_2']
    ]
  },
  DAY_9_2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'О, я смотрю ты страшно горд собой?',
    choices: [['Да, знаю, что ты скажешь - опять занимался глупостями', 'DAY_9_3']]
  },
  DAY_9_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Именно',
    choices: [['Прости, я не могу похвастаться таким же количеством заслуг как у тебя. Но я прошел Дум в харде, и да, я горд собой', 'DAY_9_4']]
  },
  DAY_9_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'А знаешь, мне однажды удалось покормить белку с рук в городском парке',
    choices: [['Что?', 'DAY_9_5']]
  },
  DAY_9_5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ну, ты знал, что в нашем парке живут белки?',
    choices: [['Эмм, нет...', 'DAY_9_6']]
  },
  DAY_9_6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ну вот, потому что их немного и они прячутся. А мне однажды удалось покормить одну, прямо с рук, представляешь? Правда, пришлось полдня просидеть под деревом с орешками в руках, но оно того стоило!',
    choices: [['Я читал, что ты была победителем государственной математической олимпиады - и ты гордишься тем, что покормила белку?', 'DAY_9_7']]
  },
  DAY_9_7: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Крайне милую белку, это важно. Пойдем, покажу, где это было?',
    choices: [['Пойдем!', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },
  /* Layer 10 */
  DAY_10: {
    type: SCRIPT_CUTSCENE, next: 'DAY_10_1',
    text: 'Уже не первый раз просыпаю свой будильник, но так мрачно утро еще не складывалось.'
  },
  DAY_10_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_10_2',
    text: 'На улице — толпа, что не пройти, автобус, который обычно задерживается, конечно же приехал раньше и показал мне свой оранжевый хвост...'
  },
  DAY_10_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_10_3',
    text: 'И чем я разгневал богов? Надеюсь, хоть Ахиру-сан я не сильно разозлю.'
  },
  DAY_10_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Я приготовила новый граф, в следующий раз уж не опаздывай.',
    choices: [
      ['А у нас вроде занятия не по расписанию', 'DAY_10_SAD_TROMBONE'],
      ['Да, конечно, прости...', 'DAY_10_4']
    ]
  },
  DAY_10_SAD_TROMBONE: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'А ведь ты прав. Тогда я пойду домой!',
    choices: [['Как пожелаешь', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  DAY_10_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ох, ну ты и даешь...',
    choices: [['А?', 'DAY_10_5']]
  },
  DAY_10_5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Мятая рубашка, пятно на рукаве, а на голове вообще что?! Ты в зеркало перед выходом смотрел?',
    choices: [
      ['Я вообще стараюсь в зеркало лишний раз не смотреть...', 'DAY_10_6'],
      ['Прости, я просто спешил на занятие', 'DAY_10_6'],
    ]
  },
  DAY_10_6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Оно и видно… Дай сюда, поправлю',
    choices: [['*уф*', 'DAY_10_7']]
  },
  DAY_10_7: {
    type: SCRIPT_CUTSCENE, next: 'DAY_10_8',
    text: 'Оу, к такому я был не готов...'
  },
  DAY_10_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'И не зазнавайся, я просто не могу на это смотреть!',
    choices: [['Х-хорошо...', 'DAY_10_9']]
  },
  DAY_10_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Вот, так-то лучше. Ты хоть позавтракал?',
    choices: [['Н-нет.', 'DAY_10_10']]
  },
  DAY_10_10: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '*глубоко вздыхая* Пойду, поставлю чайник, принесу пирожных.',
    choices: [
      ['Спасибо...', 'DAY_10_11'],
      ['Мне не нужны твои пироженки, какими бы сладкими они у тебя не были!', 'DAY_10_AMERICAN_CHOPPER']
    ]
  },
  DAY_10_AMERICAN_CHOPPER: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'В таком случае, можешь идти домой!',
    choices: [['Отлично!', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  DAY_10_11: {
    type: SCRIPT_CUTSCENE, next: SCRIPT_RELATIONSHIP_UP_END_DAY,
    text: 'Очень вкусные пирожные, интересно, Ахиру-сан сама их приготовила?'
  }
};
