import React, { Component } from 'react';
import { getRecentMemes } from './actions'
import { connect } from 'react-redux';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.props.getRecentMemes()
    .then((res) => {
      // console.log("from welcome.js -> actions.js", res);
      let list = res.data.map((el) => {
        return {
          url: el.url,
          _id: el._id,
          top: el.top,
          bottom: el.bottom
        }
      });
      this.setState({ list });
    })
    .catch((err) => console.log(err));
  }

  // componentDidUpdate() {

  // }

  render() {
    let list = this.state.list.reverse().slice(0, 30).map((el) => {
      return (
        <div key={el._id}>
          <img src={el.url} alt={`${el.top} ${el.bottom}`} />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          {list}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getRecentMemes })(Welcome);