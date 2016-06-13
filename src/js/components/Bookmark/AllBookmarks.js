import React from 'react';
import $ from 'jquery';

export default class AllBookmarks extends React.Component {
	constructor() {
		super();

		this.state = {
			updated: false,
			confirmation: false
		};
	}

	changeBookmark(e) {
		// Changes the currently rendered bookmark to the newly selected one. 
		let bookmark = e.target.value;
		this.props.switchBookmark({
			bookmark
		});
	}

	deleteBookmark(e) {
		// Deletes a specific bookmark
		var bookmark = e.target.value;
		console.log(e.target.value);
		localStorage.removeItem(bookmark);
		for (var i = 0; i < this.props.bookmarks.length; i++) {
			let currentBookmark = this.props.bookmarks[i];
			if (currentBookmark == bookmark) {
				this.props.bookmarks.splice(i, 1);
				this.setState({
					updated: true
				});
			}
		}
	}

	confirmDelete(e) {
		// Once the delete all button is clicked, this makes the confirmation appear.
		e.target.disabled = true;
		this.setState({
			confirmation: true
		});
		$('.delete-all').hide();
	}

	handleDeleteAllBookmarks(e) {
		// Gets the information on which button is clicked for the 
		// conformation and handles the correct response.
		let optionClicked = e.target.value;

		if (optionClicked === "No") {
			//Cancell Delete. 
			this.setState({
				confirmation: false
			});
			$('.delete-all').prop('disabled', false);
			$('.delete-all').show();
		}
		else {
			//Deletes all Bookmarks from localstorage and current array.
			this.props.bookmarks.length = 0;
			for (var i in localStorage) {
				localStorage.removeItem(i);
			}
			this.setState({
				updated: true,
				confirmation: false
			});
		}
	}

	render() {
		//Renders all the bookmarks available. Data was given from the Parent(AKA Bookmark.js)
		var bookmarks = this.props.bookmarks.map((name, index) => {
			return (
				<table key={index} class="bookmarks-table">
					<tbody>
						<tr>
							<td class="bookmark-name" onClick={this.changeBookmark.bind(this)} 
								value={name}>{name}</td>
							<td><a class="bookmark-delete-bookmark" onClick={this.deleteBookmark.bind(this)} value={name}>
								<i class="fa fa-trash" onClick={this.deleteBookmark.bind(this)} value={name}></i></a></td>
						</tr>
					</tbody>
				</table>
			);
		});
		return (
			<div class="all-bookmarks">
				<h2 class="all-bookmarks-title">All Bookmarks:</h2>
				{ this.state.updated ? bookmarks : bookmarks }
				<input class="delete-all" type="button" value="Delete All Bookmarks" 
					onClick={this.confirmDelete.bind(this)} />
				{ this.state.confirmation ? <input type="button" value="Yes"  class="bookmark-yes-confirm"
											onClick={this.handleDeleteAllBookmarks.bind(this)} /> : null }
				{ this.state.confirmation ? <input type="button" value="No"  class="bookmark-no-confirm"
											onClick={this.handleDeleteAllBookmarks.bind(this)} /> : null }
			</div>
		);
	}
}