/**
 * Copyright 2022-present, F5, Inc.
 * Copyright 2022-present, Eyal Pery
 * All rights reserved.
 *
 */

import React from 'react';
import SortableTable from '../../table/sortabletable.jsx';
import TableSortControl from '../../table/tablesortcontrol.jsx';
import styles from '../../table/style.css';

export default class ProtectedObjects extends SortableTable {
	render() {
		const { data } = this.props;
		let component = null;

		if (data) {
			const protected_objects = Array.from(data);

			if (this.state.sortOrder === 'desc') {
				protected_objects.sort(([nameA, a], [nameB, b]) => a.alert ? -1 : 1);
			}

			component = (<div>
				<h1>NAP DOS Protected Objects</h1>

				<table className={ styles.table }>
					<thead>
						<tr>
							<TableSortControl order={this.state.sortOrder} onChange={this.changeSorting} />
							<th>Name</th>
							<th>Health</th>
							<th>Under Attack</th>
							<th colSpan={2}>Traffic</th>
							<th>Learning</th>
							<th>Protocol</th>
							<th>Mitigation Mode</th>
							<th>Signatures</th>
							<th>Bad Actors</th>
						</tr>
						<tr className={ `${ styles['right-align'] } ${ styles['sub-header'] }` }>
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
							<th>Req/s</th>
							<th className={ styles.bdr }>Mitigations/s</th>
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
							<th className={ styles.bdr } />
						</tr>
					</thead>
					<tbody className={ styles['right-align'] }>
						{
							protected_objects.map(([name, po]) => {
								let status = styles.ok;

								if (po.attack !== null && po.attack && po.health != null && po.health >= 1) {
									status = styles.alert;
								} else if ((po.attack !== null && po.attack) || (po.health != null && po.health > 0.9)) {
									status = styles.warning;
								}

								return (<tr>
									<td className={ status } />
									<td className={ `${ styles['left-align'] } ${ styles.bold } ${ styles.bdr }` }>{ name }</td>
									<td>{ po.health === null ? '-' : po.health < 1 ? 'good' : 'bad' }</td>
									<td>{ po.attack === null ? '-' : po.attack ? 'yes' : 'no' }</td>
									<td>{ po.rps }</td>
									<td>{ po.mps }</td>
									<td>{ po.learning === null ? '-' : po.learning.replace('_', ' ') }</td>
									<td>{ po.protocol === null ? '-' : po.protocol }</td>
									<td>{ po.mode === null ? '-' : po.mode }</td>
									<td>{ po.sig === null ? '-' : po.sig ? 'on' : 'off' }</td>
									<td>{ po.ba === null ? '-' : po.ba ? 'on' : 'off' }</td>
								</tr>);
							})
						}
					</tbody>
				</table>
			</div>);
		}

		return component;
	}
}

/*
export default DataBinder(ProtectedObjects, [
	apiDos.protected_objects.process()
]);
 */
