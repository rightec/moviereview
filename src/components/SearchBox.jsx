import React, { Component } from "react";

class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.state = { 
        searchbox: "",
     };

     this.onChange = this.onChange.bind(this);
  }

  componentDidMount () {
    // console.log('SearchBox  is on Mount')
  }

  componentDidUpdate () {
   // console.log('SearchBox is on UPDATE')
  }

  onChange = (event) => {
    this.setState({searchbox: event.target.value});
    console.log("SEARCBOX - Text in searchbox is:", event.target.value);
  }


  render (props) {
    return (
      <div>
        <input className='SearchBox' 
            name="fname" 
            type="text" 
            value={this.state.searchbox}
            onChange={this.onChange}
        />
      </div>
    )
  }
}


export default SearchBox
