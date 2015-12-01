import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/lib/createHashHistory';
import { reduxReactRouter, routerStateReducer as router } from 'redux-router';
import { devTools, persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import routes from './routes';
import reducer from '../reducers';

const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)(reducer);

export default store;
