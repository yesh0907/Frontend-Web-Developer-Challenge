import React from 'react';
import { Link } from 'react-router'

import Bookmark from '../components/Bookmark';
import Navigation from '../components/Shared/Navigation';

export default class Bookmarks extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div class="main">
				<Navigation currentPage="/bookmarks"></Navigation>
				<Bookmark></Bookmark>
			</div>
		)
	}
}