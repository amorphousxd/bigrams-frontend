import { handleActions } from 'redux-actions';
import Immutable, { Map, List } from 'immutable';
import * as types from 'constants/search';

const initialState = Immutable.fromJS({
	results: {},
	composition: {
		partsOfSpeech: [],
	},
	settings: {},
	inProcess: false
});

const search = handleActions({

	[types.GET_RESULTS_INIT]: (state) => {
		return state.set('inProcess', true);
	},

	[types.GET_RESULTS_SUCCESS]: (state, { results }) => {
  	state = state.set('inProcess', false);
		state = state.set('results', results);

		return state;
	},

	[types.GET_RESULTS_FAIL]: (state) => {
  	return state.set('inProcess', false);
	},

	[types.CLEAR_RESULTS]: (state) => {
		return state.set('results', List([]));
	},

	[types.COMPOSITION_SET]: (state, { composition }) => {
  	return state.set('composition', composition);
	},

	[types.COMPOSITION_SET_QUERY]: (state, { query }) => {
		for(let prop in query){
			const partOfSpeechIndex = state.getIn(['composition', 'partsOfSpeech'])
																		 .findIndex( (partOfSpeech ) => partOfSpeech.get('name') === prop);
      state = state.setIn(['composition', 'partsOfSpeech', partOfSpeechIndex, 'query'], query[prop]);
		}

  	return state;
	},

	[types.COMPOSITION_SET_SELECTED]: (state, { partOfSpeechName, value }) => {
		const partOfSpeechIndex = state.getIn(['composition', 'partsOfSpeech'])
																	 .findIndex( (partOfSpeech ) => partOfSpeech.get('name') === partOfSpeechName);
    return state.setIn(['composition', 'partsOfSpeech', partOfSpeechIndex, 'selected'], value);
	},

	[types.COMPOSITION_ALL_FORMS_STATUS_CHANGE]: (state, { partOfSpeechName }) => {
		const partOfSpeechIndex = state.getIn(['composition', 'partsOfSpeech'])
																	 .findIndex( (partOfSpeech ) => partOfSpeech.get('name') === partOfSpeechName);
		const currentStatus = state.getIn(['composition', 'partsOfSpeech', partOfSpeechIndex, 'allForms']);

		return state.setIn(['composition', 'partsOfSpeech', partOfSpeechIndex, 'allForms'], ! !!currentStatus);
	},

	[types.COMPOSITION_FORMS_CLEAR]: (state) => {
		const partsOfSpeech = state.getIn(['composition', 'partsOfSpeech'])
															 .map( (p) => p.set('selectedForms', List([]) ));

  	return state.setIn(['composition', 'partsOfSpeech'], partsOfSpeech);
	},

}, initialState);

export default search;
