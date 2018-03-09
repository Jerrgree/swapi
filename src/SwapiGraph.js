import React from 'react';
import Graph from 'react-graph-vis';

const options = {
	layout: {
		hierarchical: false
	},
	edges: {
		color: '#000000',
		arrows: {
			to: false
		}
	},
	physics: {
		enabled: true
	},
	autoResize: true
};

class SwapiGraph extends React.Component {
	state = {
		graph: {
			nodes: [],
			edges: []
		}
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			graph: {
				nodes: nextProps.nodes,
				edges: nextProps.edges
			}
		});
	}

	render() {
		return <Graph graph={this.state.graph} options={options} />;
	}
}

export default SwapiGraph;
