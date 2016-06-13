import React from 'react';

import Select from './Select';

export default class Table extends React.Component {
	constructor() {
		super();
		this.state = {
			option: 0
		};
	}

	handleServingSizeChange(option) {
		//Changes the current Serving Size, gets information from Select.js
		this.setState({
			option: option['currentOption']
		});
		return option;
	}

	fixString(str) {
		// Helps format the string to make it look better...
		function toTitleCase(str) {
	 		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
		var string = str.replace(/_/g, " ");
		return toTitleCase(string);
	}

	render() {
		/*
			Get all the information from App.js and render it here...
		*/
		this.info = {};

		let name = this.props.info['name'];
		let portions = this.props.info['portions'];

		var allPortionNames = [];
		for (var i = 0; i < portions.length; i++) {
			allPortionNames[i] = portions[i]['name'];
		}
		var sortedAllPortionNames;
		var portionNames = [];

		if (allPortionNames.length == portions.length) {
			sortedAllPortionNames = allPortionNames.slice().sort();
			for (var i = 0; i < sortedAllPortionNames.length; i++) {
				if (sortedAllPortionNames[i + 1] != sortedAllPortionNames[i]) {
					portionNames.push(sortedAllPortionNames[i]);
					portionNames.reverse();
				}
			}
		}

		// All essential information. 
		var servingSize = portions[this.state.option]['name'];
		let nutrients = portions[this.state.option]['nutrients']['important'];
		this.info['sodium'] = nutrients['sodium'];
		this.info['polyunsaturated'] = nutrients['polyunsaturated'];
		this.info['trans']= nutrients['trans'];
		this.info['sugar']= nutrients['sugar'];
		this.info['potassium']= nutrients['potassium'];
		this.info['saturated']= nutrients['saturated'];
		this.info['total_carbs']= nutrients['total_carbs'];
		this.info['dietary_fibre']= nutrients['dietary_fibre'];
		this.info['total_fats']= nutrients['total_fats'];
		this.info['cholesterol']= nutrients['cholesterol'];
		this.info['calories']= nutrients['calories'];

		var list = Object.keys(this.info).map((value, index) => {
			var nutritionName = this.fixString(value) + ":";
			if (this.info[value] === null) {
				return (
					<tr key={ index }>
						<td>{ nutritionName }</td>
						<td>N/A</td>
					</tr>
				);
			}
			else {
				return (
					<tr key={ index }>
						<td>{ nutritionName }</td>
						<td>{ this.info[value]['value'] + this.info[value]['unit'] }</td>
					</tr>
				);
			}
		});

		return (
			<div class="info">
				<Select amountOfOptions={portionNames.length} portionNames={portionNames} 
						changeHandler={this.handleServingSizeChange.bind(this)}></Select>
				<h1 class="item-name">{name}</h1>
				<h3 class="item-serving-size">{servingSize}</h3>
				<table>
					<tbody>
						<tr>
							<th>Nutrition</th>
							<th>Value</th>
						</tr>
						{list}
					</tbody>
				</table>
			</div>
		);
	}
}