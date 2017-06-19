  import React, { Component } from 'react';
  // import { Link } from 'react-router-dom';
  import { populateMemes } from './actions';
  import { connect } from 'react-redux';

    class TopMemeList extends Component {
      constructor(props) {
        super(props);
        this.state = {
          list: []
        }
      }

      componentDidMount() {
        this.props.populateMemes()
        .then(resp => {
          this.setState({list: resp.data});
        })
        .catch(function(err) {
          console.log(err)
        })

      }

      // componentWillUpdate(nextProps, nextState) {
      //   this.state()
      // }

      render() {
        let displayList = this.state.list.map(item => {
          return (
            <div className="meme">
              <img alt={`Meme for ${item.top} ${item.bottom}`} key={item._id} src={item.url}/>
            </div>
          )
        })
      
        return (
          <div>
            <h1>Look at all the pretty memes</h1>
            {displayList}
          </div>
        )
      }
    }

    export default connect(null, { populateMemes })(TopMemeList);