
//import { MapScreen } from '../components/MapScreen';
// npm install --save redux-thunk
import styles from "../components/Styling.style";

export const slideUp = (isClicked) => {
    return {
        type: "slideUp",
        clicked: isClicked,
    };
};

export const sendKey = (key) => {
    return {
        type: "sendKey",
        key:key,
    }
}

export const slideDown = (isClicked) => {
    return {
        type: "slideDown",
        clicked: isClicked
    };
};