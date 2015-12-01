import React from 'react';
import Select from 'react-select';
import { compositions } from '../../config/data';

const CompositionSelect = ({value, onChange}) => {

	const compositionsOptions = compositions
	.map( (composition) => ({
		value: composition.get('name'),
		label: composition.get('nameLocalized')
	})).toJS();

	return (
		<Select name="form-field-name"
					backspaceRemoves={false}
					clearable={false}
					placeholder="Выберите тип словосочетания"
					searchingText="Поиск"
					noResultsText="Ничего не найдено"
					value={value}
					options={compositionsOptions} onChange={onChange} />
	);
};

export default CompositionSelect;
