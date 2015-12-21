import React from 'react';
import _ from 'lodash';
import Griddle from 'griddle-react';

const CheckboxComponent = ({metadata, rowData}) => {
	const { action } = metadata;
	const { rowIndex, checked, word } = rowData;
	return (
		<div onClick={action.bind(null, word)}>
			<input type="checkbox" readOnly checked={checked}/>
			<label></label>
		</div>
	);
};

const ClickableTextComponent = ({metadata, data}) => {
	const { action } = metadata;
	return (
		<div onClick={action.bind(null, data)} className="pointer">
			{data}
		</div>
	);
};

const ActionsComponent = ({metadata, data, rowData}) => {
	const {switchForm, selectAllForms} = metadata;
	const { word, allForms } = rowData;
	return (
		<div>
			{allForms ?
			<a className="pointer" onClick={selectAllForms.bind(null, word)}>Примеры <br/></a>
			: ''}
			<a className="pointer" onClick={switchForm.bind(null, word)}>Подробнее</a>
		</div>
	)
};


class ResultsTable extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			results: _.sortBy(props.results, (r) => parseInt(r.count)).reverse(),
  	};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({results: _.sortBy(nextProps.results, (r) => parseInt(r.count)).reverse()});
	}

  render() {
    const { name, selected, selectedForms = [] } = this.props;

		let { results } = this.state;
		let rowMetadata = {
				"bodyCssClassName": function(rowData) {
						if (rowData.word === rowData.selected) {
								return "selected-row";
						}
						return "default-row";
				}
		};

		results = results.map( (r, i) => {
			r.rowIndex = i;
			r.checked = selectedForms.indexOf(r.word) > -1;
			r.selected = selected;
			r.allForms = this.props.allForms;
			return r;
		});

		let columnsMetadata = [
			{
				columnName: 'word',
				displayName: 'Слово',
			},
			{
				columnName: 'count',
				displayName: 'Кол-во',
			},
      {
        columnName: 'action',
        displayName: 'Выбрать',
				customComponent: CheckboxComponent,
				action: this.props.onResultCheckedChange,
      }
		];
		let columns = ['word', 'count', 'action'];
    if (name) {
			columnsMetadata = [
				{
					columnName: 'word',
					displayName: 'Слово',
	        className: 'pointer',
					customComponent: ClickableTextComponent,
	        action: this.props.onSelectedChange,
				},
				{
					columnName: 'count',
					displayName: 'Кол-во',
				},
				{
					columnName: 'actions',
					displayName: 'Действия',
					customComponent: ActionsComponent,
					switchForm: this.props.switchForm,
					selectAllForms: this.props.selectAllForms,
					allFormsChecked: this.props.allForms,
				}
			];
			columns = ['word', 'count'];
			if (this.props.main === false) {
				columns.push('actions');
			}
		}

    return (
			<div>
        <h5 className="table-name">{name}</h5>
				<Griddle results={results}
								 showFilter={true}
								 columns={columns}
								 columnMetadata={columnsMetadata}
								 rowMetadata={rowMetadata}
								 useGriddleStyles={false}
								 useFixedHeader={false}
								 bodyHeight={400}
								 tableClassName={"bordered"}
								 enableInfiniteScroll={true}
								 filterPlaceholderText="Фильтр"
								 noDataMessage="Нет данных" />
			</div>
    );
  }
};

export default ResultsTable;
