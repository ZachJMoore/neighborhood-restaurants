import React, { Component } from "react"

class SideBar extends Component {
    render(){
        return (<nav className="nav">
            <h1 className="text-center nav-title">Neighborhood Restaurants</h1>
            <section className="flex-container column full-width">
                <label htmlFor="filterBox">Filter Restaruants</label>
                <input type="text" id="filterBox"/>
            </section>
            <section className="restaurants-list">
            </section>
            
        </nav>)
    }
}

export default SideBar