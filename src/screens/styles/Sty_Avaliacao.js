import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const estiloAvaliacao = StyleSheet.create({
    textTitulo: {
        fontSize: moderateScale(45),
        textAlign: "center",
        color: "black",
        fontFamily: "Roboto-Bold"
    },
    textSubtitulo:{
        fontSize: moderateScale(20),
        textAlign: "center",
        color: "black",
        fontFamily: "Roboto-Medium"
    },
    avalRow: {
        flexDirection: "row",
        height: "60%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    avalImg:{
       resizeMode: "contain",
       width: moderateScale(110),
       height: moderateScale(110),
    },
    avalItem: {
        flex: 1,
        alignItems: "center",
    },
    avalText:{
        fontFamily: "Roboto-Regular",
        fontSize: moderateScale(20),
        color: "#bdc6d1",
    },
    backgroundImage: {
        flex: 1, 
        justifyContent: "center", 
        position: 'absolute', 
        width: '100%', 
        height: '100%'
    },
    return:{
        width: moderateScale(20), 
        height: moderateScale(20), 
        position: "absolute", 
        top: "0%", 
        right: "0%",
    }
})

export {estiloAvaliacao}
