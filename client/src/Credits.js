import React from 'react';

export default function Credits(props) {
  return (
    <div className="credits info-page neutral-bg fade-in">
      <h1 className="credits-title">Полигоня</h1>
      <img className="credits-img" src="dist/kaiki-chan-sleeping.png" />
      <h1 className="credits-h">Над проектом работали</h1>
      <p className="credits-p">
        <a href="https://vk.com/id113509047" className="credits-a">Виктория Прокофьева</a> — художественное оформление
      </p>
      <p className="credits-p">
        <a href="https://vk.com/id155703829" className="credits-a">Иван Саржевский</a> — техническая реализация
      </p>
      <p className="credits-p">
        <a href="https://vk.com/denvercoder9" className="credits-a">Тимофей Лабушев</a> — техническая реализация
      </p>
      <h1 className="credits-h">С участием...</h1>
      <p className="credits-p">Ста тридцати девяти многоточий</p>
      <p className="credits-p">шести вопроцательных знаков</p>
      <p className="credits-p">
        <a className="credits-a" href="https://github.com/band-of-four/polygonya">
          и более двух тысяч строк кода
        </a>
      </p>
      <p className="credits-emph">Спасибо, что провели с нами время :)</p>
      <button className="button" onClick={props.onResetPlayer}>
        Новое прохождение
      </button>
    </div>
  );
}
