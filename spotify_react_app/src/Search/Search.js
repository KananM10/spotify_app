import React, {Component} from 'react';
import './search.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';


class Search extends Component{
  
  state = { 
  	artist_name: ''
  }

  artistHandler = (e) => {
  	this.setState({...this.state, artist_name: e.target.value});	

  }

  search_submit = () => {
    if( this.state.artist_name.length > 2 )
      this.props.onSearch(this.state.artist_name, this.props.accessToken); 

    document.querySelector('.input').value = '';
    this.setState({...this.state, artist_name: ''});
    document.querySelector(".input").focus();


  }

  artist_bio = (id) => {
      this.props.onArtistAlbums(id, this.props.accessToken);
      this.props.onArtistTracks(id, this.props.accessToken);

      if(this.props.album) 
        this.props.onClearAlbum();
  }

  render(){
    
    let errorMessage = null;
    if(this.props.errorMessage){
      errorMessage = <div className="errorMessage">{this.props.errorMessage}</div>;
    } 
    
    return (
      <div className="search">

        <div className="search_div">
          <input type="text" placeholder="artist name" className="input" onChange={this.artistHandler}/>
          <button type='button' className="btn" onClick={this.search_submit}>Search</button>
        </div>

        {

         

          !this.props.artists ? errorMessage :
          <div className="results_search">
            {this.props.artists.map(item => (
              <div className="item" key={item.id} onClick={() => this.artist_bio(item.id)}>
                <div className="img_place"><img src={item.image} alt="album_img" className="img" /></div>
                <div className="name">{item.artist_name}</div>

              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    artists: state.data.artists,
    signedIn: state.user.isSignedIn,
    user: state.user.user_name,
    accessToken: state.user.access_token,
    album: state.data.album,
    errorMessage: state.data.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (data,token) => dispatch(actions.setSearch(data,token)),
    onArtistAlbums: (id,token) => dispatch(actions.fetchArtistAlbums(id,token)),
    onArtistTracks: (id,token) => dispatch(actions.fetchArtistTracks(id,token)),
    onClearAlbum: () => dispatch(actions.setClearAlbum())

  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Search);

