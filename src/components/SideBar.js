import React, { Component } from "react"
import escapeRegExp from "escape-string-regexp"

class SideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchValue: ""
        }
        this.updateValue = (event) => {
            this.setState({searchValue: event.target.value})
            this.filterRestaurants()
        }
        this.filterRestaurants = () => {
            const match = new RegExp(escapeRegExp(this.state.searchValue), "i")
            let filtered = []
            console.log(this.state.searchValue)
            if (this.state.searchValue !== "") {
                filtered = this.props.restaurants.filter((object) => match.test(object.restaurant.name))
            } else {
                filtered = this.props.restaurants
            }
            
            this.props.updateFiltered(filtered)
        }
    }
    render(){
        return (<nav className="nav">
            <h1 className="text-center nav-title">Neighborhood Restaurants</h1>
            <section className="flex-container column full-width">
                <label htmlFor="filterBox">Filter Restaruants</label>
                <input type="text" id="filterBox" placeholder="Texas Hot" onChange={this.updateValue} value={this.state.searchValue} />
            </section>
            <section className="restaurants-list">
            </section>
            
        </nav>)
    }
}

export default SideBar