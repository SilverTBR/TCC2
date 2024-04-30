import {StyleSheet} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { moderateScale } from 'react-native-size-matters';

const estilos = StyleSheet.create({
    buttonArea:{
        backgroundColor: "black",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: moderateScale(38)
    },
    buttonText:{
        fontSize: moderateScale(15),
        fontFamily: "Roboto-Bold",
        color: "white",
    }
});

export {estilos}