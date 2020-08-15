import React, {Component} from 'react';
import './result.css';
import {connect} from 'react-redux';
import './result.css';
import * as actions from '../store/actions/index';



class Result extends Component{
  state = {

  }

  fetch_album = (id) => {
    this.props.onFetchAlbum(id, this.props.token);
  }

  render(){
    return (
      <div className="result">
        
          <div className="artist_bio">
          {
            this.props.artist?
            <React.Fragment>
              
              <div className="bio">
                <img src={this.props.artist.image} alt="artist_img" className="artist_img"/>
                <div className="artist_info">Name: {this.props.artist.artist_name}<br/>Genre: {this.props.artist.genre}</div>
              </div>
              
              { 
                this.props.artist.albums.length ?
                <div className="albums_overview">
                  <div className="albums_notation">Albums:</div>
                  <div className="albums">
                    {this.props.artist.albums.map(album => (
                        <div className="album" key={album.id} onClick={() => this.fetch_album(album.id)}>
                          <img src={album.image} alt="album_image" className="album_img" />
                          <div className="album_name">{album.name}</div>
                        </div>
                    ))}
                  </div>
                </div> : null

              }

              {
                this.props.artist.tracks ? 
                <div className="tracks_overview">
                  <div className="tracks_notation">Top Tracks:</div>
                    <div className="tracks">
                    {this.props.artist.tracks.map(track => (
                        <div className="track" key={Math.random()*5}>
                          <img src={track.image} alt="track_image" className="track_img" />
                          <div className="track_name">{track.name}</div>
                        </div>
                    ))} 
                  </div> 
                </div> : null
              }

            </React.Fragment> : null
          }
          </div> 
          
        {
          this.props.album ?
          <div className="album_overview">
            <div className="fetched_album">
              <img src={this.props.album.image} alt="album_image" className="fetched_album_img" />
              <div className="fetched_album_name">Album: {this.props.album.name}<br/>Release date: {this.props.album.release_date}</div>
            </div>
            <table className="fetched_tracks">
                <tbody>
                  {
                    this.props.album.tracks.map(track => (
                        <tr className="fetched_track" key={Math.random()*5}>
                          <td className="track_number">{`${track.num}.`}</td>
                          <td className="track_name">{track.name}</td>
                        </tr>
                    ))

                  }
                </tbody>
              </table>
          </div> : null 
        }

      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    artist: state.data.artist,
    token: state.user.access_token,
    album: state.data.album
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchAlbum: (id,token) => dispatch(actions.fetchAlbum(id,token))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Result);
