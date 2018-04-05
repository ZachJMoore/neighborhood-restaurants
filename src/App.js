import React, { Component } from 'react';
import './App.css';
import GoogleMap from './components/Map';
import SideBar from "./components/SideBar"
import { getRestaurants } from './scripts/zomatoAPI';
import { MenuButton } from './components/MenuButton';

class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      restaurants: [],
      filtered: [],
      networkError: false,
      navIsShown: true
    };

    this.updateFiltered = (array) => {
      this.setState({filtered: array});
    };

    this.changeNavView = ()=>{
      //toggle navigation
      if (this.state.navIsShown){
        this.setState({navIsShown: false});
      } else {
        this.setState({navIsShown: true});
      };
    };

  };

  componentDidMount(){
    getRestaurants()
    .then(data => { //get restaurants from Zomato Api in "src/scripts/zomatoAPI.js"
      this.setState({
        restaurants: data.restaurants,
        filtered: data.restaurants.map(ob => {
          ob.restaurant.isShown = false;
          return ob;
        })
      });
    })
    .catch(error => {
      alert(error.message);
      if (!this.state.networkError) {
        this.setState({networkError: true}); //for error handling in SideBar.js
      }
    });

  };

  render() {
    return (
      <div className="app flex-container">
        <MenuButton changeNavView={this.changeNavView}/>
        <SideBar restaurants={this.state.restaurants} updateFiltered={this.updateFiltered} networkError={this.state.networkError} navIsShown={this.state.navIsShown}/>
        <GoogleMap restaurants={this.state.filtered}/>
      </div>
    );
  };
};

export default App;
