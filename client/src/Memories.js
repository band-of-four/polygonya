import React from 'react';

export default function Memories(props) {
  return (
    <div className="view">
      <div className="history__controls">
        <button className="button" onClick={props.showGraph}>Вернуться в реальность</button>
        <button className="button">Забыть все</button>
      </div>
      <table className="history__table">
        <thead>
          <tr>
            <th>R</th>
            <th>X</th>
            <th>Y</th>
            <th>Результат</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in historyItems">
            {/*<th>{{ item.r }}</th>
            <th>{{ item.x }}</th>
            <th>{{ item.y }}</th>
            <th>{{ item.status ? 'внутри' : 'снаружи' }}</th>*/}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
