import React from 'react';
import Toggle from 'material-ui/Toggle';
import './Switches.css';

class Switch extends React.Component {
	state = {
		toggled: false
	};

	handleToggle = event => {
		this.setState(prevState => ({ toggled: !prevState.toggled }));
		this.props.onToggle({ node: this.props, toggled: !this.state.toggled });
	};

	render() {
		return (
			<div className="Switch">
				<Toggle label={this.props.name} onToggle={this.handleToggle} />
			</div>
		);
	}
}

const Switches = props => {
	return (
		<div className="SwitchDiv">
			{props.list.map(item => (
				<Switch {...item} onToggle={props.onToggle} />
			))}
		</div>
	);
};

export default Switches;
