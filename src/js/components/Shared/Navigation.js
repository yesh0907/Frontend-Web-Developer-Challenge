import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component {
	constructor() {
		super();
	}

	render() {
		//Check for the current page
		if (this.props.currentPage == "/") {
			return (
				<div class="nav">
					<i class="fa fa-bars navicon"></i>
					<Link to="/" class="link active active-search padding"><h2>
						<i class="fa fa-search" aria-hidden="true"></i>&nbsp;Search</h2></Link>
					<Link to="bookmarks" class="link padding"><h2>
						<i class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Bookmarks</h2></Link>
				</div>
			);
		}
		else {
			return (
				<div class="nav">
					<i class="fa fa-bars navicon"></i>
					<Link to="/" class="link padding"><h2>
						<i class="fa fa-search" aria-hidden="true"></i>&nbsp;Search</h2></Link>
					<Link to="bookmarks" class="link active active-bookmarks padding"><h2>
						<i class="fa fa-star-o" aria-hidden="true"></i>&nbsp;Bookmarks</h2></Link>
				</div>
			)
		}
		
	}
}