/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */

import React from 'react';
import styles from './style.css';
import tooltips from '../../tooltips/index.jsx';

export default class TableSortControl extends React.Component {
	constructor() {
		super();
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		let { order } = this.props;

		if (order === 'desc') {
			order = 'asc';
		} else {
			order = 'desc';
		}

		this.props.onChange(order);
	}

	render() {
		const {
			singleRow,
			firstSortLabel,
			secondSortLabel,
			order,
			isActive,
			isInline,
		} = this.props;

		let className = styles.sorter;

		if (isActive) {
			className += ` ${ styles.sorterActive }`;
		}

		if (isInline) {
			className += ` ${ styles.inlinSorter }`
		}

		return (
			<th
				rowSpan={ singleRow ? null : '2' }
				className={ className }
				onClick={ this.toggle }

				{ ...tooltips.useTooltip(order === 'asc' ? secondSortLabel : firstSortLabel, 'hint-right') }
			>{
				order === 'asc' ? '▴' : '▾'
			}</th>
		);
	}
}

TableSortControl.defaultProps = {
	firstSortLabel: 'Sort by conf order',
	secondSortLabel: 'Sort by status - failed first',
	isActive: true,
};
