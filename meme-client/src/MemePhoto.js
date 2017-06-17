import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MemePhoto.css';

class MemePhoto extends Component {

  render() {
    
    return (
      <div>
        <img src={this.props.url} alt={this.props.name}/>
      </div>
    )


  }
}



export default MemePhoto;
