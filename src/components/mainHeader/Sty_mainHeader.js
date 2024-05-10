import { StyleSheet } from "react-native";
import {moderateScale} from 'react-native-size-matters';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;


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
        //Tentar ver depois porque não sai shadow
        shadowColor: "black",
        shadowOffset:{
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 20,
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