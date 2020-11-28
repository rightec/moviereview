// Search Engine component
// Input text element to enter the text to search

import './SearchEngine.css'
import React, { Component } from "react";
import MovieTable from './MovieTable'
import Spin from './SpinBox'

function composePath(status) {
  let qSearch = ""
  let key = ""

  if (status.selectedOption === "Title"){
    qSearch = gQueryTitle
    gColomnTitle = gColumnTable
  } else{
    qSearch = gQuerySearch
    gColomnTitle = gColumnTableSearch
  }

  key = status.searchbox
  let myPath = gPathRoot + qSearch + key  + gApiKey
  // console.log('myPath: ', myPath)
  return myPath;
  
}

const gApiKey = "&apikey=7eac09d1"; //My authorization key 
//What i expect from DB as title
const gColumnTable = ["Title","Year","Rated","Released","Runtime",
                    "Genre","Director","Writer"];
const gColumnTableSearch = ["Poster","Title","Type","Year","imdbID"];
//set the path to download json file
const gPathRoot = "http://www.omdbapi.com/"
const gQuerySearch = "?s=";
const gQueryTitle = "?t=";
const gSearchKey ="Beau";
const gQueryForYear = "?y=";
const gYearKey = "1980";
// "http://www.omdbapi.com/?s=Beau&apikey=7eac09d1";
// let gPath = gPathRoot + gQueryForYear + gYearKey + gApiKey;
let gPath = ""
let gColomnTitle=[];
let spinbox = 1;
class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: "Title",
      searchbox: "",
      loading: false,
      error: false,
      viewTable: false,
      review: {}
    };
    

    this.onInputchange = this.onInputchange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchchange = this.onSearchchange.bind(this);
  }

  componentDidUpdate() {
    console.log("Search Update")
  }



  // Fetch data from server
  fetchMovieReview = async () => {
    let localreview = {}
    let error = false

    try {
      this.setState({ loading: true })
      console.log('Start Try Catch: ', gPath)
      let response = await fetch(gPath)      
      let data = await response.json()

      if (data.error) throw new Error(data.error)

      localreview = {...data}

      // Work with review
      console.log("localreview is: ", localreview);
      console.log("review is: ", this.state.review);

    } catch (err) {
      console.log('SONO NEL CATCH: ', err)
      error = true
    } finally {
        console.log ("Start Finally and set State")
        this.setState({ viewTable: true, review: localreview, loading: false})
    }
  }


  onSearchchange = (event) => {
    this.setState({searchbox: event.target.value});
    console.log("Text is:", this.state.searchbox);
  }
  
  onSearchClick(event) {
    this.setState({ viewTable: false })
    console.log("SearchClick event: ", event.target);
    console.log("spinBox is: ", spinbox);
    console.log("Option is:", this.state.selectedOption);
    console.log("Text is:", this.state.searchbox);
    gPath = composePath(this.state);
    // console.log("gPath:", this.state.gPath);
   this.fetchMovieReview()
  }

  onInputchange(event) {
    /*this.setState({
      [event.target.name]: event.target.value
    });*/
    console.log('on Input changed',event.target.value);
  }

  onChangeValue(event) {
    console.log('event.target.value',event.target.value);
  }

  onValueChange(event) {
    console.log('onValueChange',event.target.value);
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
          {console.log("spinbox is:", spinbox)}
          <input className='SearchBox' 
            name="fname" 
            type="text" 
            value={this.state.searchbox}
            onChange={this.onSearchchange}
          />
          <div className='SearchPanelContainer'>
            <label className='SearchPanel'>
                Item to Show :
                <Spin />
              </label>
            <button className='SearchPanel' type="button" onClick={this.onSearchClick} disabled={this.state.loading}>
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
          <div id='movieTableId'>
            {console.log("review",this.state.review)}
            {this.state.viewTable === true ? <MovieTable columnsName={gColomnTitle} search={this.state.review}/> : null}
          </div>
      </div>      
    )
  }
}

export default SearchEngine
