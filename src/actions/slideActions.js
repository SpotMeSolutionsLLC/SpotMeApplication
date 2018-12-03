
//import { MapScreen } from '../components/MapScreen';
// npm install --save redux-thunk
import styles from "../components/Styling.style";

export const slideUp = (key) => {
    return {
        type: "slide",
        slide: "up",
        key: key,
    };
};
export const slideDown = () => {
    return {
        type: "slide",
        slide: "down",
        key: "",
    };
};