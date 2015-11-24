import React from 'react';
import { Route, Router } from 'react-router';
import App from 'containers/App';
import Search from 'components/Search';

export default (
	<Router>
	  <Route name="home" path="/" component={App}>
			<Route path="/search" component={Search} />
		</Route>
	</Router>
);
