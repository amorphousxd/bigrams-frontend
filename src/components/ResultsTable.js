import React from 'react';
import {Table} from './Table';
import _ from 'lodash';


class ResultsTable extends React.Component {

	constructor(props){
		super(props);

		this.onFilterChange = this.onFilterChange.bind(this);
		this.checkResult = this.checkResult.bind(this);

		this.state = {
    	filteredResults: this.results,
			results: _.sortBy(props.results, (r) => parseInt(r.count)).reverse(),
			filter: ''
  	};
	}

	componentWillReceiveProps(nextProps){
		this.setState({results: _.sortBy(nextProps.results, (r) => parseInt(r.count)).reverse()});
	}

	checkResult(index){
		let {results} = this.state;
		results[index].checked = !!!results[index].checked;
		this.setState({results});
	}

	onFilterChange(e) {
		const filter = e.target.value;

		const results = _.filter(this.props.results, (result) => {
			return result.word.toUpperCase().indexOf(filter.toUpperCase()) > -1;
		});

		this.setState({filter, results});
  }

  render() {
    const { name, selected } = this.props;
		const { results } = this.state;
		let columnsMetadata = [
			{
				name: 'word',
				displayName: 'Слово',
        style: {minWidth: 240},
			},
			{
				name: 'count',
				displayName: 'Кол-во',
			},
      {
        name: 'action',
        displayName: 'Выбрать',
        customComponent: {
          name: 'action',
          action: this.checkResult
        },
        style: {width: 80}
      }
		];
    if(name) columnsMetadata = [
			{
				name: 'word',
				displayName: 'Слово',
        style: {minWidth: 260, paddingLeft: 10},
        className: 'pointer',
        onClick: this.props.onSelectedChange,
			},
			{
				name: 'count',
				displayName: 'Кол-во',
        style: {minWidth: 130}
			}
		];

    return (
			<div>
        <h5 className="table-name">{name}</h5>
				<input type="text"
							 value={this.state.filter}
							 onChange={this.onFilterChange}
          		 placeholder="Поиск" />
        <br/>
        <Table columns={columnsMetadata}
							 data={results}
               selected={selected} />
			</div>
    );
  }
};

export default ResultsTable;
