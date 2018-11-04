export const GAME_CUTSCENE = 'GAME_CUTSCENE';
export const GAME_DIALOGUE = 'GAME_DIALOGUE';
export const GAME_TEST = 'GAME_TEST';

const SPRITE_IDLE = 'kaiki-chan-idle.png';
const SPRITE_THINKING = 'kaiki-chan-thinking.png';

export const GAME_SCRIPT = {
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
