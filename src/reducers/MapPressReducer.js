import styles from "../components/Styling.style"

const INITIAL_STATE = {
    upClicked: false,
    downClicked: false,
    key:"none",
};

let todoApp = (state, action) => {
    if( typeof state === "undefined"){
        return INITIAL_STATE
    }

    switch(action.type){
        case "slideDown":
            return {...state, downClicked: action.clicked};

        case "slideUp":
            return {...state, upClicked: action.clicked}

        case "sendKey":
            return {...state, key: action.key, upClicked: action.clicked}

        default:
            return {...state};
            
    }
};


export default todoApp;