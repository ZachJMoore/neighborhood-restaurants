import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleAPIKey } from '../static/APIKeys';
import RestaurantMarker from "./RestaurantMarker";


class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 42.1192932,
      lng: -77.960866
    },
    zoom: 12
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GoogleAPIKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={0}
        >
          {this.props.restaurants.map(restaurant => {
              let rest = restaurant.restaurant
              return <RestaurantMarker restaurant={rest} key={rest.id} lat={rest.location.latitude} lng={rest.location.longitude} isShown={rest.isShown}/>
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;