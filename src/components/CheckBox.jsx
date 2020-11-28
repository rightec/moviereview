import React, { Component } from "react";

class Check extends Component {
  constructor (props) {
    super(props)
    this.state = { 
        selectedOption: "Title"
     };

     this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidMount () {
    // console.log('Check  is on Mount')
  }

  componentDidUpdate () {
    // console.log('check is on UPDATE')
  }

  onValueChange(event) {
    console.log('CHECK COMP onValueChange',event.target.value);
    this.setState({
      selectedOption: event.target.value
    })
  }


  render () {
    return (
      <div>
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
    )
  }
}


export default Check
