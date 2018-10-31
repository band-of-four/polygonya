import React from 'react';
import ReactDOM from 'react-dom';

function App(props) {
  return (
    <div className="grid">
      <header key="header" className="grid__header header">
        <a className="header__link" key="homeLink" href="#">Polygonya</a>
        <a className="header__link" key="aboutLink" href="#">?</a>
      </header>
      <aside key="sprite" className="grid__sprite sprite" style={{backgroundImage: `url('/assets/${props.sprite}')`}} />
      <main key="main" className="grid__main">
        <div key="quote" className="quote">
          <span key="quoteSpeaker" className="quote__speaker">Каики Ахиру</span>
          <p key="quoteContent" className="quote__content">...</p>
        </div>
      </main>
    </div>
  );
}

ReactDOM.render(<App sprite="kaiki-chan-idle.png"/>, document.body);
