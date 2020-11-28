import React, { Component } from "react";

class Spin extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      spinValue: 1
     };

     this.onInputchange = this.onInputchange.bind(this);
  }

  componentDidMount () {
    console.log('Spin  is on Mount')
  }

  componentDidUpdate () {
    console.log('Spin is on UPDATE')
  }

  onInputchange(event) {
    this.setState({
      spinValue: event.target.value
    });
    console.log('on Input changed',event.target.value);
  }


  render () {
    return (
      <div>
        <input className='SearchSpin'
                name="spinbox"
                type="number"
                value={this.state.spinValue}
                required
                min="1" 
                max="10"
                onChange={this.onInputchange}
            />
      </div>
    )
  }
}


export default Spin
