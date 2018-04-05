import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"
import { placeholderRestaurants } from "../static/placeholderRestaurant";

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
            filtered: [],
            selectionId: ""
        }
        this.updateValue = (event) => {
            this.setState({searchValue: event.target.value, selectionId: ""}, this.filterRestaurants)
        }
        this.filterRestaurants = () => {
            const match = new RegExp(escapeRegExp(this.state.searchValue), "i") 
            let filtered = []

            //filter based on RegExp
            if (this.state.searchValue !== "") {
                filtered = this.props.restaurants.filter((object) => match.test(object.restaurant.name))
            } else {
                filtered = this.props.restaurants
            }

            //map over and set isShown value. If a item has been selected set isShown to true, otherwise set to false;
            filtered = filtered.map(object => {
                if (object.restaurant.id === this.state.selectionId) {
                    let newObject = object;
                    newObject.restaurant.isShown = true;
                    
                    return newObject
                } else {
                    let newObject = object;
                    newObject.restaurant.isShown = false;
                    
                    return newObject
                }
                
            })

            //if no results, return a placeholder
            console.log(filtered[0])
            if (filtered.length === 0){
                filtered = placeholderRestaurants
            }
            
            //then set filtered state to use for the list.
            this.setState({filtered: filtered})
            //update filtered object property in app.js state to pass down to map
            this.props.updateFiltered(filtered)
        }

        //function to update the selected restaurant
        this.updateSelection = (id) => {
            this.setState({selectionId: id}, this.filterRestaurants)
            
        }

        this.styles = {open: "nav nav-shown", closed: "nav"}
    }


    componentWillReceiveProps(){
        if (!this.state.filtered.length){
            this.filterRestaurants()
        } else if (this.state.filtered[0].restaurant.placeholder && this.state.searchValue.length === 0 && !this.props.networkError){
            this.filterRestaurants()
        }
    }

    render(){
        return (<nav className={this.props.navIsShown ? this.styles.open : this.styles.closed}>
            <h1 className="text-center nav-title">Neighborhood Restaurants</h1>
            <section className="flex-container column full-width">
                <label htmlFor="filterBox">Filter Restaruants</label>
                <input type="text" id="filterBox" placeholder="e.g. Texas Hot" onChange={this.updateValue} value={this.state.searchValue} />
            </section>
            <ul className="restaurants-list">
                {this.state.filtered.map(object => <ListItem name={object.restaurant.name} key={object.restaurant.id} id={object.restaurant.id} updateSelection={this.updateSelection}/>)}
            </ul>
            
        </nav>)
    }
}

const ListItem = (props) => {
    return (<li>
        <a href="#item" onClick={()=>{
            props.updateSelection(props.id)
        }}>{props.name}</a>
    </li>)
}

export default SideBar