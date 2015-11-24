import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import {Link} from 'react-router';
import Nav from '../components/partials/Nav.js';

class App extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
    		<Nav/>
        <Link to='/'>
        </Link>
        {this.props.children}
      </div>
    );
  }

}

App.propTypes = {
  pushState: PropTypes.func.isRequired,
  children: PropTypes.node
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {
  pushState
})(App);
