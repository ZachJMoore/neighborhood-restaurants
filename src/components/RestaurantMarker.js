import React, { Component } from "react"

class RestaurantMarker extends Component {

    constructor(props){
        super(props);

        this.state = {
            isShown: false,
            override: false
        };

        this.styles = {open: "restaurant-details flex-container column details-shown", closed: "restaurant-details flex-container column"};

        this.toggleStyles = () => {
            if (this.state.isShown){
                this.setState({isShown: false})
            } else {
                this.setState({isShown: true})
            }
            this.setState({override: true})
        };

    };

    componentDidUpdate(){
        //logic to show or hide a marker. Specifically when an incoming restaurant value has a isShonw value set to true
        //if isShown is not already true (or false), and the user hasnt overridden it by manually closing the marker, change the isShown value
        if (!this.state.isShown && !this.state.override && this.props.isShown){
            this.setState({isShown: true});
        } else if (this.state.isShown && !this.props.isShown && !this.state.override){
            this.setState({isShown: false});
        };
    };

    componentWillReceiveProps(){
        //reset override value if the marker is hidden
        if (!this.state.isShown && this.state.override){
            this.setState({override: false});
        };
    };

    render(){
        return (<section className="restaurant-details-container">

            {/* marker icon */}
            <a href="#open" className="marker" onClick={this.toggleStyles}>{this.props.restaurant.name + " restaurant marker"}</a>

            {/* marker details section. */}
            {/* main functionality here: set styles for hidden or shown based on the restaurant isShown value */}
            <section className={this.state.isShown ? this.styles.open : this.styles.closed}>
                <h2 tabIndex={0}>{this.props.restaurant.name}</h2>
                <ul aria-label="searched restaurant list">
                    <li tabIndex={0}>Average Cost for Two: {this.props.restaurant.currency}{this.props.restaurant.average_cost_for_two}</li>
                    <li tabIndex={0}>Cuisines: {this.props.restaurant.cuisines}</li>
                </ul>
                <p>For more information click <a href={this.props.restaurant.url} target="_blank" aria-label="more restaurant information">here</a>.</p>
                <a href="#close" className="close" onClick={this.toggleStyles} aria-label="close details">×</a>
            </section>

        </section>)
    };
};

export default RestaurantMarker