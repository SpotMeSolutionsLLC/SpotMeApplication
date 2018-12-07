import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';
import {
    MapScreen
} from '../components/MapScreen';
import {
    RouterComponent
} from '../Router';

const INITIAL_STATE = {
    email: '',
    password: '',
    user: null,
    error: '',
    success: '',
    loading: false
};
export default (state = INITIAL_STATE, action) => {
    // console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:
            //console.log('action!')
            return { ...state,
                email: action.payload
            };
            //make a new object
            //throw everything from existing state object into that object
            //then define the property email
            //overwritten it by action.payload
        case PASSWORD_CHANGED:
            return { ...state,
                password: action.payload
            };
        case LOGIN_USER:
            return { ...state,
                loading: true,
                error: ''
            };
        case LOGIN_USER_SUCCESS:
            //console.log('Success!');
            // this.props.navigation.navigate('DrawerOpen');
            return { ...state,
                ...INITIAL_STATE,
                user: action.payload,
                success: 'Login Success!'
            };
        case LOGIN_USER_FAIL:
            console.log(...state);
            return { ...state,
                error: 'Authentication Failed.',
                password: '',
                loading: false
            };
        default:
            return state;
    }
};