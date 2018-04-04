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
    }
    this.updateFiltered = (array) => {
      this.setState({filtered: array})
    }
  }

  componentDidMount(){
    getRestaurants()
    .then(data => { //get restaurants from Zomato Api in "src/scripts/zomatoAPI.js"
      this.setState({
        restaurants: data.restaurants
      })
    })
    .catch(error => {
      alert(error.message)
    })
  }
  render() {
    console.log(this.state.filtered) //log the filtered value which is abtained through SideBar.js
    return (
      <div className="App flex-container">
        <SideBar restaurants={this.state.restaurants} updateFiltered={this.updateFiltered} />
        <GoogleMap restaurants={this.state.filtered}/>
      </div>
    );
  }
}

export default App;
