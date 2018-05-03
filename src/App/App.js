import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js'
import DistrictRepository from '../helper.js';
import kinderData from '../data/kindergartners_in_full_day_program.js'
import Compare from '../Compare/Compare.js';
import Search from '../Search/Search.js';

class App extends Component {
  constructor( props ){
    super( props );
    this.data = new DistrictRepository(kinderData); //***TEMP workaround***
    this.state = {
        districtsData: null
  }
}

  searchFilter = (userInput) => {
    const sanitizedUserInput = userInput.toUpperCase();
    
    //***TEMP workaround***
    const filteredDistricts = Object.keys( this.data.stats )
    .map( districtKey => this.data.stats[districtKey])
    .filter( district => {
      return district.location.includes( sanitizedUserInput );
    })

    this.setState({ districtsData: filteredDistricts })
  }
  
  componentDidMount() {
    let newData = new DistrictRepository(kinderData)
    this.setState({
      districtsData: newData.stats
    })
  }

  render() {
    if(this.state.districtsData === null) {
      return(
        <p>Please Wait</p>
      )
    }
    return (
      <div className="app"> 
        <Compare />
        <Search
          searchFilter={ this.searchFilter } />
        <CardContainer 
          districtsData={ this.state.districtsData }
        />
      </div>
    );
  }
}


export default App;
