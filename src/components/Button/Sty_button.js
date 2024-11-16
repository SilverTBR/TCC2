import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const estilos = StyleSheet.create({
    buttonArea:{
        backgroundColor: "black",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: moderateScale(38),
        paddingHorizontal: 10
    },
    buttonText:{
        fontSize: moderateScale(15),
        fontFamily: "Roboto-Bold",
        color: "white",
    }
});

export {estilos}