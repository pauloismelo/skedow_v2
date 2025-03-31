import {createStore} from 'redux';

import * as types from './types';


const innitialState = {
    isAuthenticated: !!localStorage.getItem('authToken'),
}

const reducer = (state = innitialState, action) => {

    switch(action.type){
        case types.LOGIN:
            localStorage.setItem('authToken', action.token);    
            const stateLogin = {
                ...state,
                isAuthenticated: true
            }
            return stateLogin;

        case types.LOGOUT:
            localStorage.removeItem('authToken');
            const stateLogout = {
                ...state,
                isAuthenticated: false
            }
            
            return stateLogout;

        default:
            return state;
    }
}

const store = createStore(reducer);



export default store;