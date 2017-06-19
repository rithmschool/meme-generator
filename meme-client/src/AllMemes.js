import React, { Component } from 'react';
import { memeCreationImages, imageClick } from './actions'
import { connect } from 'react-redux';

class AllMemes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.memeCreationImages()
      .then((res) => {
        // console.log("from allmemes.js", res);
        let list = res.data.data.memes.map((el) => {
          return {
            id: el.id,
            name: el.name,
            url: el.url,
          }
        });
        this.setState({ list });
      })
      .catch((err) => console.log(err));
  }

  // componentDidUpdate() {

  // }

  handleClick(e, el) {
    e.preventDefault();
    this.props.imageClick(e.target.src, e.target.id);
    this.props.history.push(`create`)
    // this.props.history.push(`create/${el.id}`)
  }

  render() {
    debugger;
    let list = this.state.list.map((el) => {
      return (
        <img key={el.id} id={el.id} src={el.url} alt={el.name} onClick={(e) => {this.handleClick(e, el)}}/>
      );
    });
    return (
      <div className="container">
        <p>See all the meme images to choose from!</p>
        <div className="row">
          <div className="col-md-4">
          {list}
          </div>
        </div>
      </div>
    );
  }
}


export default connect(null, { memeCreationImages, imageClick })(AllMemes);