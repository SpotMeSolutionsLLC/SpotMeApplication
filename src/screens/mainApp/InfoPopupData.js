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
    DATA_CONTAINER_HEIGHT: 150,
}

const styles = StyleSheet.create({
    nameContainer: {
        width: "100%",
        height: 70,

        justifyContent: "center",
        alignItems: "center",
    },
    nameText: {
        width: "100%",

        fontSize: 24,
        fontFamily: "Alleyn",
        fontWeight: "bold",

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
        fontSize: 14,
        fontFamily: "Alleyn_Light",
        fontWeight: "bold",
    },
    entryValue: {
        fontSize: 25,
        fontFamily: "Alleyn",
    }

})

const InfoPopupData = ({ max, current, name }) => {

    return (
        <View
            style={{
                height: CONFIG.DATA_CONTAINER_HEIGHT,
                width: "100%",

                backgroundColor: getColorType(current / max, COLOR_TYPES.BACKGROUND),

                padding: 5,
            }}
        >
            <View //Container for displaying garage name
                style={styles.nameContainer}
            >
                <Text // Name text
                    style={[styles.nameText,{
                        color: getColorType(current / max, COLOR_TYPES.TITLE)
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