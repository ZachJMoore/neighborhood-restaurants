import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import { placeholderRestaurants } from "../static/placeholderRestaurant";

class SideBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchValue: "",
            filtered: [],
            selectionId: ""
        };

        this.updateValue = (event) => {
            this.setState({searchValue: event.target.value, selectionId: ""}, this.filterRestaurants)
        };

        this.filterRestaurants = () => {
            const match = new RegExp(escapeRegExp(this.state.searchValue), "i");
            let filtered = [];

            //filter based on RegExp
            if (this.state.searchValue !== "") {
                filtered = this.props.restaurants.filter((object) => match.test(object.restaurant.name));
            } else {
                filtered = this.props.restaurants;
            };

            //map over and set isShown value. If a item has been selected set isShown to true, otherwise set to false;
            filtered = filtered.map(object => {
                if (object.restaurant.id === this.state.selectionId) {
                    let newObject = object;
                    newObject.restaurant.isShown = true;
                    
                    return newObject;
                } else {
                    let newObject = object;
                    newObject.restaurant.isShown = false;
                    
                    return newObject;
                }
                
            });

            //if no results, return a placeholder
            if (filtered.length === 0){
                filtered = placeholderRestaurants;
            };
            
            //then set filtered state to use for the list.
            this.setState({filtered: filtered});
            //update filtered object property in app.js state to pass down to map
            this.props.updateFiltered(filtered);
        };

        //function to update the selected restaurant, then filter restaurants again
        this.updateSelection = (id, ref) => {
            this.setState({selectionId: id}, this.filterRestaurants);
            this.props.updateReferrer(ref) //update app referer for sending tab focus back once marker is closed
        };

        this.styles = {open: "nav nav-shown", closed: "nav"};
    };


    componentWillReceiveProps(){
        //if no filtered results run filterRestaruants. This keeps the listed items up to date and on first page load
        if (!this.state.filtered.length){
            this.filterRestaurants();
        } else if (this.state.filtered[0].restaurant.placeholder && this.state.searchValue.length === 0 && !this.props.networkError){
            //if the showing restaurant is a placeholder, and there is no search result, and it is not because of a network error, fitler restaurants again to update things.
            //this is needed because of initial state when waiting for ajax request to come back and setState.
            //an empty array is passed until that happens. this also helps if there is a ajax error and it will then just display a placeholder on the map
            this.filterRestaurants();
        };
    };

    render(){
        return (<nav className={this.props.navIsShown ? this.styles.open : this.styles.closed}>
            <h1 className="text-center nav-title" tabIndex={0}>Neighborhood Restaurants</h1>
            <section className="flex-container column full-width search-box-container">
                <label htmlFor="searchBox" className="search-box-label" tabIndex={0}>Search Restaruants:</label>
                <input type="text" id="searchBox" placeholder="e.g. Texas Hot" className="search-box" onChange={this.updateValue} value={this.state.searchValue} aria-label="restaurant search field"/>
            </section>
            <ul className="restaurants-list" aria-label="restaurant search results">
                {this.state.filtered.map(object => <ListItem name={object.restaurant.name} key={object.restaurant.id} id={object.restaurant.id} updateSelection={this.updateSelection}/>)}
            </ul>
            
        </nav>)
    };
};

class ListItem extends Component {
    render(){
        return (<li className="restaurant-li flex-container">
        <a ref="link" className="restaurant-link" href="#item" onClick={()=>{
            this.props.updateSelection(this.props.id, this.refs.link)
        }}>{this.props.name}</a>
    </li>)
    };
};

export default SideBar