import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Map from './components/map.jsx';
import BasicDetails from './components/basicDetails.jsx';
import DataSelection from './components/dataSelection.jsx';
import Axios from 'axios';
import { states } from './state_coordinates';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playCoordinates: [], selectedFile: null, indexes: [] };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.calculateCenter = this.calculateCenter.bind(this);
    this.playMap = this.playMap.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileData = this.fileData.bind(this);
  }

  handleDataChange(event) {
    Axios.get(`/data/?dataType=${event.target.value}`)
      .then((data) => {
        this.setState({ currentData: data.data }, () => {
          this.calculateCenter();
        });
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  playMap() {
    console.log('this.state', this.state);
    let starter = [];
    for (let year = 0; year < this.state.finalCoordinates.length; year++) {
      setTimeout(function () {
        let temp = this.state.playCoordinates;
        temp.push(year);
        setState({ playCoordinates: temp });
      }, 400);
    }
  }

  // On file select (from the pop up)
  onFileChange(event) {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  }

  // On file upload (click the upload button)
  onFileUpload() {
    // Create an object of formData
    console.log('this.state before file this.onFileUpload', this.state);
    const formData = new FormData();
    // Update the formData object
    formData.append(
      'myFile',
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    // Details of the uploaded file
    console.log('formData', formData);
    // Request made to the backend api
    // Send formData object
    Axios.post('/data', formData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // File content to be displayed after
  // file upload is complete
  fileData() {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{' '}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  calculateCenter() {
    let coordinates = [];
    for (let row = 0; row < this.state.currentData.length; row++) {
      //total for each
      let northTotal = 0;
      let westTotal = 0;
      //total sum of data, to be divided later
      let totalData = 0;
      for (let eachState = 0; eachState < states.length; eachState++) {
        //create variables from state data for ease
        const dataAmount = this.state.currentData[row][
          states[eachState]['name']
        ];
        // console.log(states[eachState]['name'], dataAmount);
        const northCoord = states[eachState]['north'];
        const westCoord = states[eachState]['west'];
        //get totals for coordinates
        if (dataAmount === undefined) {
        }
        if (dataAmount !== 0 || dataAmount !== undefined) {
          northTotal += dataAmount * northCoord;
          westTotal += dataAmount * westCoord;
          //get totalAmount
          totalData += dataAmount;
        }
      }
      //creating averages
      let northAverage = northTotal / totalData;
      let westAverage = westTotal / totalData;
      //creating final object
      let yearObj = {
        year: this.state.currentData[row]['Year'],
        north: northAverage,
        west: westAverage * -1,
      };
      //push final object into array
      coordinates.push(yearObj);
    }
    this.setState({ finalCoordinates: coordinates });
  }

  componentDidMount() {
    Axios.get('/indexes').then((data) => {
      this.setState({ indexes: data.data });
    });
  }

  render() {
    console.log('this.state.indexes', this.state.indexes);
    return (
      <div>
        <Map coordinates={this.state.finalCoordinates} />

        <div style={{ marginTop: '20px' }}>
          <DataSelection
            handleDataChange={this.handleDataChange}
            state={this.state}
          />
        </div>

        {/* <BasicDetails />
        <PlayButton playMap={this.playMap} /> */}
        <div style={{ marginTop: '20px' }}>
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          {this.fileData()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
