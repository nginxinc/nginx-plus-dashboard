/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */

import React from 'react';
import { subscribe, unsubscribe, get } from '../../datastore';
import { STORE } from '../../datastore/store.js';

export default (ComponentToWrap, apis = [], params = { ignoreEmpty: false }) => {
	const _class = class extends React.Component {
		constructor() {
			super();
			this.forceUpdate = this.forceUpdate.bind(this);
		}

		componentWillMount() {
			subscribe.apply(null, [
				...(apis.length ? [apis] : []),
				this.forceUpdate
			]);
		}

		componentWillUnmount() {
			unsubscribe(apis);
		}

		render() {
			let data = null;

			if (params.ignoreEmpty === false && apis.length) {
				data = get(apis);
				// TODO: Rethink
				if (Object.values(data).every(d => d === null)) {
					return null;
				}
			}

			return <ComponentToWrap {...this.props} data={data} store={STORE} />;
		}
	};

	Object.defineProperty(_class, 'name', { value: `${ ComponentToWrap.name }_binded` });

	return _class;
};

