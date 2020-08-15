import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user_name: '',
    access_token: '',
    signedIn: false

};


const setUserInfo = ( state, action ) => {
    const updatedState = {
        user_name: action.userName,
        access_token: action.access_token,
        signedIn: true
    }
    return updateObject( state, updatedState );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_USER_INFO: return setUserInfo( state, action );
        default: return state;
    }
};

export default reducer;