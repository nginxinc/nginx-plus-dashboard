/**
 * Copyright 2017-present, Nginx, Inc.
 * Copyright 2017-present, Ivan Poluyanov
 * All rights reserved.
 *
 */

import React from 'react';
import api from '../../../api';
import DataBinder from '../../databinder/databinder.jsx';
import ProgressBar from '../../progressbar/progressbar.jsx';
import GaugeIndicator from '../../gaugeindicator/gaugeindicator.jsx';
import Icon from '../../icon/icon.jsx';
import cacheCalculator from '../../../calculators/caches.js';
import sharedZonesCalculator from '../../../calculators/sharedzones.js';
import utils from '../../../utils.js';
import tooltips from '../../../tooltips/index.jsx';
import { CacheStateTooltip, SharedZoneTooltip } from '../tooltips.jsx';



import ChartsTable from '../../charts-table/index.jsx';
import Chart from '../../chart/index.jsx';


import styles from '../../table/style.css';
import cachesStyles from './style.css';

export const Colors = new Map([
	['used', '#4FA932']
]);
export const Labels = new Map([
	['used', 'Used']
]);

class Table extends ChartsTable {
	getTitle(){
		return 'Caches';
	}

	getHeadRow(){
		return (
			<tr>
				<th/>
				<th>Name</th>
				<th>Used</th>
			</tr>
		);
	}

	getBody(){
		const { activeCharts } = this.state;
console.log(this.props.data)
		return Array.from(this.props.data).map(
			([name, { obj, history }]) => {
				let cn = styles['chart-container'];
				let title = 'Click to view rate graph';
				let chart = null;

				if (activeCharts.includes(name)) {
					cn += ` ${ styles['chart-container_active'] }`;
					title = 'Click to hide rate graph';
					chart = (
						<tr
							key={ `chart_${ name }` }
							className={ styles['chart-row'] }
						>
							<td
								colspan="5"
								className={ styles['left-align'] }
							>
								<Chart
									data={ history }
									colors={ Colors }
									labels={ Labels }
								/>
							</td>
						</tr>
					);
				}

				return [
					<tr
						key={ `data_${ name }` }
						className={ cn }
						title={ title }
						onClick={ this.toggleChart.bind(this, name) }
					>
						<td className={ `${ styles['center-align'] } ${ styles.bdr } ${ styles['chart-icon'] }` }>
							<div className={ styles['chart-icon__icon'] } />
						</td>
						<td className={ `${ styles['left-align'] } ${ styles.bold } ${ styles.bdr }` }>{ name }</td>
						<td>{ obj.used }</td>
					</tr>,
					chart
				];
			}
		);
	}
}






export class Caches extends React.Component {
	static formatReadableBytes(value, measurementUnit){
		return utils.formatReadableBytes(
			value,
			measurementUnit,
			{ 0: 'B', 1: 'KB', 2: 'MB', 3: 'GB', 4: 'TB' }
		);
	}

	render() {
		const { data: { caches: { caches, cachesCharts } } } = this.props;

		return (<div>
			<h1>Caches</h1>

			<table className={ styles.table }>
				<col width="170px" />

				<thead>
					<tr>
						<th>Zone</th>
						<th>
							<span
								className={ styles.hinted }
								{...tooltips.useTooltip(<CacheStateTooltip />, 'hint')}
							>State</span>
						</th>
						<th>
							<span
								className={ styles.hinted }
								{...tooltips.useTooltip('Memory usage = Used memory pages / Total memory pages', 'hint')}
							>Memory usage</span>
						</th>
						<th>Max size</th>
						<th>Used</th>
						<th>
							<span
								className={ styles.hinted }
								{...tooltips.useTooltip('Disk usage = Used / Max size', 'hint')}
							>Disk usage</span>
						</th>
						<th colSpan="3">Traffic</th>
						<th>Hit Ratio</th>
					</tr>

					<tr className={ `${ styles['right-align'] } ${ styles['sub-header'] }` }>
						<th className={ styles.bdr } />
						<th className={ styles.bdr } />
						<th className={ styles.bdr } />
						<th className={ styles.bdr } />
						<th className={ styles.bdr } />
						<th className={ styles.bdr } />
						<th>Served</th>
						<th>Written</th>
						<th className={ styles.bdr }>Bypassed</th>
						<th />
					</tr>
				</thead>

				<tbody>
					{
						Array.from(caches).map(([cacheName, cache]) => {
							return (<tr>
								<td className={ `${ styles.bold } ${ styles.bdr }` }>{ cacheName }</td>
								<td className={ `${ styles.bdr } ${ styles['center-align'] }` }>
									{
										cache.cold ?
											<span {...tooltips.useTooltip('Cold', 'hint')}>
												<Icon type="snowflake" className={ cachesStyles.icon } />
											</span>
										:
											<span {...tooltips.useTooltip('Warm', 'hint')}>
												<Icon type="sun" className={ cachesStyles.icon } />
											</span>
									}
								</td>
								<td className={ styles.bdr }>
									<span {...tooltips.useTooltip(<SharedZoneTooltip zone={cache.slab} />, 'hint')}>
										<ProgressBar percentage={cache.zoneSize || 0} />
									</span>
								</td>
								<td className={ styles.bdr }>
									{
										typeof cache.max_size === 'number' ?
											Caches.formatReadableBytes(cache.max_size, 'GB')
											: <span>&infin;</span>
									}
								</td>
								<td className={ styles.bdr }>{ Caches.formatReadableBytes(cache.size, 'GB') }</td>
								<td className={ styles.bdr }>
									<ProgressBar
										warning={cache.warning}
										danger={cache.danger}
										percentage={typeof cache.max_size !== 'number' ? -1 : cache.used}
									/>
								</td>
								<td className={ styles['right-align'] }>{ Caches.formatReadableBytes(cache.traffic.s_served) }</td>
								<td className={ styles['right-align'] }>{ Caches.formatReadableBytes(cache.traffic.s_written) }</td>
								<td className={ `${ styles.bdr } ${ styles['right-align'] }` }>
									{ Caches.formatReadableBytes(cache.traffic.s_bypassed) }
								</td>
								<td>
									{
										<GaugeIndicator percentage={cache.hit_percents_generic} />
									}
								</td>
							</tr>);
						})
					}
				</tbody>
			</table>

			<div>
				<Table data={cachesCharts} />
			</div>
		</div>);
	}
}

export default DataBinder(Caches, [
	api.slabs.process(sharedZonesCalculator),
	api.http.caches.process(cacheCalculator)
]);
