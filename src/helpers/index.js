export const getColor = (percentage) => {
    switch(true){
        case percentage < 0.25:
            return "blue";
        case percentage < 0.5:
            return "green";
        case percentage < 0.75:
            return "orange";
        default:
            return "red";
    }
}