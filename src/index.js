require("babel-polyfill");
require('isomorphic-fetch');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { ReduxRouter } from 'redux-router';
import store from './config/store';

const DEBUG_PANEL = (
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
);

render(
	<div>
	  <Provider store={store}>
			<ReduxRouter />
	  </Provider>
    {/*DEBUG_PANEL*/}
	</div>,
  document.getElementById('root')
);
