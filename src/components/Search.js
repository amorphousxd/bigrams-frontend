import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SearchActions from '../actions/search';
import Nav from './partials/Nav.js';
import Select from 'react-select';
import _ from 'lodash';
import ResultsTable from './ResultsTable';
import { compositions } from 'config/data';
import { Map, List } from 'immutable';
import { Loader } from './partials/Loader';

class Search extends Component {

	constructor(props){

		super(props);

		this.onQueryChange = this.onQueryChange.bind(this);
		this.onCompositionChange = this.onCompositionChange.bind(this);
		this.onAllFormsChange = this.onAllFormsChange.bind(this);
		this.search = this.search.bind(this);
		this.onSelectedChange = this.onSelectedChange.bind(this);

		this.state = {
			query: {},
		};

	}

  render() {
    const { search, clearResults, composition, inProcess } = this.props;
		const { query, allFormsStatuses } = this.state;
		const compositionsOptions = compositions.map( (composition) => ({value: composition.get('name'), label: composition.get('nameLocalized')})).toJS();
		let inputs = [], tables = [];
		let results = this.props.results ? this.props.results.toJS() : [];

		composition.get('partsOfSpeech')
		.map( (p, i) => {
			inputs.push(
				<div key={i} className="col s3">
					<label>{p.get('nameLocalized')}</label>
					<input type="text" value={query[p.get('name')]} onChange={this.onQueryChange.bind(null, p.get('name'))}/>
					<div onClick={this.onAllFormsChange.bind(null, p.get('name'))}>
						<input type="checkbox" name={p.name + '_all'} checked={p.get('allForms')}  />
		      	<label>Выбрать форму</label>
					</div>
				</div>
			);
			if(results[`${p.get('name')}_forms`] && i === 0) {
				inputs.push(
					<div key={i+'_offset'} className="col s3" style={{height: 1}}></div>
				)
			}
		});

		composition.get('partsOfSpeech')
		.filter( (p) => results[p.get('name')])
		.map( (p, i) => {
			const selected = p.get('allForms') ? p.get('selected') : '';
			tables.push(
				<div key={i+'table'} className="col s3">
					<ResultsTable name={p.get('nameLocalized')}
												results={results[p.get('name')]}
												onSelectedChange={this.onSelectedChange.bind(null, p.get('name'))}
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
						<Select name="form-field-name"
										backspaceRemoves={false}
										clearable={false}
										placeholder="Выберите тип словосочетания"
										searchingText="Поиск"
										noResultsText="Ничего не найдено"
										value={composition.get('name')}
										options={compositionsOptions} onChange={this.onCompositionChange} />
					</div>
				</div>

	      <div className="row">
					<form autoComplete="off" onSubmit={this.search}>
					<input style={{display:'none'}}/>
					<input type="password" style={{display:'none'}}/>

					{inputs}

					{inputs.length ?
						<div className="col s3">
							<div className="col s6">
								<button className="waves-effect waves-light btn" style={{marginTop: 30}} type="button" onClick={this.search}>Поиск</button>
							</div>
							<div style={{marginTop: 20}}>
								<Loader active={inProcess}/>
							</div>
						</div>
					: ''}
					<input type="submit" style={{display: 'none'}} />
					</form>
	      </div>

				<div className="row">
					{tables}
				</div>

			</div>
    );
  }

	async search(e, d){
		e.preventDefault();
		await this.props.setCompositionQuery(this.state.query);
		this.props.getResults(this.props.composition);
	}

	async onSelectedChange(partOfSpeech, value) {
		await this.props.setCompositionSelected(partOfSpeech, value);
		this.props.getResults(this.props.composition);
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

	async onAllFormsChange(partOfSpeechName) {
		await this.props.changeAllFormsStatus(partOfSpeechName);
		await this.props.setCompositionQuery(this.state.query);
		this.props.getResults(this.props.composition);
	}

	async onResultCheckedChange(partOfSpeechName, index) {
		await this.props.resultsCheckedChange(partOfSpeechName, index);
		this.props.getResults(this.props.composition);
	}

}

Search.propTypes = {
  search: PropTypes.func.isRequired,
	settings: PropTypes.object.isRequired,
	results: PropTypes.object.isRequired,
	composition: PropTypes.object,
	inProcess: PropTypes.boolean,
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
