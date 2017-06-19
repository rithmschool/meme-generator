import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { getPictures, savePictures, saveTemp } from './actions';
import { connect } from 'react-redux';

class ChoosePicture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.saveTemp(
      e.target.src
    );
    this.props.history.push('/creatememe/form')
  }

  componentDidMount() {
    this.props.getPictures()
    .then(resp => {
      this.props.savePictures(resp.data.data.memes);
      this.setState({
        photos: resp.data.data.memes
      })
    })
    .catch(err => 
      console.log(err)
    )
  }

  render() {
    let photos = this.state.photos.map(pic => {
        return <img key={pic.id} src={pic.url} alt={pic.name} onClick={this.handleClick}/>
    }) 


    return (
      <div>
        <h1>Click on a picture to create a meme</h1>
        {photos}
      </div>
    )
  }
}



export default connect(null, { getPictures, savePictures, saveTemp })(ChoosePicture);
