

const INITIAL_STATE = {
    focusClicked: false,
    blurClicked: false,
    latitude: undefined,
    longitude: undefined,
    toChangeLoc: false,
};

let todoApp = (state, action) => {
    if( typeof state === "undefined"){
        return INITIAL_STATE
    }

    switch(action.type){
        case "focusClick":
            return {...state, focusClicked: action.click};

        case "blurClick":
            return {...state, blurClicked: action.click};

        case "sendLocData":
            return { ...state, latitude: action.latitude, longitude: action.longitude}

        case "sendLocQuery":
            return { ...state, toChangeLoc: action.clicked}
        
        default:
            return {...state};
            
    }
};


export default todoApp;