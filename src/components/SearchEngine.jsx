// Search Engine component
// Input text element to enter the text to search

import './SearchEngine.css'
import React, { Component } from "react";
import MovieTable from './MovieTable'
import Spin from './SpinBox'
import Check from './CheckBox'
import SearchBox from './SearchBox'

function composePath() {
  let qSearch = ""
  let key = ""

  if (selectedOption === "Title"){
    qSearch = gQueryTitle
    gColomnTitle = gColumnTable
  } else{
    qSearch = gQuerySearch
    gColomnTitle = gColumnTableSearch
  }

  key = searchbox
  let myPath = gPathRoot + qSearch + key  + gApiKey
  console.log('myPath: ', myPath)
  return myPath;
  
}

const gApiKey = "&apikey=7eac09d1"; //My authorization key 
//What i expect from DB as title
const gColumnTable = ["Title","Year", 'imdbID', "Runtime",
                    "Genre","Director","Writer"];
const gColumnTableSearch = ["Title","Year", "imdbID", "Type", 'Poster'];
//set the path to download json file
const gPathRoot = "http://www.omdbapi.com/"
const gQuerySearch = "?s=";
const gQueryTitle = "?t=";


// "http://www.omdbapi.com/?s=Beau&apikey=7eac09d1";
// let gPath = gPathRoot + gQueryForYear + gYearKey + gApiKey;
let gPath = ""
let gColomnTitle=[];
let spinbox = 1;
let selectedOption = "Title";
let searchbox = "";

class SearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      viewTable: false,
      review: {}
    };
    

    this.onInputchange = this.onInputchange.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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


  onSearchChange (event){
    console.log('SEARCH ENGINE onSearchChange',event.target.value);
    searchbox = event.target.value;
  }
  
  
  onSearchClick(event) {
    this.setState({ viewTable: false })
    console.log("SearchClick event: ", event.target);
    console.log("spinBox is: ", spinbox);
    console.log("Option is:", selectedOption);
    console.log("Text is:", searchbox);
    gPath = composePath();
   this.fetchMovieReview()
  }

  onInputchange(event) {
    console.log('SEARCH ENGINE onInputchange',event.target.value);
    spinbox = event.target.value
  }

  onChangeValue(event) {
    console.log('SEARCH ENGINE CHECKBOX onChangeValue',event.target.value);
    selectedOption = event.target.value
  }

  onValueChange(event) {
    console.log('SEARCH ENGINE onValueChange',event.target.value);
  }

    render() {
    return (
      <div className='SearchEngine'>
          <h2>SEARCH BOX</h2>
          <div className='SearchContainer'  onChange={this.onSearchChange}>
            <SearchBox />
          </div>
          <div className='SearchPanelContainer'>
            <label className='SearchPanel' onChange={this.onInputchange}>
                Item to Show :
                <Spin />
              </label>
            <div className='SearchPanel' onChange={this.onChangeValue}>
              <Check />
            </div>
          </div>
          <button className='SearchPanel' type="button" onClick={this.onSearchClick} disabled={this.state.loading}>
              SEARCH
            </button>
          <div id='movieTableId'>
            {console.log("review",this.state.review)}
            {this.state.viewTable === true ? <MovieTable columnsName={gColomnTitle} search={this.state.review} rowToShow={spinbox}/> : null}
          </div>
      </div>      
    )
  }
}

export default SearchEngine
