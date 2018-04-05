import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/Map';
import SideBar from "./components/SideBar"
import { getRestaurants } from './scripts/zomatoAPI';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurants: [],
      filtered: [],
      networkError: false
    }
    this.updateFiltered = (array) => {
      this.setState({filtered: array})
    }
  }

  componentDidMount(){
    getRestaurants()
    .then(data => { //get restaurants from Zomato Api in "src/scripts/zomatoAPI.js"
      this.setState({
        restaurants: data.restaurants,
        filtered: data.restaurants.map(ob => {
          ob.restaurant.isShown = false;
          return ob
        })
      })
    })
    .catch(error => {
      alert(error.message)
      if (!this.state.networkError) {
        this.setState({networkError: true})
      }
    })
  }
  render() {
    console.log(this.state.filtered) //log the
    return (
      <div className="App flex-container">
        <SideBar restaurants={this.state.restaurants} updateFiltered={this.updateFiltered} networkError={this.state.networkError}/>
        <GoogleMap restaurants={this.state.filtered}/>
      </div>
    );
  }
}

export default App;
