import * as actionTypes from './actionTypes';

export const setUserInfo = ( name, access_token ) => {
    return {
        type: actionTypes.SET_USER_INFO,
        userName: name,
        access_token: access_token
    };
};

