import React from 'react';


const PartOfSpeechInput = ({name, nameLocalized, value, onChange, onAllFormsChange, checked}) => (
	<div className="col s3">
		<label>{name}</label>
		<input type="text" value={value} onChange={onChange}/>
		<div onClick={onAllFormsChange}>
			<input type="checkbox" checked={checked}/>
			<label>Выбрать форму</label>
		</div>
	</div>
);

export default PartOfSpeechInput;
