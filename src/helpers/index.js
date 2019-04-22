export const getColor = (percentage) => {
    switch (true) {
        case percentage < 0.25:
            return "#054CE4"; // Blue
        case percentage < 0.5:
            return "#138808"; // Green
        case percentage < 0.75:
            return "#FF6700"; // Orange
        default:
            return "#CC0000"; // Red
    }
}

export const getColorLight = (percentage) => {
    switch (true) {
        case percentage < 0.25:
            return "hsl(221, 100%, 98%)"; // Blue
        case percentage < 0.5:
            return "hsl(115, 35%, 98%)"; // Green
        case percentage < 0.75:
            return "hsl(24, 60%, 98%)"; // Orange
        default:
            return "hsl(0, 40%, 98%)"; // Red
    }
}

export const COLOR_TYPES = {
    TITLE: "TITLE",
    LABEL: "LABEL",
    DATA_VALUE: "DATAVALUE",
    BACKGROUND: "BACKGROUND",
    MAIN: "MAIN"
}

export const MAIN_COLORS = {
    BASE: "#054CE4"
}

export const getColorType = (percentage, type) => {
    switch (true) {
        case percentage < 0.25: // Blue
            switch (type) {
                case COLOR_TYPES.TITLE:
                    return "hsl(221, 50%, 50%)";
                case COLOR_TYPES.LABEL:
                    return "hsl(221, 50%, 40%)";
                case COLOR_TYPES.DATA_VALUE:
                    return "hsl(221, 50%, 50%)";
                case COLOR_TYPES.BACKGROUND:
                    return "hsl(221, 100%, 98%)";
                default: // MAIN
                    return "#054CE4";

            }

        case percentage < 0.5: // Green
            switch (type) {
                case COLOR_TYPES.TITLE:
                    return "hsl(115, 50%, 50%)";
                case COLOR_TYPES.LABEL:
                    return "hsl(115, 50%, 40%)";
                case COLOR_TYPES.DATA_VALUE:
                    return "hsl(115, 50%, 50%)";
                case COLOR_TYPES.BACKGROUND:
                    return "hsl(115, 35%, 98%)";
                default: // MAIN
                    return "#138808";

            }

        case percentage < 0.75: // Orange
            switch (type) {
                case COLOR_TYPES.TITLE:
                    return "hsl(24, 50%, 50%)";
                case COLOR_TYPES.LABEL:
                    return "hsl(24, 50%, 40%)";
                case COLOR_TYPES.DATA_VALUE:
                    return "hsl(24, 50%, 50%)";
                case COLOR_TYPES.BACKGROUND:
                    return "hsl(24, 60%, 98%)";
                default: // MAIN   
                    return "#FF6700";

            }

        default: // Red
            switch (type) {
                case COLOR_TYPES.TITLE:
                    return "hsl(0, 50%, 50%)";
                case COLOR_TYPES.LABEL:
                    return "hsl(0, 50%, 40%)";
                case COLOR_TYPES.DATA_VALUE:
                    return "hsl(0, 50%, 50%)";
                case COLOR_TYPES.BACKGROUND:
                    return "hsl(0, 40%, 98%)";
                default: // MAIN
                    return "#CC0000";

            }
    }
}