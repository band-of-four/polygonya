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
const SPRITE_SLEEPY = '/assets/kaiki-chan-sleepy.png';
const SPRITE_SLEEPING = '/assets/kaiki-chan-sleeping.png';
const SPRITE_SLEEPING_ZZZ = '/assets/kaiki-chan-sleeping-zzz.png';
const SPRITE_ZZZ = '/assets/zzz.png';
const SPRITE_SAD = '/assets/kaiki-chan-sad.png';
const SPRITE_HOT = '/assets/kaiki-chan-hot.png';
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
      type: SCRIPT_DIALOGUE, sprite: SPRITE_SLEEPY, text: '*трет глаза* Смотрю, ты и без меня уже справляешься.',
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
  /* Layer 04 */
  DAY_4: {
    type: SCRIPT_CUTSCENE, next: 'DAY_4_1',
    text: 'Занятия с Ахиру-сан оказались... Интересными?'
  },
  DAY_4_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_4_2',
    text: 'Почему-то мне не хочется опозориться перед ней завтра... Приду домой и подготовлюсь.'
  },
  DAY_4_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_4_3',
    text: '...Стоп. Заниматься математикой в свободное время? Что на меня нашло?'
  },
  DAY_4_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Я составила для тебя новый вариант.',
    choices: [['Давай сюда, я подготовился.', 'DAY_4_4']]
  },
  DAY_4_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Неужели? А давай посоревнуемся!',
    choices: [
      ['Хех, знаешь, я еще не готов', 'GRAPH_DEFAULT'],
      ['А давай!', 'DAY_4_5']
    ]
  },
  DAY_4_5: {
    type: SCRIPT_CUTSCENE, text: 'Тик-так, тик-так, тик-так',
    choices: [['Тик-так', 'DAY_4_6']]
  },
  DAY_4_6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Я не могла проиграть тебе, Анон!',
    choices: [['Да ладно тебе, это всего лишь глупое соревнование.', 'DAY_4_7']]
  },
  DAY_4_7: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Не бывает глупых соревнований, бывают глупые люди!',
    choices: [['Тише, тише, ты чего?', 'DAY_4_8']]
  },
  DAY_4_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Тебе просто повезло! Я занимаюсь математикой с детства, такой, как ты, не мог обойти меня!..',
    choices: [['Не думал, что ты так серьезно к этому относишься.', 'DAY_4_9']]
  },
  DAY_4_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'А ты бы не относился серьезно к тому, чему посвятил всю жизнь?',
    choices: [
      ['Ну, большую часть времени я занимался непонятно чем...', 'DAY_4_A'],
      ['Эм, ты странная...', 'DAY_4_B']
    ]
  },
  /* Layer 04. Neutral ending */
  DAY_4_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Так займись уже чем-нибудь!',
    choices: [['Как скажешь...', SCRIPT_RELATIONSHIP_NONE_END_DAY]]
  },
  /* Layer 04. Bad ending */
  DAY_4_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY, /* FIXME: sad sprite */
    text: 'А не пойти ли тебе домой?',
    choices: [['Как скажешь...', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  /* Layer 05 */
  DAY_5: {
    type: SCRIPT_CUTSCENE, next: 'DAY_5_1',
    text: 'В чем-то Ахиру-сан права. Просиживаю штаны целый день, пока мои лучшие годы уходят...'
  },
  DAY_5_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_5_2',
    text: 'Надо бы посмотреть, что интересного происходит в школе. По-моему, где-то у входа была доска с плакатами.',
  },
  DAY_5_2: {
    type: SCRIPT_CUTSCENE,
    text: 'Ого, у чирлидеров открытая тренировка! Только мне немного неловко заявиться туда, никого не зная...',
    choices: [
      ['...Нет, лучше сосредоточусь на занятиях', 'DAY_5_TEST'],
      ['Не попросить ли Ахиру-сан помочь мне?', 'DAY_5_3']
    ]
  },
  DAY_5_TEST: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ну, что. Новый день, новый вариант. Поехали?',
    choices: [['Всегда готов, Ахиру-сан.', 'GRAPH_DEFAULT']]
  },
  DAY_5_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ну, что. Новый день, новый вариант. Поехали?',
    choices: [['Погоди. Ты слышала, завтра у чирлидеров будет открытая тренировка?', 'DAY_5_4']]
  },
  DAY_5_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Да, и что с того?',
    choices: [['Пойдешь?', 'DAY_5_5']]
  },
  DAY_5_5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Даже если бы я хотела сделать какую-нибудь глупость, я предпочла бы... Всё, что угодно, но не это.',
    choices: [
      ['Оу, извини. Давай лучше вернемся к занятиям.', 'GRAPH_DEFAULT'],
      ['А что, чирлидеры решают графы быстрее тебя?', 'DAY_5_YOU_DIED'],
      ['Прости, я не хотел тебя расстроить.', 'DAY_5_6'],
    ]
  },
  DAY_5_YOU_DIED: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Не пойти ли тебе домой, умник?',
    choices: [['Как скажешь.', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  DAY_5_6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Да ничего, я сама завелась зря.',
    choices: [['Капитан чирлидеров, наверное, красавица... Знаешь её?', 'DAY_5_7']]
  },
  DAY_5_7: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: '...или не зря.',
    choices: [['Я подумал, что ты смогла бы нас завтра познакомить.', 'DAY_5_8']]
  },
  DAY_5_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Лучше бы о тесте думал, а не об этой!.. *бормочет*',
    choices: [
      ['О, так ты знаешь ее?', 'DAY_5_9'],
      ['Прости, конечно, ты права. Давай займемся делами.', 'GRAPH_DEFAULT']
    ]
  },
  DAY_5_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Мы в одном классе с ней. По правде говоря, старостой должна была быть она, но...',
    choices: [['Но?', 'DAY_5_10']]
  },
  DAY_5_10: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'У неё и так забот полно — я решила помочь и взять эту обязанность на себя.',
    choices: [['Вот как. Значит, она твоя подруга?', 'DAY_5_11']]
  },
  DAY_5_11: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Подруга?!! Она, может, и менее бесполезна на общем фоне, но тесно общаться мы не стали бы никогда!',
    choices: [['Менее... бесполезна?', 'DAY_5_12']]
  },
  DAY_5_12: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Я не могу не признать её талант к точным наукам... Мы учились в одном математическом лицее, я знаю, на что она способна.',
    choices: [['Почему же вы тогда не ладили?', 'DAY_5_13']]
  },
  DAY_5_13: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING, /* TODO sad sprite */
    text: 'Мне стыдно признаваться, но я не останавливалась ни перед чем, чтобы доказать, что упорный труд важнее природных способностей...',
    choices: [['Ни перед чем?..', 'DAY_5_14']]
  },
  DAY_5_14: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING, /* TODO sad sprite */
    text: 'Последнее, что помню — как занижала результаты её тестов, когда помогала учителю их проверять—',
    choices: [['...', 'DAY_5_14']]
  },
  DAY_5_14: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING, /* TODO sad sprite */
    text: 'Как глупо, глупо, глупо! Стыдно об этом вспоминать...',
    choices: [['...', 'DAY_5_15']]
  },
  DAY_5_15: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING, /* TODO sad sprite */
    text: 'Если ты не против, продолжим занятия завтра.',
    choices: [['Да, конечно.', 'DAY_5_16']]
  },
  DAY_5_16: {
    type: SCRIPT_CUTSCENE, next: SCRIPT_RELATIONSHIP_UP_END_DAY,
    text: 'Она выглядела совсем расстроеной... Может, придумать что-нибудь, чтобы поднять ей настроение завтра?'
  },
  /* Layer 06 */
  DAY_6: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Здравствуй. Доставай тетрадь, сегодня душно, хочу закончить побыстрее.',
    choices: [
      ['*достает тетрадь*', 'GRAPH_DEFAULT'],
      ['Знаешь, у меня есть идея получше—', 'DAY_6_1']
    ]
  },
  DAY_6_1: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: '...',
    choices: [
      ['А, не обращай внимания...', 'GRAPH_DEFAULT'],
      ['Может, откроем окно?', 'DAY_6_YOU_THOUGHT_WERE_BRANCHING_BUT_NOPE'],
      ['Не хочешь пройтись, подышать воздухом?', 'DAY_6_2']
    ]
  },
  DAY_6_YOU_THOUGHT_WERE_BRANCHING_BUT_NOPE: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Ты думаешь, я бы не догадалась сама?..',
    choices: [
      ['Прости, я не заметил, что оно открыто.', 'GRAPH_DEFAULT'],
      ['Тогда давай позанимаемся в парке.', 'DAY_6_2']
    ]
  },
  DAY_6_2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ты зовешь меня на прогулку?',
    choices: [
      ['Прости, что-то и на меня жара подействовала... Давай заниматься.', 'GRAPH_DEFAULT'],
      ['А ты сможешь мне отказать?', 'DAY_6_YOU_DIED'],
      ['Да.', 'DAY_6_3']
    ]
  },
  DAY_6_YOU_DIED: {
    type: SCRIPT_CUTSCENE, text: 'А рука у Ахиру-сан тяжелая... Надеюсь, синяка не останется.',
    next: SCRIPT_RELATIONSHIP_DOWN_END_DAY
  },
  DAY_6_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ладно, иногда ты предлагаешь не совсем бесполезные вещи... Ну, пойдем, пройдемся.',
    choices: [['Го.', 'DAY_6_4']]
  },
  DAY_6_4: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Здесь и правда свежее— *урчание*',
    choices: [
      ['Кажется, я что-то слышал. Ты что-то сказала?', 'DAY_6_YOU_DIED'],
      ['О, ты проголодалась? Я знаю кафешку за углом.', 'DAY_6_4'],
    ]
  },
  DAY_6_5: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Пойдем.',
    choices: [['Го.', 'DAY_6_6']]
  },
  DAY_6_6: {
    type: SCRIPT_CUTSCENE, next: 'DAY_6_7',
    text: 'Над дверью прозвенел колокольчик. Надо же, это место со вчера совсем не изменилось...',
  },
  DAY_6_7: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Я нечасто бываю в таких местах... Даже не знаю, как себя вести.',
    choices: [
      ['Не переживай, я тебе все покажу.', 'DAY_6_8'],
      ['Доверься мне.', 'DAY_6_8'],
    ]
  },
  DAY_6_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Тогда я найду нам место.',
    choices: [
      ['Я пока принесу нам онигири.', 'DAY_6_9'],
      ['Я вернусь с тайяки.', 'DAY_6_9'],
    ]
  },
  DAY_6_9: {
    type: SCRIPT_CUTSCENE, next: 'DAY_6_10',
    text: 'В очереди меня настигли сомнения...',
  },
  DAY_6_10: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Ох, это так вкусно~',
    choices: [['Может, займемся теперь математикой?', 'DAY_6_11']]
  },
  DAY_6_11: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: '*с набитым ртом* Знаешь, я покушала, и мне та-а-ак лениво и хорошо...',
    choices: [['Ты же говорила, что редко бываешь в таких местах?', 'DAY_6_12']]
  },
  DAY_6_12: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Я предпочитаю есть в тишине, чужая болтовня меня отвлекает.',
    choices: [
      ['А наша болтовня тебе больше не кажется чужой?', 'DAY_6_A'],
      ['Может, пойдем дальше, если тебе не комфортно?', 'DAY_6_B'],
    ]
  },
  DAY_6_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Пожалуй...',
    choices: [['*улыбнуться*', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },
  DAY_6_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_BLUSHING,
    text: 'Нет, сейчас все хорошо...',
    choices: [['*улыбнуться*', SCRIPT_RELATIONSHIP_UP_END_DAY]]
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
  },
  /* Layer 11 */
  DAY_11: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_1',
    text: 'Дождь еще с ночи льет как из ведра. Месяц назад я и подумать не мог, что побегу в школу в такую погоду'
  },
  DAY_11_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_2',
    text: 'В такие дни я всегда чувствую себя подавленным'
  },
  DAY_11_2: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_3',
    text: 'Особенно, когда нужно выходить из дома'
  },
  DAY_11_3: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Приветики! Ну, что, готов сегодня позаниматься продуктивно?',
    choices: [
      ['Да, конечно, давай', 'GRAPH_DEFAULT'],
      ['Какое там...', 'DAY_11_4']
    ]
  },
  DAY_11_4: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_5',
    text: 'Каики сегодня прямо светится...'
  },
  DAY_11_5: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_6',
    text: 'Конечно, это определенным образом компенсирует мрачность на улице, но...'
  },
  DAY_11_6: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_7',
    text: 'Каким образом ей это удается?'
  },
  DAY_11_7: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Что такое? Ты сегодня какой-то мрачный',
    choices: [
      ['Ничего страшного, давай позанимаемся', 'GRAPH_DEFAULT'],
      ['Ветренно...', 'DAY_11_8']
    ]
  },
  DAY_11_8: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ну, у нас это нормально для этого времени года...',
    choices: [['Да и вообще, столько всего навалилось', 'DAY_11_9']]
  },
  DAY_11_9: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Понимаю тебя, бывает трудно',
    choices: [
      ['Куда тебе, у тебя всегда всё отлично!', 'DAY_11_THIS_IS_SO_SAD'],
      ['Но, похоже, ты справляешься довольно хорошо', 'DAY_11_10']
    ]
  },
  DAY_11_THIS_IS_SO_SAD: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'А вот и нет, придурок!',
    choices: [['Пойду домой...', SCRIPT_RELATIONSHIP_DOWN_END_DAY]]
  },
  DAY_11_10: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Нужно найти способ избавляться от негативной энергии',
    choices: [['И каков же твой, если не секрет?', 'DAY_11_11']]
  },
  DAY_11_11: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Да нет, не секрет, просто никто особо не интересовался. Я люблю плавать',
    choices: [['Вау... П-плавать?..', 'DAY_11_FANSERVICE']]
  },
  DAY_11_FANSERVICE: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_12', sprite: SPRITE_HOT,
    text: '*~*'
  },
  DAY_11_12: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_ANGRY,
    text: 'Идиот, о чём ты там замечтался!?',
    choices: [['П-прости, я тут...', 'DAY_11_13']]
  },
  DAY_11_13: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_IDLE,
    text: 'Ладно, заниматься сегодня ты все равно не готов. Может, выпьем чаю?',
    choices: [
      ['Ну уж нет, у нас много дел', 'DAY_11_PRESS_F'],
      ['Конечно, ставлю чайник', 'DAY_11_14']
    ]
  },
  DAY_11_PRESS_F: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_SAD,
    text: 'Да, ты прав...',
    choices: [['Тогда не будем терять времени', 'GRAPH_DEFAULT']]
  },
  DAY_11_14: {
    type: SCRIPT_CUTSCENE, next: 'DAY_11_15',
    text: 'Никогда бы не подумал, что такое ужасное утро может вести к такому прекрасному дню'
  },
  DAY_11_15: {
    type: SCRIPT_CUTSCENE, next: SCRIPT_RELATIONSHIP_UP_END_DAY,
    text: 'Всё-таки, Ахиру-сан особенная...'
  },
  /* Layer 12 */
  DAY_12: {
    type: SCRIPT_CUTSCENE, next: 'DAY_12_1',
    text: 'Я так хорошо спал сегодня, такой приятный сон снился...'
  },
  DAY_12_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_12_2',
    text: 'Сегодня я решу все задачи правильно и заставлю Ахиру-сан мной гордиться.'
  },
  DAY_12_2: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_SLEEPY,
    text: '*зевает*',
    choices: [
      ['Бодрого утра! Доставай граф, я готов', 'DAY_12_A'],
      ['Засиделась с уроками?', 'DAY_12_B']
    ]
  },
  /* Layer 12. Branch A */
  DAY_12_A: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_SLEEPY,
    text: 'Я рада твоему энтузиазму *медленно протягивает листок, потягивается*',
    choices: [
      ['Ох, ща нарешаю!', 'DAY_12_3'],
      ['Так-так, что тут у нас?', 'DAY_12_3']
    ]
  },
  /* Layer 12. Branch B */
  DAY_12_B: {
    type: SCRIPT_DIALOGUE, sprite: SPRITE_SLEEPY,
    text: 'Какая тебе разница? Займись своими проблемами.',
    choices: [['Ну я же волнуюсь...', 'DAY_12_3']]
  },
  DAY_12_3: {
    type: SCRIPT_CUTSCENE, next: 'DAY_12_4', sprite: SPRITE_SLEEPING,
    text: '...Ахиру-сан?'
  },
  DAY_12_4: {
    type: SCRIPT_CUTSCENE, sprite: SPRITE_SLEEPING_ZZZ,
    text: '...Во сне она выглядит такой милой.',
    choices: [
      ['Может, укрою ее?', 'DAY_12_5'],
      ['Не буду ее беспокоить, позанимаюсь сам.', 'GRAPH_SLEEPING']
    ]
  },
  DAY_12_5: {
    type: SCRIPT_CUTSCENE, sprite: SPRITE_SLEEPING,
    text: 'Тик-так, тик-так, тик-так',
    choices: [['Тик-так', SCRIPT_RELATIONSHIP_UP_END_DAY]]
  },

  /* Layer 13 */
  DAY_13: {
    type: SCRIPT_CUTSCENE, next: 'DAY_13_1',
    text: 'Солнце светит, в наушниках приятная музыка, что может быть лучше?'
  },
  DAY_13_1: {
    type: SCRIPT_CUTSCENE, next: 'DAY_13_2',
    text: 'Сегодня последний день занятий, мне так не терпится увидеть ее! Столько всего хочется сказать, а возможности может уже не выпасть...'
  },
  DAY_13_2: {
    type: SCRIPT_CUTSCENE,
    text: 'Странно, что дверь кабинета не приоткрыта… И ручка не поворачивается. Тут что, закрыто?',
    choices: [
      ['Подожду у окна: Каики никогда не опаздывает.', 'DAY_13_A'],
      ['Позанимаюсь сам: думаю, Каики приятно удивится.', 'DAY_13_B'],
    ]
  },
  DAY_13_A: {
    type: SCRIPT_CUTSCENE,
    text: '...Каждый оборот секундной стрелки кажется мне вечностью. Долго я не прожду.',
    choices: [['Мне кажется, Каики была у меня в друзьях: напишу ей?', 'DAY_13_3']]
  },
  DAY_13_B: {
    type: SCRIPT_CUTSCENE,
    text: 'Так, 3 + 5 равно... пятнадцать? Ой, грифель у карандаша сломался...',
    choices: [['Мне кажется, Каики была у меня в друзьях: напишу ей?', 'DAY_13_3']]
  },
  DAY_13_3: {
    type: SCRIPT_CUTSCENE,
    text: 'Хмм, она была в сети сегодня ночью. Не поздновато ли для нее?',
    choices: [
      ['Скину фотку с котиком.', 'DAY_13_ARDUINO_PLAY_DESPACITO'],
      ['Спрошу, все ли в порядке.', 'DAY_13_4']
    ]
  },
  DAY_13_ARDUINO_PLAY_DESPACITO: {
    type: SCRIPT_CUTSCENE,
    text: 'Что-то она долго не отвечает.',
    choices: [['Видимо, пойду домой.', SCRIPT_RELATIONSHIP_NONE_END_DAY]]
  },
  DAY_13_4: {
    type: SCRIPT_CUTSCENE, next: 'DAY_13_5',
    text: 'Сообщение прочитала, но уже несколько минут не отвечает. Обидел ли я тебя чем-то, Каики?'
    /* TODO: finish layer 13 */
  }
};
