const INITIAL_STATE = {
    isFocused: false,
};

let todoApp = (state, action) => {
    if( typeof state === "undefined"){
        return INITIAL_STATE
    }

    switch(action.type){
        case "setSearchIsFocused":
            
            return {...state, isFocused: action.isFocused};

        default:
            return {...state};
            
    }
};


export default todoApp;