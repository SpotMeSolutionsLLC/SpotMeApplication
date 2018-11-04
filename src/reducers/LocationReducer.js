import {
  LOCATION_CHANGED,
  CURRENT_LOCATION,
  GET_INPUT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_SJ_API
} from '../actions/types';

const INITIAL_STATE = {
  location: '',
  currentLocation: {},
  inputData: '',
  predictions: {},
  sanjose: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SJ_API:
      return { ...state,
        sanjose: action.payload
      };
    case LOCATION_CHANGED:
      return { ...state,
        location: action.payload
      };
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }
      };
    case GET_INPUT:
      return {
        ...state,
        inputData: action.payload
      };
    case GET_ADDRESS_PREDICTIONS:
      return { ...state,
        predictions: action.payload
      };
    case GET_SELECTED_ADDRESS:
      return { ...state,
        currentLocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        },
        inputData: ''
      };
    default:
      return state;
  }
};
