import React, { Component } from 'react';
import './App.css';
import Main from './components/Maincomponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store= ConfigureStore();

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
              <Main />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}


export default App;

// json-server --watch db.json -p 3001 -d 2000