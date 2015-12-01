import React from 'react';

const Loader = ({active, style}) => {
	let className = "preloader-wrapper big";
	if (active) className += " active";
	return (
		<div className={className} style={style}>
			<div className="spinner-layer spinner-green-only">
				<div className="circle-clipper left">
					<div className="circle"></div>
				</div>
				<div className="gap-patch">
					<div className="circle"></div>
				</div>
				<div className="circle-clipper right">
					<div className="circle"></div>
				</div>
			</div>
		</div>
	)
};

export default Loader;
