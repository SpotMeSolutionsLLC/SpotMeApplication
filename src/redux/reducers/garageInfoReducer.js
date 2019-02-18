const INITIAL_STATE = {
    showInfo: false,
    key: ""
};

let todoApp = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "showInfo":
            return {
                ...state,
                showInfo: action.showInfo,
                key: action.key
            };

        default:
            return {...state};
            
    }
};


export default todoApp;