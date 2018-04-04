import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
            filtered: [],
            selectionId: ""
        }
        this.updateValue = (event) => {
            this.setState({searchValue: event.target.value}, this.filterRestaurants)
        }
        this.filterRestaurants = () => { // v --------- Heres where we are looking --------- v
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
            
            //then set filtered state to use for the list.
            this.setState({filtered: filtered})
            //update filtered object property in app.js state to pass down to map
            this.props.updateFiltered(filtered)
        }
        
        //function to update the selected restaurant
        this.updateSelection = (id) => {
            this.setState({selectionId: id}, this.filterRestaurants)
            
        }
    }

    componentWillReceiveProps(){
        if (this.state.filtered.length < 1) {
            this.setState({filtered: this.props.restaurants})
        }
        
    }
    
    render(){
        return (<nav className="nav">
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