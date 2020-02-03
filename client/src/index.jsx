import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that you need to bundle './index.scss 
import './index.scss';

const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MovieDBApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of my application
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MovieDBApplication), container);

