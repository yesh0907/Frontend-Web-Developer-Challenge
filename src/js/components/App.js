import React from 'react';
import $ from 'jquery';

import Autocomplete from './App/Autocomplete';
import Table from './Shared/Table';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			gotData: false
		};
	}

 	handleData(data) {
 		// Handles the data that it has recieved...
 		this.details = data['details'];
 		this.setState({
 			gotData: true
 		});
 	}

 	save(e) {
 		// Saves the information about the meal into the browsers local storage for bookmarks.
 		localStorage.setItem(this.details.name, JSON.stringify(this.details));
 		e.target.value = "Saved!";
 		var item = localStorage.getItem(this.details.name);
 		$('.bookmark-btn').prop('disabled', true);
 	}

	render() {
		// Disabling the button so that it does not mess up the render when the user tries to save a new meal.
		$('.bookmark-btn').prop('disabled', false);
		return (
			<div class="app">
				<Autocomplete handleData={this.handleData.bind(this)}></Autocomplete>
				{ this.state.gotData ? <Table info={this.details}></Table> : null }
				{ this.state.gotData ? <input type="button" value="Bookmark" class="bookmark-btn" onClick={this.save.bind(this)}></input> : null }
			</div>
		);
	}
}