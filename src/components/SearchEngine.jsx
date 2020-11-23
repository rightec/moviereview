// Search Engine component
// Input text element to enter the text to search
// ...

// import React from 'react'
import './SearchEngine.css'
import React, { Component } from "react";

class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      spinbox: 10,
      selectedOption: "Title",
      searchbox: "",
    };

    this.onInputchange = this.onInputchange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchchange = this.onSearchchange.bind(this);
  }

  onSearchchange = (event) => {
    this.setState({searchbox: event.target.value});
    console.log("Text is:", this.state.searchbox);
  }
  
  onSearchClick(event) {
    console.log("SearchClick event: ", event.target);
    console.log("spinBox is: ", this.state.spinbox);
    console.log("Option is:", this.state.selectedOption);
    console.log("Text is:", this.state.searchbox);
  }

  onInputchange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onChangeValue(event) {
    console.log(event.target.value);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    })
  }

/* const SearchEngine = (props) => { */
    render() {
      const { items } = this.state;
    return (
      <div className='SearchEngine'>
          <h2>SEARCH BOX</h2>
          <input className='SearchBox' 
            name="fname" 
            type="text" 
            value={this.state.searchbox}
            onChange={this.onSearchchange}
          />
          <div className='SearchPanelContainer'>
            <label className='SearchPanel'>
                Item to Show :
                <input className='SearchSpin'
                  name="spinbox"
                  type="number"
                  value={this.state.spinbox}
                  required
                  min="10" 
                  max="20"
                  onChange={this.onInputchange}
                />
              </label>
            <button className='SearchPanel' type="button" onClick={this.onSearchClick}>
              SEARCH
            </button>
            <div className='SearchPanel' onChange={this.onChangeValue}>
              <div className="SearchRadio">
                <label>
                  <input
                    type="radio"
                    value="Title"
                    checked={this.state.selectedOption === "Title"}
                    onChange={this.onValueChange}
                  />
                Title
                </label>
              </div>
              <div className="SearchRadio">
                <label>
                  <input
                    type="radio"
                    value="Anykey"
                    checked={this.state.selectedOption === "Anykey"}
                    onChange={this.onValueChange}
                  />
                  Any key
                </label>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default SearchEngine
