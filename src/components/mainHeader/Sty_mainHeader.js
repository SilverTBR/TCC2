import { StyleSheet } from "react-native";
import {moderateScale} from 'react-native-size-matters';

const estilosMainHeader = StyleSheet.create({
    header: {
        width: "100%",
        height: moderateScale(70),
        backgroundColor: "#000000",
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        paddingHorizontal: 23,
        alignItems: "center",
        flexDirection: "row",
        paddingTop: 20,
    },
    Titulo: {
        flex: 1, 
        fontFamily: "Inter-VariableFont_slnt,wght",
        fontSize: moderateScale(20),
        color: "white",
        fontWeight: "900",
        textAlign: "center",
        alignContent: "center",
    },
    ViewReturn:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    ReturnFont:{
        fontFamily: "Roboto-Medium",
        fontSize: moderateScale(20),
        color: "white",
    }
});

export {estilosMainHeader}