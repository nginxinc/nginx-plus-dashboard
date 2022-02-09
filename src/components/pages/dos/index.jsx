/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * Copyright 2017-present, Igor Meleschenko
 * All rights reserved.
 *
 */

import React from 'react';
import { apiDos } from '../../../api';
import DataBinder from '../../databinder/databinder.jsx';
import calculateProtectedObjects from '../../../calculators/protectedobjects.js';

import ProtectedObjects from './protectedobjects.jsx';


export class Dos extends React.Component {
	render() {
		const { data: {
			protected_objects
		} } = this.props;

		return (
			<div>
				<ProtectedObjects data={ protected_objects } />
			</div>
		);
	}
}

export default DataBinder(Dos, [
	apiDos.protected_objects.process(calculateProtectedObjects)
]);
