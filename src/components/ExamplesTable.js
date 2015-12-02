import React from 'react';
import Griddle from 'griddle-react';
import _ from 'lodash';

const ExamplesTable = ({data}) => {
	if(!data) return <div/>;
	data = data.map( (d, i) => ({index: i, data: d}) );
	data = _.filter(data, (d) => d.data.length > 10);
	const columns = ['index', 'data'];
	const columnsMetadata = [
		{
			columnName: 'index',
			displayName: '№',
		},
		{
			columnName: 'data',
			displayName: 'Предложение',
		}
	];
	return (
		<div>
			<h4>Примеры предложений</h4>
			<Griddle results={data}
						 columns={columns}
						 columnMetadata={columnsMetadata}
						 useGriddleStyles={false}
						 useFixedHeader={true}
						 bodyHeight={700}
						 tableClassName={"bordered"}
						 enableInfiniteScroll={true}
						 noDataMessage="Нет данных" />
		</div>
	);
}

export default ExamplesTable;
