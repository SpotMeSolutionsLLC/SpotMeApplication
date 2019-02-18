export const showInfo = (showInfo, key = "") => {
    return {
        type: "showInfo",
        showInfo: showInfo,
        key: key
    };
};