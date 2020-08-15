import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    artists: null,
    artist: null,
    album: null
};


const setFound = ( state, action ) => {
    // console.log(action.data.artists.items);
    let updatedState = action.data.artists.items.map( artist => (
        {
            artist_name: artist.name,
            image: artist.images[0].url,
            id: artist.id,
            genre: artist.genres[0]
        }
    ));
    return updateObject( state, {artists: updatedState} );
};

const searchFail = (state, action) => {
    // console.log(action.error);
    return updateObject( state, {errorMessage: 'Artist Not Found', artists: null} );
};

const fetchArtistAlbums = (state, action) => {
    // console.log(action.data);
    let artist_index = state.artists.findIndex(artist => artist.id === action.id);
    let updated_artist_bio = state.artists[artist_index];


    let updatedState = action.data.data.items.map( album => (
        {
            image: album.images[0].url,
            id: album.id,
            name: album.name,
            release_date: album.release_date
        }
    ));

    let updated_artist = {
        ...state.artist,
        albums: updatedState,
        ...updated_artist_bio
    };

    return updateObject( state, {artist: updated_artist} );
};

const fetchArtistAlbumsFail = (state,action) => {
    console.log(action.error);
    return state;
};

const fetchArtistTracks = (state, action) => {
    // console.log(action.data);
    let updatedState = action.data.data.tracks.map( track => (
        {
            image: track.album.images[0].url,
            id: track.id,
            name: track.name
        }
    ));

    let updated_artist = {
        ...state.artist,
        tracks: updatedState
    };

    return updateObject( state, {artist: updated_artist} );
};

const fetchArtistTracksFail = (state, action) => {
    console.log(action.error);
    return state;
};


const fetchAlbum = (state, action) => {
    // console.log(action.data);
    let album_index = state.artist.albums.findIndex(album => album.id === action.id);
    let album = state.artist.albums[album_index];


    let updatedState = action.data.data.items.map( track => (
        {
            id: track.id,
            name: track.name,
            num: track.track_number
        }
    ));

    let updated_album = {
        tracks: updatedState,
        ...album
    };

    return updateObject( state, {album: updated_album} );
};

const fetchAlbumFail = (state,action) => {
    console.log(action.error);
    return state;
};


const setClear = (state, action) => {
    return updateObject(state, {artists: null, artist: null, album: null} );
}

const setClearAlbum = (state, action) => {
    return updateObject(state, {album: null} );
}




const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_SUCCESS: return setFound( state, action );
        case actionTypes.FETCH_FAIL: return searchFail( state, action );

        case actionTypes.FETCH_ARTIST_ALBUMS_SUCCESS: return fetchArtistAlbums( state, action );
        case actionTypes.FETCH_ARTIST_ALBUMS_FAIL: return fetchArtistAlbumsFail(state,action);

        case actionTypes.FETCH_ARTIST_TRACKS_SUCCESS: return fetchArtistTracks( state, action );
        case actionTypes.FETCH_ARTIST_TRACKS_FAIL: return fetchArtistTracksFail(state, action);
        
        case actionTypes.FETCH_ALBUM_SUCCESS: return fetchAlbum( state, action );
        case actionTypes.FETCH_ALBUM_FAIL: return fetchAlbumFail(state,action);
        
        case actionTypes.SET_CLEAR: return setClear(state, action);
        case actionTypes.SET_CLEAR_ALBUM: return setClearAlbum(state, action);

        default: return state;
    }
};

export default reducer;