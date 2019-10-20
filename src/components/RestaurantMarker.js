import React, { Component } from "react";

class RestaurantMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false,
      override: false
    };

    this.styles = {
      open: "restaurant-details flex-container column details-shown",
      closed: "restaurant-details flex-container column",
      marker: "marker",
      markerActive: "marker marker-active"
    };

    this.toggleStyles = () => {
      if (this.state.isShown) {
        this.setState({ isShown: false });
        if (this.props.restReferrer !== null) {
          this.props.restReferrer.focus(); //Tab focus redirect: focus on link that sent someone here when item is closed.
        }
      } else {
        this.setState({ isShown: true });
      }
      this.setState({ override: true });
    };
  }

  componentDidUpdate() {
    //logic to show or hide a marker. Specifically when an incoming restaurant value has a isShonw value set to true
    //if isShown is not already true (or false), and the user hasnt overridden it by manually closing the marker, change the isShown value
    if (!this.state.isShown && !this.state.override && this.props.isShown) {
      this.setState({ isShown: true });
    } else if (
      this.state.isShown &&
      !this.props.isShown &&
      !this.state.override
    ) {
      this.setState({ isShown: false });
    }
  }

  UNSAFE_componentWillReceiveProps() {
    //reset override value if the marker is hidden
    if (!this.state.isShown && this.state.override) {
      this.setState({ override: false });
    }
  }

  render() {
    return (
      <section
        className="restaurant-details-container"
        {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}
      >
        {/* marker icon */}
        <a
          ref={"marker"}
          href="#open"
          {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}
          className={
            this.state.isShown ? this.styles.markerActive : this.styles.marker
          }
          onClick={this.toggleStyles}
        >
          {this.props.restaurant.name + " restaurant marker"}
        </a>

        {/* marker details section. */}
        {/* main functionality here: set styles for hidden or shown based on the restaurant isShown value */}
        <section
          className={this.state.isShown ? this.styles.open : this.styles.closed}
        >
          <h2 {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}>
            {this.props.restaurant.name}
          </h2>
          <ul aria-label="searched restaurant list">
            <li {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}>
              Average Cost for Two: {this.props.restaurant.currency}
              {this.props.restaurant.average_cost_for_two}
            </li>
            <li {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}>
              Cuisines: {this.props.restaurant.cuisines}
            </li>
          </ul>
          <p>
            For more information click{" "}
            <a
              href={this.props.restaurant.url}
              {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="more restaurant information"
            >
              here
            </a>
            .
          </p>
          <small>Data provided by Zomato</small>
          <a
            href="#close"
            {...(this.state.isShown ? { tabIndex: 0 } : { tabIndex: -1 })}
            className="close"
            onClick={this.toggleStyles}
            aria-label="close details"
          >
            ×
          </a>
        </section>

        {/* Manage focus */}
        {(() => {
          if (this.state.isShown) {
            this.refs.marker.focus();
          }
        })()}
      </section>
    );
  }
}

export default RestaurantMarker;

// {...(condition ? {bsStyle: 'success'} : {})}
