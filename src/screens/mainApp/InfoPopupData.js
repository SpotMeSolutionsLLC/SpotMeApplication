// Base React Dependencies
import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native"

// Local dependencies
import {
    getColorType,
    COLOR_TYPES
} from "SpotmeDetached/src/helpers"

const CONFIG = {
    DATA_CONTAINER_HEIGHT: 130,
}

const styles = StyleSheet.create({
    nameContainer: {
        width: "100%",
        height: 50,

        justifyContent: "flex-end",
        alignItems: "center",
    },
    nameText: {
        padding: 5,
        width: "100%",

        fontSize: 24,
        fontFamily: "Alleyn",
        fontWeight: "bold",

        color: "white",

        textAlign: "center",
        textAlignVertical: "center",
    },
    dataListContainer: {

        width: "100%",
        height: 80,

        flexDirection: "row"
    },
    dataListEntry: {
        width: "33.333%",
        height: "100%",

        padding: 5,
        paddingTop: 0,

        justifyContent: "center",
    },
    entryTitle: {
        textAlign: "center",
        fontSize: 14,
        // fontFamily: "Alleyn_Light",
        fontWeight: "bold",
    },
    entryValue: {
        textAlign: "center",
        fontSize: 25,
        fontFamily: "Alleyn",
    }

})

const InfoPopupData = ({ max, current, name }) => {

    return (
        <View
            style={{
                borderRadius: 10,
                overflow: "hidden",
                height: CONFIG.DATA_CONTAINER_HEIGHT,
                width: "100%",

                backgroundColor: getColorType(current / max, COLOR_TYPES.BACKGROUND),
            }}
        >
            <View //Container for displaying garage name
                style={[styles.nameContainer,{
                    backgroundColor: getColorType(current / max, COLOR_TYPES.MAIN)
                }]}
            >
                <View // View displaying the bar letting user know that it's draggable
                    style = {{
                        top: 5,
                        position: "absolute",
                        borderRadius: 10,
                        height:5,
                        width: "40%",
                        backgroundColor: "rgba(255,255,255,0.5)"
                    }}
                />
                <Text // Name text
                    style={[styles.nameText,{
                    }]}
                >
                    {name}
                </Text>
            </View>
            <View // Container split into 3 parts containing valuable garage information
                style={styles.dataListContainer}
            >
                <View // Container containing Open Spots entry
                    style = {styles.dataListEntry}
                >
                    <Text
                        style = {[styles.entryTitle,{
                            color: getColorType(current / max, COLOR_TYPES.LABEL)
                        }]}
                    >
                        Open Spaces
                    </Text>
                    <Text
                        style = {[styles.entryValue,{
                            color: getColorType(current / max, COLOR_TYPES.DATA_VALUE)
                        }]}
                    >
                        {max - current}
                    </Text>
                </View>
                <View // Container containing Total Spots entry
                    style = {styles.dataListEntry}
                >
                    <Text
                        style = {[styles.entryTitle,{
                            color: getColorType(current / max, COLOR_TYPES.LABEL)
                        }]}
                    >
                        Total Spaces
                    </Text>
                    <Text
                        style = {[styles.entryValue,{
                            color: getColorType(current / max, COLOR_TYPES.DATA_VALUE)
                        }]}
                    >
                        {max}
                    </Text>
                </View>
                <View // Container containing Percentage full
                    style = {styles.dataListEntry}
                >
                    <Text
                        style = {[styles.entryTitle,{
                            color: getColorType(current / max, COLOR_TYPES.LABEL)
                        }]}
                    >
                        Percent Full
                    </Text>
                    <Text
                        style = {[styles.entryValue,{
                            color: getColorType(current / max, COLOR_TYPES.DATA_VALUE)
                        }]}
                    >
                        {Math.floor(100 * current / max) + "%"}
                    </Text>
                </View>
            </View>
        </View>
    )
}



export default InfoPopupData