import React from 'react';
import Switches from './Switches';
import { Tabs, Tab } from 'material-ui/Tabs';

const TabControl = props => {
	return (
		<Tabs>
			<Tab label="People">
				<Switches list={props.people} onToggle={props.onToggle} />
			</Tab>
			<Tab label="Species">
				<Switches list={props.species} onToggle={props.onToggle} />
			</Tab>
			<Tab label="Films">
				<Switches list={props.films} onToggle={props.onToggle} />
			</Tab>
			<Tab label="Vehicles">
				<Switches list={props.vehicles} onToggle={props.onToggle} />
			</Tab>
			<Tab label="Star Ships">
				<Switches list={props.spaceships} onToggle={props.onToggle} />
			</Tab>
			<Tab>
				<Switches list={props.planets} onToggle={props.onToggle} />
			</Tab>
		</Tabs>
	);
};

export default TabControl;
