import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GOOGLE_API_KEY from '../../../API_KEY';

const dot = {
  height: '25px',
  width: '25px',
  backgroundColor: '#bbb',
  borderRadius: '50%',
  display: 'inline-block',
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { center: { lat: 39.31, lng: -96.45 }, zoom: 4.3 };
  }

  render() {
    {
      if (this.props.coordinates !== undefined) {
        var coordinates = this.props.coordinates;
      } else {
        var coordinates = [];
      }
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '600px', width: '1000px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {coordinates.map((eachYear) => {
            return (
              <AnyReactComponent
                lat={eachYear.north}
                lng={eachYear.west}
                text="o"
              ></AnyReactComponent>
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
