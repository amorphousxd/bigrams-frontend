import * as types from 'constants/search';
import _ from 'lodash';

function getRequestObject(composition){
  let result = {};
  const { partsOfSpeech } = composition;
  _.map(partsOfSpeech, (partOfSpeech) => {
    const {allForms, query, offset, selected, forms} = partOfSpeech;
    result[partOfSpeech.name] = {
      allForms,
      query,
      forms,
      selected,
      offset,
    };
    return partOfSpeech;
  });

  return result;

}

function fetchData(requestObject) {
  fetch(`http://46.101.166.133/api/`, {
    method: 'post',
    body: JSON.stringify(requestObject)
  }).then(
    async (response) => {
      return {
        results: response.json(),
      }
    }
  );
}

export function getResults(composition){

  const requestObject = getRequestObject(composition.toJS());

  return async (dispatch) => {

    dispatch({
      type: types.GET_RESULTS_INIT,
    });

    fetch(`http://46.101.166.133/api/`, {
      method: 'post',
      body: JSON.stringify(requestObject)
    }).then(
      async (response) => {
        dispatch({
          type: types.GET_RESULTS_SUCCESS,
          results: await response.json(),
        });
      },
      (error) => {
        dispatch({
          type: types.GET_RESULTS_FAIL
        });
      }
    );
  };
}

export function setComposition(composition){
	return async (dispatch) => {

    await dispatch({
  		type: types.CLEAR_RESULTS,
    });


    await dispatch({
      type: types.COMPOSITION_FORMS_CLEAR,
    });

    dispatch({
  		type: types.COMPOSITION_SET,
  		composition,
    });

	}
}

export function setCompositionQuery(query){
  return {
    type: types.COMPOSITION_SET_QUERY,
    query,
  };
}

export function setCompositionSelected(partOfSpeechName, value){
  return async (dispatch) => {

    await dispatch({
      type: types.COMPOSITION_FORMS_CLEAR,
      partsOfSpeechToClear: [partOfSpeechName],
    });

    dispatch({
      type: types.COMPOSITION_SET_SELECTED,
      partOfSpeechName,
      value,
    })

  }
}

export function clearResults(){
  return {
    type: types.CLEAR_RESULTS
  }
}

export function resultsCheckedChange(partOfSpeechName, word) {
  return {
    type: types.COMPOSITION_SELECTED_FORM_CHECK,
    partOfSpeechName,
    word,
  }
}

export function changeAllFormsStatus(partOfSpeechName){
  return async (dispatch) => {
    await dispatch({
      type: types.COMPOSITION_FORMS_CLEAR,
      partsOfSpeechToPass: [partOfSpeechName],
    });

    dispatch({
      type: types.COMPOSITION_ALL_FORMS_STATUS_CHANGE,
      partOfSpeechName
    })
  }
}

export function clearForms(){
  return {
    type: types.COMPOSITION_FORMS_CLEAR,
  }
}


export function switchForm(compositionName, partOfSpeechName, word) {
  return async (dispatch) => {

    await dispatch({
  		type: types.CLEAR_RESULTS,
    });

    await dispatch({
      type: types.COMPOSITION_FORMS_CLEAR,
    });

    dispatch({
      type: types.COMPOSITION_SWITCH,
      word,
      compositionName,
      partOfSpeechName
    })
  }
}

export function selectAllForms(composition, partOfSpeechName, word) {

  return async (dispatch) => {

    composition = composition.setIn(['partsOfSpeech', partOfSpeechName, 'selected'], word);
    const requestObject = getRequestObject(composition.toJS());
    const results = await fetchData(requestObject);

    dispatch({
      type: types.COMPOSITION_SET_SELECTED,
      partOfSpeechName,
      word,
    });

    return {
      type: types.COMPOSITION_SELECT_ALL_FORMS,
      composition,
      partOfSpeechName,
      word
    }
  }

}
