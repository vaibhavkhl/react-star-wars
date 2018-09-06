import React, { Component } from 'react';
import { ListGroup, ListGroupItem, PageHeader, Button } from 'react-bootstrap'
import { eraseCookie } from './CookieUtils.js'

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.search = this.search.bind(this);
    this.showPlanetInfo = this.showPlanetInfo.bind(this)
    this.signOut = this.signOut.bind(this)

    this.state = {
      planets: []
    }
  }

  search(query) {
    let url = `https://swapi.co/api/planets/?search=${query}`
    this.callApi(url).then(resp => {
      this.setState({planets: resp.results})
    })
  }

  callApi(url) {
    return fetch(url).then((resp) => {
      return resp.json().then(data => {
        return data
      })
    })
  }

  showPlanetInfo(planetName) {
    let planet = this.state.planets.find((planet) => planet.name == planetName)
    this.setState({
      selectedPlanet: planet
    })
  }

  signOut() {
    eraseCookie('isAuthenticated')
    this.props.history.push('/')
  }

  getStyle(population) {
    if (population < 10000) {
      return {fontSize: '10px'}
    } else if (population < 1000000) {
      return {fontSize: '20px'}
    } else if (population < 100000000) {
      return {fontSize: '30px'}
    } else if (population < 10000000000) {
      return {fontSize: '40px'}
    } else if (population > 10000000000) {
      return {fontSize: '50px'}
    }
  }

  render() {
    let list = []
    this.state.planets.forEach(planet => {
      list.push(<ListGroupItem key={planet.name} style={this.getStyle(planet.population)}
        onClick={() => this.showPlanetInfo(planet.name)}>{planet.name}</ListGroupItem>)
    })

    return (
      <div className="container">
        <PageHeader>
          welcome! <Button onClick={this.signOut}>Signout</Button>
        </PageHeader>
        <div className="row">
          <label>Search</label>
          <input type="search" onChange={(e) => this.search(e.target.value)} />
        </div>

        <div className="row">
          <div className="col-md-4"><ListGroup>{list}</ListGroup></div>
          <div className="col-md-8">
            {this.state.selectedPlanet &&
              <Planet planet={this.state.selectedPlanet}></Planet>
            }
          </div>
        </div>

      </div>
    );
  }
}

export default Search;

function Planet(props) {
  return (
    <div>
      <div><label>Name</label> {props.planet.name}</div>
      <div><label>Climate</label> {props.planet.climate}</div>
      <div><label>Created</label> {props.planet.created}</div>
      <div><label>Diameter</label> {props.planet.diameter}</div>
      <div><label>Gravity</label> {props.planet.gravity}</div>
      <div><label>Orbital Period</label> {props.planet.orbital_period}</div>
      <div><label>Population</label> {props.planet.population}</div>
      <div><label>Rotation Period</label> {props.planet.rotation_period}</div>
      <div><label>Surface Water</label> {props.planet.surface_water}</div>
      <div><label>Terrain</label> {props.planet.terrain}</div>
      <div><label>Url</label> {props.planet.url}</div>
    </div>
  )
}
