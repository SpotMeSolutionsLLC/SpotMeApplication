const INITIAL_STATE = {
    color: ""
}


let toDo = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case "getMarkerColor":
            console.log(action.color);
            return {...state, color: action.color}
        default:
            return {
                ...state,
            }
    }

}

export default toDo;