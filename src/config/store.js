import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/lib/createHashHistory';
import { reduxReactRouter, routerStateReducer as router } from 'redux-router';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import routes from './routes';
import reducer from '../reducers';

//const reducer = combineReducers(reducers);

const composeStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  //devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const configureStore = (initialState) => {
  const store = composeStore(reducer, initialState);

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers');
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
};

const store = configureStore();

export default store;
