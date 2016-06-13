import React from 'react';

import AllBookmarks from './Bookmark/AllBookmarks';
import Table from './Shared/Table';

export default class Bookmark extends React.Component {
	constructor() {
		super();

		this.state = {
			updated: false,
			hasData: true
		};
	}

	componentWillMount() {
		this.bookmarked = [];
		for (var i in localStorage) {
			this.bookmarked.push(i);
		}
		if (this.bookmarked.length === 0) {
			this.setState({
				hasData: false
			});
		}
		else {
			var details = localStorage[this.bookmarked[0]];
			details = JSON.parse(details);

			this.details = {};
			this.details.name = details['name'];
			this.details.portions = details['portions'];
		}
	}

	handleBookmarkSwitch(bookmark) {
		var currentBookmark = bookmark['bookmark'];

		var details = localStorage[currentBookmark];
		details = JSON.parse(details);

		this.details = {};
		this.details.name = details['name'];
		this.details.portions = details['portions'];
		this.setState({
			updated: true
		});
	}

	render() {
		if (this.state.hasData) {
			return (
				<div class="bookmark">
					<AllBookmarks bookmarks={this.bookmarked} 
							switchBookmark={this.handleBookmarkSwitch.bind(this)}></AllBookmarks>
					<br />
					{ this.state.update ? <Table info={this.details}></Table> : <Table info={this.details}></Table> }
				</div>
			);
		}
		else {
			return (
				<div class="error-box">
					<h1 class="error-message"><i class="fa fa-exclamation-triangle"></i>&nbsp;
						You do no have any bookmarks</h1>
				</div>
			);
		}
	}
}