import React, { Component } from "react"

class RestaurantMarker extends Component {
    constructor(props){
        super(props)
        this.state = {
            isShown: false,
            override: false
        }
        this.styles = {open: "restaurant-details flex-container column details-shown", closed: "restaurant-details flex-container column"}

        this.toggleStyles = () => {
            if (this.state.isShown){
                this.setState({isShown: false})
            } else {
                this.setState({isShown: true})
            }
            this.setState({override: true})
        }
    }

    componentDidUpdate(){

        if (!this.state.isShown && !this.state.override && this.props.isShown){
            this.setState({isShown: true})
        } else if (this.state.isShown && !this.props.isShown && !this.state.override){
            this.setState({isShown: false})
        }
    }

    componentWillReceiveProps(){
        if (!this.state.isShown && this.state.override){
            this.setState({override: false})
        }
    }

    render(){
        return (<section className="restaurant-details-container">
            <a href="#open" className="marker" onClick={this.toggleStyles}>{this.props.restaurant.name}</a>

            <section className={this.state.isShown ? this.styles.open : this.styles.closed}>
                <a href="#close" className="close" onClick={this.toggleStyles}>×</a>
                <h2>{this.props.restaurant.name}</h2>
                <ul>
                    <li>Average Cost for Two: {this.props.restaurant.currency}{this.props.restaurant.average_cost_for_two}</li>
                    <li>Cuisines: {this.props.restaurant.cuisines}</li>
                </ul>
                <p>For more information click <a href={this.props.restaurant.url} target="_blank">here</a>.</p>
            </section>

        </section>)
    }
}

export default RestaurantMarker