export const SET_NEW_SETTINGS = "SetNewSettings";

export const setSettings = (newSettings) => {
    return{
        type: SET_NEW_SETTINGS,
        newSettings
    }
}