/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * Copyright 2017-present, Igor Meleschenko
 * All rights reserved.
 *
 */

import React from 'react';
import { formatReadableBytes } from '../../../utils';
import SortableTable from '../../table/sortabletable.jsx';
import TableSortControl from '../../table/tablesortcontrol.jsx';
import { useTooltip } from '../../../tooltips/index.jsx';
import styles from '../../table/style.css';

export default class StreamZones extends SortableTable {
	get SORTING_SETTINGS_KEY() {
		return 'streamZonesSortOrder';
	}

	render() {
		const { data } = this.props;
		let component = null;

		if (data) {
			const zones = Array.from(data);

			if (this.state.sortOrder === 'desc') {
				zones.sort( ([nameA, a], [nameB, b]) => {
					if (a.alert || a.warning) {
						return -1;
					}

					return 1;
				});
			}

			component = (<div>
				<h1>Server Zones</h1>

				<table styleName="table wide">
					<thead>
						<tr>
							<TableSortControl order={this.state.sortOrder} onChange={this.changeSorting} />
							<th>Zone</th>
							<th colSpan="3">Requests</th>
							<th colSpan="6">Responses</th>
							<th colSpan="4">Traffic</th>
						</tr>
						<tr styleName="right-align sub-header">
							<th styleName="bdr" />
							<th>Current</th>
							<th>Total</th>
							<th styleName="bdr">Req/s</th>
							<th>1xx</th>
							<th>2xx</th>
							<th>3xx</th>
							<th>4xx</th>
							<th>5xx</th>
							<th styleName="bdr">Total</th>
							<th>Sent/s</th>
							<th>Rcvd/s</th>
							<th>Sent</th>
							<th>Rcvd</th>
						</tr>
					</thead>
					<tbody styleName="right-align">
						{
							zones.map(([name, zone]) => {
								let status = 'ok';

								if (zone.warning) {
									status = 'warning';
								} else if (zone['5xxChanged']) {
									status = 'alert';
								}

								return (<tr>
									<td styleName={ status } />
									<td styleName="left-align bold bdr">{ name }</td>
									<td>{ zone.processing }</td>
									<td>{ zone.requests }</td>
									<td styleName="bdr">{ zone.zone_req_s }</td>
									<td>{ zone.responses['1xx'] }</td>
									<td>{ zone.responses['2xx'] }</td>
									<td>{ zone.responses['3xx'] }</td>
									<td styleName={`flash ${zone['4xxChanged'] ? 'red-flash' : ''}`}>
										<span
											styleName="hinted"
											{ ... useTooltip(<div>4xx: { zone.responses['4xx'] } <br /> 499/444/408: { zone.discarded }</div>, 'hint') }
										>
											{ zone.responses['4xx'] + zone.discarded }
										</span>
									</td>
									<td styleName={`flash ${zone['5xxChanged'] ? 'red-flash' : ''}`}>{ zone.responses['5xx'] }</td>
									<td styleName="bdr">{ zone.responses.total }</td>
									<td styleName="px60">{ formatReadableBytes(zone.sent_s) }</td>
									<td styleName="px60">{ formatReadableBytes(zone.rcvd_s) }</td>
									<td styleName="px60">{ formatReadableBytes(zone.sent) }</td>
									<td styleName="px60">{ formatReadableBytes(zone.received) }</td>
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
