import { makeStyles } from "@material-ui/core/styles";
import { themeColors } from "theme.styles";

export const useStyles = makeStyles({
    root: {
        width: 42,
        height: 26,
        padding: 0,
    },
    switchBase: {
        padding: 1,
        "&$checked": {
            transform: "translateX(16px)",
            color: "white",
            "& + $track": {
                backgroundColor: themeColors.yellow,
                opacity: 1,
                border: "none",
            },
        },
    },
    thumb: {
        marginTop: 1,
        width: 22,
        height: 22,
    },
    track: {
        borderRadius: 26 / 2,
        opacity: 1,
        backgroundColor: themeColors.yellow,
    },
    checked: {},
    focusVisible: {},
});
