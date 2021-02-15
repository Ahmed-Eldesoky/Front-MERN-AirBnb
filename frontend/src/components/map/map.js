import React, { useEffect, useState } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import axios from "axios";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` ,width:'600px'}} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ lat, lng, allLocations, isMarkerShown, onMarkerClick }) => {
  return (
    <GoogleMap defaultZoom={8} center={{ lat, lng }}>
      {allLocations.map((location) => (
        <Marker
          position={{ lat: location.latitude, lng: location.longitude }}
          onClick={onMarkerClick}
        />
      ))}
    </GoogleMap>
  );
});
export default class MyFancyComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      result: [],
      lat: 26.42231,
      lng: 29.227089,
      // coords: { lat: 26.42231, lng: 29.227089 },
      isMarkerShown: false,
    };
  }
  componentDidMount() {
    this.delayedShowMarker();
    const params = {
      access_key: "297b67d829c2337b2ea79235d44614b0",
      query: `aswan, Egypt`,
    };

    axios
      .get("http://api.positionstack.com/v1/forward", { params })
      .then((response) => {
        this.setState({ result: response.data.data });
        console.log({
          coords: {
            lat: response.data.data[0].latitude,
            lng: response.data.data[0].longitude,
          },
        });

        if (response.data.data.length > 0)
          this.setState({
            lat: response.data.data[0].latitude,
            lng: response.data.data[0].longitude,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };
  render() {
    return (
      <MyMapComponent
        allLocations={this.state.result}
        lat={this.state.lat}
        lng={this.state.lng}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}