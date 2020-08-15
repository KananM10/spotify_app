import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchSuccess = (data) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        data: data
    };
};

export const fetchFail = ( error ) => {
    return {
        type: actionTypes.FETCH_FAIL,
        error: error
    };
}

export const setSearch = ( data, token ) => {
    const Data = data.replace(' ', '%20');
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${Data}&type=artist&limit=4`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };

    return dispatch => {
        axios(options)
            .then(res => dispatch(fetchSuccess(res.data)))
			.catch(err => dispatch(fetchFail(err)));
    };
};


export const fetchArtistAlbumsSuccess = (data,id) => {
    return {
        type: actionTypes.FETCH_ARTIST_ALBUMS_SUCCESS,
        data: data,
        id: id
    };
};

export const fetchArtistAlbumsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ARTIST_ALBUMS_FAIL,
        error: error
    };
}

export const fetchArtistAlbums = ( id, token ) => {
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists/${id}/albums?market=ES&include_groups=album&limit=5`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    };
    return dispatch => {
        axios(options)
            .then(res => dispatch(fetchArtistAlbumsSuccess(res,id)))
            .catch(err => dispatch(fetchArtistAlbumsFail(err)));
    };
};

export const fetchArtistTracksSuccess = (data,id) => {
    return {
        type: actionTypes.FETCH_ARTIST_TRACKS_SUCCESS,
        data: data,
        id: id
    };
};

export const fetchArtistTracksFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ARTIST_TRACKS_FAIL,
        error: error
    };
}

export const fetchArtistTracks = ( id, token ) => {
    
    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE&limit=10`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
    return dispatch => {
        axios(options)
            .then(res => dispatch(fetchArtistTracksSuccess(res,id)))
            .catch(err => dispatch(fetchArtistTracksFail(err)));
    };
};

export const fetchAlbumSuccess = (data, id) => {
    return {
        type: actionTypes.FETCH_ALBUM_SUCCESS,
        data: data,
        id: id
    };
};

export const fetchAlbumFail = (error) => {
    return {
        type: actionTypes.FETCH_ALBUM_FAIL,
        error: error
    };
};


export const fetchAlbum = (id, token) => {

    const options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/albums/${id}/tracks`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
    return dispatch => {
        axios(options)
            .then(res => dispatch(fetchAlbumSuccess(res,id)))
            .catch(err => dispatch(fetchAlbumFail(err)));
    };
};

export const setClear = () => {
    return {
        type: actionTypes.SET_CLEAR
    };
};

export const setClearAlbum = () => {
    return {
        type: actionTypes.SET_CLEAR_ALBUM
    };
};