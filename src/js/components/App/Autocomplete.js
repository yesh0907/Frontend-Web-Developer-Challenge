import React from 'react';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';

function getSuggestions(value, data) {
	//Gets the suggestions. 
	const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    var data;
	if (inputLength === 0 || data === []) {
	    return [];
	}
	else {
		return data;
	}
}

function renderSuggestion(suggestion) {
	// Renders the suggestions
    return (
    	<span>{suggestion.name}</span>
    );
}

export default class Autocomplete extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
			suggestions: getSuggestions('', []),
			query: ''
		};

		this.onChange = this.onChange.bind(this);
    	this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    	this.getSuggestionValue = this.getSuggestionValue.bind(this);
	}

	onChange(event, { newValue }) {
		// When the user types, this method sets the this.state.value to the newly typed string.
		this.setState({
			value: newValue
		});
    }

    getSuggestionValue(suggestion) {
    	// Makes a request on that specific item the user has picked to get all information. 
    	this.setState({
    		query: suggestion.name
    	});
    	$.ajax({
			async: false,
			type: 'GET',
			url: `https://test.holmusk.com/food/search?q=${suggestion.name}`,
			success: (result) => {
				this.details = {};
				this.details.name = result[0]['name'];
				this.details.portions = result[0]['portions'];
				this.props.handleData({
					details: this.details
				});
			}
		});
  		return suggestion.name;      
	}

    onSuggestionsUpdateRequested({ value }) {
    	// Makes backend call to retrieve all names of the 
    	// suggestions and relays information to getSuggestions
    	$.ajax({
			async: false,
			type: 'GET',
			url: `https://test.holmusk.com/food/search?q=${value}`,
			success: (result) => {
				this.setState({
		      		data: result,
		      		suggestions: getSuggestions(value, result)
		    	});
			}
		});
  	}

  	render() {
  		// Setup variables for the autocomplete
  		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Type in your food',
			value,
			onChange: this.onChange
		};

		return (
			<Autosuggest suggestions={suggestions}
				onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
				getSuggestionValue={this.getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps} />
		);
  	}
}