import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const estilosModal = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end"
  },
  modalContainer: {
    width: "100%",
    height: moderateScale(355),
    backgroundColor: "white",
    borderTopLeftRadius: moderateScale(41),
    borderTopRightRadius: moderateScale(41),
    padding: moderateScale(20)
  },
  modalContainerItems: {
    flex: 1,
    alignItems: "center",
    gap: 20
  },
  modalCaixaTexto: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(15),
    color: "black"
  },
  modalCaixaTextoDestaque: {
    ...this.modalCaixaTexto,
    fontFamily: "Roboto-Bold"
  },
  modalContainerHeader: {
    width: '100%', 
    justifyContent: 'space-between', 
    flexDirection: 'row',
    alignItems: 'center', 
  }
});

export {estilosModal};
