import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux'
import search from './search';

const reducer = combineReducers( {
	router,
	search,
})
export default reducer;
