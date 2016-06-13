import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Bookmarks from './pages/Bookmarks';
import Home from './pages/Home';

const app = document.getElementById("app");
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Home}></Route>
		<Route path="/bookmarks" component={Bookmarks}></Route>
	</Router>,
app);