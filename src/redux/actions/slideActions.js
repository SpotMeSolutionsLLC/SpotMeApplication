

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