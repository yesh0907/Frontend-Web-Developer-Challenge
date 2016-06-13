import React from 'react';
import { Link } from 'react-router';

import App from '../components/App';
import Navigation from '../components/Shared/Navigation';

export default class Home extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div class="main">
				<Navigation currentPage="/"></Navigation>
				<App></App>
			</div>
		);
	}
}