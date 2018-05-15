import React from 'react';
import { render } from 'react-dom';

import './../scss/main.scss';

import TextInput from './components/TextInput.jsx';

class App extends React.Component {
  render () {
    return (
      <div className="home">
        Enter your text
        <TextInput />  
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
