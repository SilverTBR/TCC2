import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

const estilos = StyleSheet.create({
    container:{
        width: moderateScale(270),
        height: moderateScale(150),
        flexDirection: "column",
        backgroundColor: "#E3E3E3"
    },
    tituloContainer:{
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
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
        marginHorizontal: 5,
        marginVertical: 6,
        overflow: "hidden"
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
    },
    dhContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: "center",
    },
    dhContainerItems:{
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    textDH: {
        fontFamily: "Roboto-Regular",
        fontSize: moderateScale(13),
        color: "black",
        textAlign: "center"
    }
})

export {estilos}