import { handleActions } from 'redux-actions';
import Immutable, { Map, List } from 'immutable';
import * as types from 'constants/search';

const initialState = Immutable.fromJS({
	results: {},
	composition: {
		partsOfSpeech: {},
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
		state = state.set('results', Immutable.fromJS(results));

		return state;
	},

	[types.GET_RESULTS_FAIL]: (state) => {
  	return state.set('inProcess', false);
	},

	[types.CLEAR_RESULTS]: (state) => {
		return state.set('results', Map({}));
	},

	[types.COMPOSITION_SET]: (state, { composition }) => {
  	return state.set('composition', composition);
	},

	[types.COMPOSITION_SET_QUERY]: (state, { query }) => {
		for(let prop in query){
      state = state.setIn(['composition', 'partsOfSpeech', prop, 'query'], query[prop]);
		}

  	return state;
	},

	[types.COMPOSITION_SELECTED_FORM_CHECK]: (state, { partOfSpeechName, word }) => {
		let selectedForms = state.getIn(['composition', 'partsOfSpeech', partOfSpeechName, 'forms', 'selected']);

		if (selectedForms.indexOf(word) === -1) {
			selectedForms = selectedForms.push(word);
		} else {
			selectedForms = selectedForms.filter( (w) => w !== word );
		}

		return state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'forms', 'selected'], selectedForms);
	},

	[types.COMPOSITION_SET_SELECTED]: (state, { partOfSpeechName, value }) => {
    return state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'selected'], value);
	},

	[types.COMPOSITION_ALL_FORMS_STATUS_CHANGE]: (state, { partOfSpeechName }) => {
		const currentStatus = state.getIn(['composition', 'partsOfSpeech', partOfSpeechName, 'allForms']);

		return state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'allForms'], ! !!currentStatus);
	},

	[types.COMPOSITION_FORMS_CLEAR]: (state, {partsOfSpeechToPass = [], partsOfSpeechToClear = []}) => {
		let partsOfSpeech = state.getIn(['composition', 'partsOfSpeech'])
														 .map( (p) => {
															 if ( (partsOfSpeechToClear.length === 0 && partsOfSpeechToPass.indexOf(p.get('name')) === -1) ||
														 			 partsOfSpeechToClear.indexOf(p.get('name')) > -1)
															 p = p.setIn( ['forms', 'selected'], List([]) );
															 return p;
														 });

  	return state.setIn(['composition', 'partsOfSpeech'], partsOfSpeech);
	},

}, initialState);

export default search;
