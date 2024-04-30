import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const estilos = StyleSheet.create({
    touchable: {
      width: moderateScale(84),
      height: moderateScale(120)
    },
    container: {
      borderRadius: moderateScale(2),
        flex: 1,
      // maxWidth: 350,
      alignItems: "center",
      //flexWrap: "wrap",
      justifyContent: "center",
      },
    text: {
      color: "black",
      fontFamily: "Roboto-Black",
      fontSize: moderateScale(15),
    },
    foto: {
      height: moderateScale(60),
      width: moderateScale(84),
      resizeMode: "contain",
      backgroundColor: "#E3E3E3"

    },
    containerFilho: {
      width: "100%",
      backgroundColor: "#AAAAAA",
      alignItems: "center"
    }
    
  });
  

export {estilos}