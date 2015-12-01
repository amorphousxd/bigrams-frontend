import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import _ from 'lodash';

import * as SearchActions from '../actions/search';
import ResultsTable from './ResultsTable';
import Loader from './partials/Loader';
import Form from './partials/Form.js';
import Button from './partials/Button.js';
import CompositionSelect from './partials/CompositionSelect.js';
import PartOfSpeechInput from './partials/PartOfSpeechInput.js';
import { compositions } from 'config/data';

class Search extends Component {

	constructor(props){

		super(props);

		this.onQueryChange = this.onQueryChange.bind(this);
		this.onCompositionChange = this.onCompositionChange.bind(this);
		this.search = this.search.bind(this);

		this.state = {
			query: {},
		};

	}

	componentWillReceiveProps(props) {
	}

	componentDidUpdate(props) {
		const compositionHasChanged = ! !!_.isEqual(props.composition.toJS(), this.props.composition.toJS());
		const previousCompositionWasNotInitial = _.keys(props.composition.toJS().partsOfSpeech).length > 0;
		const fetchData = compositionHasChanged && previousCompositionWasNotInitial;
		if (fetchData) {
			console.info('FETCHING DATA');
			this.props.getResults(this.props.composition);
		}
	}

  render() {
    const { search, clearResults, composition, inProcess } = this.props;
		const { query, allFormsStatuses } = this.state;
		let inputs = [];
		let tables = [];
		let results = this.props.results ? this.props.results.toJS() : [];

		composition.get('partsOfSpeech')
		.map( (p, i) => {
			inputs.push(
				<PartOfSpeechInput key={i}
													 name={p.get('nameLocalized')}
													 value={query[p.get('name')]}
													 onChange={this.onQueryChange.bind(null, p.get('name'))}
													 onAllFormsChange={this.props.changeAllFormsStatus.bind(null, p.get('name'))}
													 checked={p.get('allForms')} />
			);
			// if(results[`${p.get('name')}_forms`] && i === 0) {
			// 	inputs.push(<div key={i+'_offset'} className="col s3" style={{height: 1}}></div>);
			// }
		});

		composition.get('partsOfSpeech')
		.filter( (p) => results[p.get('name')])
		.map( (p, i) => {
			const selected = p.get('allForms') ? p.get('selected') : '';
			tables.push(
				<div key={i+'table'} className="col s3">
					<ResultsTable name={p.get('nameLocalized')}
												results={results[p.get('name')]}
												onSelectedChange={this.props.setCompositionSelected.bind(null, p.get('name'))}
												selected={selected} />
			 	</div>
			);
			if(results[p.get('name')+'_forms']){
				tables.push(
					<div key={i+'table_forms'} className="col s3">
						<ResultsTable results={results[p.get('name')+'_forms']}
													onResultCheckedChange={this.onResultCheckedChange.bind(this, p.get('name'))}/>
				 	</div>
				);
			}
		});

    return (
			<div className="col s12">
				<div className="row">
					<div className="col s3">
						<CompositionSelect value={composition.get('name')}
						 									 onChange={this.onCompositionChange} />
					</div>
				</div>

	      <div className="row">
					<Form onSubmit={this.search}>
						{inputs}

						{inputs.length ?
							<div className="col s3">
								<Button style={{marginTop: 30}} onClick={this.search}>Поиск</Button>
								<Loader active={inProcess} style={{marginTop: 20}} />
							</div>
						: ''}

					</Form>
	      </div>

				<div className="row">
					{tables}
				</div>

			</div>
    );
  }

	search(e, d){
		e.preventDefault();
		this.props.setCompositionQuery(this.state.query);
	}

	onQueryChange(partOfSpeech, e) {
		const { query } = this.state;
		query[partOfSpeech] = e.target.value;
		this.setState({query});
	}

	onCompositionChange(value) {
		const composition = compositions.find((c) => c.get('name') === value);
		this.props.setComposition(composition);
	}

	onResultCheckedChange(partOfSpeechName, index) {
		this.props.resultsCheckedChange(partOfSpeechName, index);
	}

}

Search.propTypes = {
  search: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
	results: PropTypes.object.isRequired,
	composition: PropTypes.object,
	inProcess: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    results: state.search.get('results'),
		composition: state.search.get('composition'),
		settings: state.search.get('settings'),
		inProcess: state.search.get('inProcess'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
