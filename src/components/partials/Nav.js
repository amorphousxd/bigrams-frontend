import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Nav extends React.Component {

	render(){
		const path = this.props.router.location.pathname;
		const homeClassName = path === '/' ? 'active' : '';

		return (
				<nav style={{marginBottom: 20}}>
			    <div className="nav-wrapper">
			      <a href="#" className="brand-logo"></a>
			      <ul id="nav-mobile" className="right hide-on-med-and-down">
			        <li className={homeClassName}><Link to="/">Home</Link></li>
			        <li><Link to="/search">Search</Link></li>
			      </ul>
			    </div>
			  </nav>
		);
	}
}

function mapStateToProps(state) {
  return {
    router: state.router
  };
}

export default connect(mapStateToProps)(Nav);
