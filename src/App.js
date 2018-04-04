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
    getRestaurants().then(data => {
      this.setState({restaurants: data.restaurants})
      this.setState({filtered: data.restaurants})
    }).catch(error => {
      alert(error.message)
    })
  }
  render() {
    console.log(this.state.filtered) //able to check to see what value "isShown" is on the list of objects sent to map
    return (
      <div className="App flex-container">
        <SideBar restaurants={this.state.restaurants} updateFiltered={this.updateFiltered}/>
        <GoogleMap restaurants={this.state.filtered}/>
      </div>
    );
  }
}

export default App;
