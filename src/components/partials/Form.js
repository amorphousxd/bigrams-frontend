import React from 'react';

const Form = ({ children, onSubmit }) => (
	<form autoComplete="off" onSubmit={onSubmit}>
		<input style={{display:'none'}}/>
		<input type="password" style={{display:'none'}}/>
		{children}
		<input type="submit" style={{display: 'none'}} />
	</form>
);

export default Form;
