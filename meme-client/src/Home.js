import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getMemes } from './actions';
import { BASE_URL } from './actions';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memes: [],
      usernames: []
    }
  }

  componentWillMount() {
    this.getMemes();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.brand !== this.props.match.params.brand) {
      this.getMemes();
    }
  }

  getMemes() {
    return axios.get(`${BASE_URL}/memes`).then(res => {
      console.log("memes",res.data);
      let array = res.data;
      this.shuffle(array);
      let memes = array.filter((val, i) => i <= 30);
      this.getUsernames(memes);
      this.setState( {memes} );
    }).catch(err => {
      debugger
    })
  }

  shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
  }

  getUsernames(memes) {
    axios.all(memes.map((meme,i) => {
      return axios.get(`${BASE_URL}/api/users/${meme.user_id}`)
    })).then(res => {
      let usernames = [];
      res.forEach((val, i) => {
        usernames.push(val.data.username);
      })
      this.setState ( {usernames} )
    })
      .catch(err => {
      debugger
    })
  }

  render() {

    let memes = [];

    if(this.state.memes) {
     
      memes = this.state.memes.map((meme, i) => {
        return (
          <div key={i} className="top">
            <img
              key={i}
              src={meme.url}
              alt={meme.name}
            />
            <div>
              Created by {this.state.usernames[i]}
            </div>
          </div>
        )
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
    memes: state.memes
  };
}

export default connect(mapStateToProps, null)(Home);

// export default Home;
