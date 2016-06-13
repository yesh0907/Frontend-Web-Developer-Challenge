import React from 'react';

export default class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			currentOption: 0
		}
	}

	handleOptionChange(e) {
		//Takes the new option and sets that as the current one
		var newOption = e.target.value;
		this.setState({
			currentOption: newOption
		});
		//For the Parent(AKA Table.js) to handle the change too
		this.props.changeHandler({
			currentOption: newOption
		});
	}

	render() {
		// Renders all options
		var amountOfOptions = this.props.amountOfOptions;

		var options = this.props.portionNames.map((name, id) => {
			return (
				<option key={id} value={id}>{name}</option>
			);
		});

		return (
			<select class="choice" onChange={this.handleOptionChange.bind(this)}>
				{options}
			</select>
		);
	}
}