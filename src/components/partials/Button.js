import React from 'react';

const Button = ({style, onClick, children}) => (
	<div className="col s6">
		<button className="waves-effect waves-light btn" type="button" style={style} onClick={onClick} >{children}</button>
	</div>
);

export default Button;
