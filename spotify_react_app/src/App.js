import React, {Component} from 'react';
import logo from './assets/logo.svg';
import Search from './Search/Search';
import Result from './Result/Result';
import queryString from 'query-string';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component{
  state = {

  }

  componentDidMount() {
    
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if(accessToken){
      fetch('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then(response => response.json())
      .then(data => this.props.onMount(data.display_name, accessToken ));
      // .catch(error => window.location = `http://localhost:8888/login`)
    }

  }

  clear = () => {
    this.props.onClear();
  }

  render(){
    return (
      <div className="App">
      {!this.props.signedIn ?
        <button onClick={ () => {
                  window.location = `http://localhost:8888/login` 
                }
              }
            style={{padding: '10px', 'fontSize': '20px', 'margin': '8px auto', 'height': '45px', 'gridColumn': '1/-1'}}>Sign in with Spotify</button>
        : 
        <React.Fragment>
          <div className="header">
            <div className="header_element" onClick={this.clear}>
              <img src={logo} alt="icon" className="logo_icon"/>
              <span className="proj_name">Spotify</span>
            </div>
          </div>
          <Search />
          <Result />
        </React.Fragment>
      }
    </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    signedIn: state.user.signedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMount: (name, access_token) => dispatch(actions.setUserInfo(name, access_token)),
    onClear: () => dispatch(actions.setClear())
  };
};



export default connect(mapStateToProps,mapDispatchToProps)(App);



// ${process.env.BACK_PORT}
// export BACK_PORT=8888 && export SPOTIFY_CLIENT_ID=b39b80d9fe2e42afbc18afaf9e6e3e81 && export SPOTIFY_CLIENT_SECRET=7fc85bd2e90d483bb220598ca4ccb89e && export FRONT_PORT=3000