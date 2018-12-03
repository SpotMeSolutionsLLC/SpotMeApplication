import styles from "../components/Styling.style"

const INITIAL_STATE = {
    slide: "down", 
    key:"",
};

let todoApp = (state, action) => {
    if( typeof state === "undefined"){
        return INITIAL_STATE
    }

    switch(action.type){
        case "slide":
            return {...state,  key: action.key, slide: action.slide};
            
        default:
            return {...state};
            
    }
};


export default todoApp;