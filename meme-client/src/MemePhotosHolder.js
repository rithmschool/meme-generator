import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMemePhotos } from './actions';
import MemePhoto from './MemePhoto';

class MemePhotosHolder extends Component {

  componentWillMount() {
    this.props.getMemePhotos();
  }

  // componentWillUpdate(nextProps) {
  //   nextProps.getMemePhotos();
  // }

  render() {

    let photos = [];
    
    if(this.props.memePhotos) {
      photos = this.props.memePhotos.filter((val, i) => i <= 30);
      photos = photos.map((photo, i) => (
        <MemePhoto
          key={i}
          url={photo.url}
          id={photo.id}
          name={photo.name}
          width={photo.width}
          height={photo.height}
        />
      ))
    }
    

    return (
      <div>
        {photos}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    memePhotos: state.memePhotos
  };
}

export default connect(mapStateToProps, { getMemePhotos })(MemePhotosHolder);
