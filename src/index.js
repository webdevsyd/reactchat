import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

/* React Material */
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

/* Routes */
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
document.getElementById('root'));

registerServiceWorker();
