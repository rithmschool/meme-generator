import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getMemes } from './actions';
import { BASE_URL } from './actions';
import { deleteAJAXCall } from './actions';
import './Home.css';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     memes: [],
  //     usernames: []
  //   }
  // }

  componentWillMount() {
    console.log("will props",this.props)
     // this.props.memes is an empty array
    this.props.getMemes();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.memes !== this.props.match.memes) {
      this.props.getMemes();
    }
  }

  render() {

    let memes = [];
    console.log("MEMES", this.props.memes)

    let button = null;
    
    if(this.props.memes) { // changed from state.memes
     
      memes = this.props.memes.map((meme, i) => {
        if (meme.user_id === this.props.user.user_id) {
          button = <button className="btn btn-danger" onClick={() => this.props.deleteAJAXCall(this.props.user.user_id, meme._id)}>X</button>
        } else {
          button = null;
        }
        if(meme) {
          return (
            <div key={i} className="top">
              <img
                key={i}
                src={meme.url}
                alt={meme.name}
              />
              <div>
              {button}
              </div>
            </div>
          )
        } else {
          return null;
        }
      })
      
    }
    

    return (
      <div>
        {memes}
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    memes: state.memes,
    user: state.user
  };
}

export default connect(mapStateToProps, { deleteAJAXCall, getMemes })(Home);
