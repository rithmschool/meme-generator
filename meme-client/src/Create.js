import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { postMeme } from './actions';   //saveNewMeme
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: '',
      bottom: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.postMeme(this.props.tempPic, this.props.pics, this.state)
    .then(resp => {
      // this.props.saveNewMeme(resp);
      console.log(resp)
      this.props.history.push('/welcome')
    })
  }


  render() {
    return (
      <div>
        <h3>Choose text to create the meme</h3>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='top' onChange={this.handleChange}/>
          <input type='text' name='bottom' onChange={this.handleChange}/>
          <input type='submit' value="Submit"/>
        </form>
        <img src={this.props.tempPic} key={this.props.tempPic} alt="meme to modify"/>
      </div>
    )
  }  
}

function mapStatetoProps(state) {
  return {
    tempPic: state.tempPic,
    pics: state.pics
  };
}

export default connect(mapStatetoProps, { postMeme })(Create);  //saveNewMeme