import React from 'react';
import axios from 'axios';
import TabControl from './TabControl';
import SwapiGraph from './SwapiGraph';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

const flattener = (prev, next) => {
	if (!prev) {
		return next;
	}

	if (!next) {
		return prev;
	}
	return prev.concat(next);
};

class App extends React.Component {
	state = {
		people: [],
		films: [],
		species: [],
		vehicles: [],
		spaceships: [],
		planets: [],
		nodes: [],
		edges: []
	};

	constructor(props) {
		super(props);
		this.getData('https://swapi.co/api/people/', 'people');
		this.getData('https://swapi.co/api/films/', 'films');
		this.getData('https://swapi.co/api/species/', 'species');
		this.getData('https://swapi.co/api/vehicles/', 'vehicles');
		this.getData('https://swapi.co/api/starships/', 'spaceships');
		this.getData('https://swapi.co/api/planets/', 'planets');
	}

	getData = (url, key) => {
		axios.get(url).then(resp => {
			switch (key) {
				case 'people':
					this.setState(prevState => ({
						people: prevState.people.concat(
							this.transformData(resp.data.results)
						)
					}));
					//console.log(this.state.people);
					this.transformData(resp.data.results);
					break;
				case 'films':
					this.setState(prevState => ({
						films: prevState.films.concat(
							this.transformData(resp.data.results)
						)
					}));
					break;
				case 'species':
					this.setState(prevState => ({
						species: prevState.species.concat(
							this.transformData(resp.data.results)
						)
					}));
					break;
				case 'vehicles':
					this.setState(prevState => ({
						vehicles: prevState.vehicles.concat(
							this.transformData(resp.data.results)
						)
					}));
					break;
				case 'spaceships':
					this.setState(prevState => ({
						spaceships: prevState.spaceships.concat(
							this.transformData(resp.data.results)
						)
					}));
					break;
				case 'planets':
					this.setState(prevState => ({
						planets: prevState.planets.concat(
							this.transformData(resp.data.results)
						)
					}));
					break;
			}

			if (resp.data.next) {
				this.getData(resp.data.next, key);
			}
		});
	};

	transformData = data => {
		return data.map(item => ({
			key: item.url,
			name: item.name || item.title,
			url: item.url,
			neighbors: [
				item.people,
				item.films,
				item.species,
				item.vehicles,
				item.planets,
				item.starships
			].reduce(flattener)
		}));
	};

	onToggle = toggleEvent => {
		if (toggleEvent.toggled) {
			this.setState({
				nodes: this.state.nodes.concat({
					key: toggleEvent.node.url,
					id: toggleEvent.node.url,
					label: toggleEvent.node.name
				})
			});
			let newEdges = toggleEvent.node.neighbors.map(neighbor => ({
				from: toggleEvent.node.url,
				to: neighbor
			}));
			this.setState(prevState => ({
				edges: prevState.edges.concat(newEdges)
			}));
		} else {
			let nodes = this.state.nodes.filter(
				node => node.key !== toggleEvent.node.url
			);

			let edges = this.state.edges.filter(
				edge => edge.from !== toggleEvent.node.url
			);
			this.setState({
				nodes: nodes,
				edges: edges
			});
		}
	};

	render() {
		return (
			<div className="AppDiv">
				<MuiThemeProvider>
					<TabControl
						people={this.state.people}
						films={this.state.films}
						species={this.state.species}
						vehicles={this.state.vehicles}
						spaceships={this.state.spaceships}
						planets={this.state.planets}
						onToggle={this.onToggle}
					/>
					<SwapiGraph
						nodes={this.state.nodes}
						edges={this.state.edges}
					/>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default App;
