import { StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";


const estilosGeral = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    main: {
        flex: 8,
        width: "80%",
        backgroundColor: "white",
        maxWidth: 1152
    },
    //Usa dois desses dentro de uma área para pode coisa dois coiso
    areaDois:{
      width: "50%",
    },
    areaInfo:{
        width: "100%",
        borderBottomWidth: moderateScale(1),
        borderColor: "black",
        paddingBottom: 10,
        marginTop: 10
    },
    areaInfoTexto: {
        width: "100%",
        fontSize: moderateScale(13),
        color: "black",
        flexWrap: "wrap",
        fontFamily: "Roboto-Medium"
    },
    areaInfoTitulo: {
        ...this.areaInfoTexto,
        fontSize: moderateScale(15),
        fontFamily: "Roboto-Black",
        color: "black",
    },
    areaInput: {
        width: "100%",
        alignItems: "center",
        gap: 20,
        
    },
    areaTitulo: {
        fontFamily: "Roboto-Bold",
        fontSize: moderateScale(20),
        color: "black",
        marginVertical: 10
    },
    areaInputItem: {
        alignItems: "flex-start",
        width: "100%",
        position: "relative"
    },
    areaInputLabel:{
        fontFamily: "Roboto-Regular",
        fontSize: moderateScale(15),
        color: "black"
    },
    inputG:{
        width: "100%",
        height: moderateScale(38),
        borderWidth: moderateScale(0.5),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10 ,
        flexDirection: "row"
    },
    inputGFontPlaceholder: {
        fontFamily: "Roboto-Regular",
        color: 'rgba(0,0,0,0.39)',
        fontSize: moderateScale(15)
    },
    inputGFont: {
      ...this.inputGFontPlaceholder,
      fontSize: moderateScale(15),
      color: "black",
      
  },

  
    dropdown: {
        position: 'absolute', // Make the dropdown positioned absolutely
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        maxHeight: "14%",
        zIndex: 1, // Ensure the dropdown is on top of other elements
        top: moderateScale(115), // Position it below the TouchableOpacity (height + margin)
        width: '100%', // Or adjust as needed
      },
      dropdownItem: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        flexDirection: "row",
        justifyContent: "space-between"
      },
      dropdownItemText:{
        ...this.inputGFont,
        color: "black",
        fontFamily: "Roboto-regular",
        fontSize: moderateScale(12)
      },
      dropdownItemTextArea: {
        flex: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      dropdownItemIcons: {
        flex: 2,
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginRight: 10,
        justifyContent: "flex-end"
      },
      dropdownItemIconsItems: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        paddingTop: 10,
      },
      dropdownItemDisabled: {
        backgroundColor: "rgba(0,0,0,0.10)"
      },
      dropdownItemSelected: {
        backgroundColor: "rgba(0,0,0,0.10)"
      },
      dropdownItemSelectedText: {
        fontFamily: "Roboto-Bold"
      },
      modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
        justifyContent: "flex-end"
      },
      modalCaixa: {
        width: "100%",
        height: moderateScale(355),
        backgroundColor: "white",
        borderTopLeftRadius: moderateScale(41),
        borderTopRightRadius: moderateScale(41),
        padding: moderateScale(20)
      },
      modalCaixaItems: {
        flex: 1,
        alignItems: "center",
        gap: 20
      },
      modalCaixaTexto: {
        fontFamily: "Roboto-Medium",
        fontSize: moderateScale(15),
        color: "black"
      },
      modalCaixaTextoDestaque:{
        ...this.modalCaixaTexto,
        fontFamily: "Roboto-Bold"
      },
      modalCaixaHeader: {
        width: '100%', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        alignItems: 'center', 
      },
      textoError:{
        fontSize: moderateScale(13),
        color: "red",
        fontFamily: "Roboto-Medium"
      },
      areaFlat: {
        flex: 1,
        alignItems: "center"
      },
      areaSelectImage: {
        width: "100%", 
        height: moderateScale(200), 
        alignItems: "center", 
        justifyContent: "center", 
        borderStyle: "dashed", 
        borderWidth: 5, 
        borderColor: "grey"
      }

})

export {estilosGeral}