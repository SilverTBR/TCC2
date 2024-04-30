import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const estilos = StyleSheet.create({
    container:{
        width: moderateScale(300),
        height: moderateScale(88),
        flexDirection: "row",
        backgroundColor: "#E3E3E3"
    },
    tituloContainer:{
        width: moderateScale(124),
        gap:10,
        justifyContent: "center",
        alignItems:"center"

    },
    tituloContainerConteudo: {
        flexDirection: "row",
        alignItems:"center",
        gap: 10
    },
    FuncAtiviContainer:{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#505050"
    },
    FuncAtivi: {
        flex: 1,
        marginLeft: 10
    },

    objetivo:{
        fontFamily: "Roboto-Medium",
        fontSize: moderateScale(20),
        color: "black"
    },  

    tituloContainerDataHora:{
        fontFamily: "Roboto-Regular",
        fontSize: moderateScale(13),
        color: "black"
    },


    conteudoText: {
        color: "white",
        fontSize: moderateScale(15)
    }
})

export {estilos}