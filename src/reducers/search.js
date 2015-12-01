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
		for( let prop in results ) {
			if (prop.indexOf('forms') === -1  && results[`${prop}_forms`]) {
				let selectedForms = state.getIn(['composition', 'partsOfSpeech', prop, 'forms', 'selected']).toJS();
				results[`${prop}_forms`].map( result => {
					if (selectedForms.indexOf(result.word) > -1 ) {
						result.checked = true;
					}
				})
			}
		}
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

	[types.RESULTS_INDEX_CHECKED_CHANGE]: (state, { partOfSpeechName, index }) => {
		let result = state.getIn(['results', `${partOfSpeechName}_forms`, index]);
				result = result.set('checked',  ! !!result.get('checked'));
		const results = state.getIn(['results', `${partOfSpeechName}_forms`]).set(index, result);

		let selectedForms = state.getIn(['composition', 'partsOfSpeech', partOfSpeechName, 'forms', 'selected']);
		if (result.get('checked') === true) {
			selectedForms = selectedForms.push(result.get('word'));
		} else {
			selectedForms = selectedForms.filter( (w) => w === result.get('word') );
		}

		state = state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'forms', 'selected'], selectedForms)
								 .setIn(['results', `${partOfSpeechName}_forms`], results);

		return state;
	},

	[types.COMPOSITION_SET_SELECTED]: (state, { partOfSpeechName, value }) => {
    return state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'selected'], value);
	},

	[types.COMPOSITION_ALL_FORMS_STATUS_CHANGE]: (state, { partOfSpeechName }) => {
		const currentStatus = state.getIn(['composition', 'partsOfSpeech', partOfSpeechName, 'allForms']);

		return state.setIn(['composition', 'partsOfSpeech', partOfSpeechName, 'allForms'], ! !!currentStatus);
	},

	[types.COMPOSITION_FORMS_CLEAR]: (state) => ({
  	...state
	}),

}, initialState);

export default search;
