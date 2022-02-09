/**
 * Copyright 2022-present, F5, Inc.
 * Copyright 2022-present, Eyal Pery
 * All rights reserved.
 *
 */

import utils from './utils';

export function handleProtectedObjects(STATS, protected_object) {
	if (protected_object.attack && protected_object.health >= 1) {
		STATS.status = 'danger';
	} else if (protected_object.attack || protected_object.health > 0.9) {
		STATS.status = 'warning';
	}

	return protected_object;
}

export default (protected_objects, previous, { __STATUSES }) => {
	if (protected_objects === null || Object.keys(protected_objects).length === 0) {
		__STATUSES.protected_objects.ready = false;
		return null;
	}

	const STATS = {
		status: 'ok'
	};

	protected_objects = utils.createMapFromObject(protected_objects, handleProtectedObjects.bind(null, STATS));

	protected_objects.__STATS = STATS;
	__STATUSES.protected_objects.ready = true;
	__STATUSES.protected_objects.status = STATS.status;

	return protected_objects;
};
