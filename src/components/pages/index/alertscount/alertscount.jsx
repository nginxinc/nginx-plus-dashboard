/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */

import React from 'react';
import styles from './style.css';

export default class AlertsCount extends React.Component {
	shouldComponentUpdate(nextProps) {
		return (
			this.props.total !== nextProps.total ||
			this.props.warnings !== nextProps.warnings ||
			this.props.alerts !== nextProps.alerts
		);
	}

	render() {
		let alertsPart = null;
		const { total, alerts, warnings } = this.props;

		if (alerts !== undefined || warnings !== undefined) {
			const alertsTitle = this.props.alerts > 0 ? 'Alerts' : this.props.warnings > 0 ? 'Warnings' : 'Problems';
			const alertsStyleName = this.props.alerts > 0 ? styles.alert : this.props.warnings > 0 ? styles.warning : styles.ok;

			alertsPart = (
				<>
					/
					<a className={ alertsStyleName } href={ this.props.href }>
						<span className={ styles.label }>{ alertsTitle }</span>
						{ this.props.alerts || this.props.warnings || 0 }
					</a>
				</>
			);
		}

		return (
			<div className={ styles.alerts }>
				<span className={ styles.num }>
					<span className={ styles.label }>Total</span>
					{ this.props.total }
				</span>

				{ alertsPart }
			</div>
		);
	}
}
