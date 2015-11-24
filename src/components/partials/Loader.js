import React from 'react';

export const Loader = ({active}) => {
	let className = "preloader-wrapper big";
	if (active) className += " active";
	return (
		<div className={className}>
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
}
