/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Igor Meleshchenko
 * All rights reserved.
 *
 */

import React from 'react';
import { stub } from 'sinon';
import { mount } from 'enzyme';
import Unsupported, { start } from '../unsupported.jsx';
import Footer from '../components/footer/footer.jsx';
import styles from '../style.css';
import headerStyles from '../components/header/style.css';

describe('<Unsupported />', () => {
	it('render()', () => {
		const wrapper = mount(<Unsupported />);

		assert(wrapper.find(`.${ styles['dashboard'] }`).length === 1, 'Unexpected root element');

		const simpleHeader = wrapper.find(`.${ headerStyles['header'] }`);

		assert(simpleHeader.length === 1, 'Can not find header');
		assert(simpleHeader.find(`.${ headerStyles['logo'].replace(' ', '.') }`).length === 1, 'Can not find logo inside the header');

		assert(wrapper.find(`.${ styles['content'] }`).length === 1, 'Can not find content');
		assert(wrapper.find(`.${ styles['error-block'] }`).length === 1, 'Can not find error-block inside the content');

		assert(wrapper.find(Footer).length === 1, 'Footer is not found');
	});

	it('start()', () => {
		stub(document.body, 'appendChild').callsFake(() => {});

		start();

		const Wrapper = document.body.appendChild.args[0][0];

		assert(Wrapper.children.length === 1, 'Wrapper children length');
		assert(
			Wrapper.textContent.includes('Unfortunately your browser is not supported, please use modern one.'),
			'Wrapper content'
		);

		document.body.appendChild.restore();
	});
});
