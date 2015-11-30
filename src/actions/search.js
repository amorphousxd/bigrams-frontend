import * as types from 'constants/search';

function getRequestObject(composition){
  let result = {};
  const {partsOfSpeech} = composition;
  partsOfSpeech.map( (partOfSpeech) => {
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

export function search(query) {
  return async (dispatch) => {

    dispatch({
      type: types.SEARCH_PERFORM_INIT,
    });

    fetch(`http://localhost:3001/${query}?ass[]=wqe&ass[]=wdwddw`, { method: 'get', credentials: 'include' }).then(
      async (response) => {
        dispatch({
          type: types.SEARCH_PERFORM_SUCCESS,
          result: await response.json(),
        });
      },
      () => {
        dispatch({
          type: types.SEARCH_PERFORM_FAIL
        });
      }
    );
  };
}

export function getResults(composition){

  const requestObject = getRequestObject(composition.toJS());

  return async (dispatch) => {

    dispatch({
      type: types.GET_RESULTS_INIT,
    });

    dispatch({
      type: types.COMPOSITION_FORMS_CLEAR,
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
  return {
    type: types.COMPOSITION_SET_SELECTED,
    partOfSpeechName,
    value,
  };
}

export function clearResults(){
  return {
    type: types.CLEAR_RESULTS
  }
}

export function resultsCheckedChange(partOfSpeechName, index) {
  return {
    type: types.RESULTS_INDEX_CHECKED_CHANGE,
    partOfSpeechName,
    index,
  }
}

export function changeAllFormsStatus(partOfSpeechName){
  return {
    type: types.COMPOSITION_ALL_FORMS_STATUS_CHANGE,
    partOfSpeechName
  }
}

export function clearForms(){
  return {
    type: types.COMPOSITION_FORMS_CLEAR,
  }
}
