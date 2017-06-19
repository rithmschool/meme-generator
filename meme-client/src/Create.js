import React, { Component } from 'react';
import { imageClick, postMeme } from './actions'
import { connect } from 'react-redux';

class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      top: '',
      bottom: '',
      template_id: this.props.imgLink.template_id,
      user_id: this.props.imgLink.user.user_id
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.postMeme(this.state)
      .then(() => {
        this.props.history.push('/memes');
      },
        (err) => {
          debugger
        })
      .catch((err) => {
        console.log(err);
        this.props.history.push('/memes');
    });
  }

  render() {
    return (
      <div className="container">
        <img src={this.props.imgLink.url} alt="make me a meme" />
        <form onSubmit={this.onSubmit}>
          <h1>Make my meme!</h1>
          <div className="form-group">
            <label htmlFor="top">Top text: </label>
            <input type="text" id="top" name="top" value={this.state.top} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bottom">Bottom text: </label>
            <input type="text" id="bottom" name="bottom" value={this.state.bottom} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-lg">
              Make Meme
              </button>
          </div>
        </form>
      </div>
    );
  }
}
// Signup.contextTypes = {
//   router: PropTypes.object.isRequired
// }

// Signup.propTypes = {
//   signup: PropTypes.func.isRequired
// }

// export default connect(null, { signup })(Signup);

export default connect(imageClick, {postMeme})(Create);