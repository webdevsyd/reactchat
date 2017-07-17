import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Route, Switch } from 'react-router';

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

class App extends Component {
	render() {
		return (
			<CookiesProvider>
				<Switch>
					<Route exact path="/" component={LoginPage}/>
					<Route path="/chat" component={ChatPage} />
				</Switch>
			</CookiesProvider>
		);
	}
}

export default App;
