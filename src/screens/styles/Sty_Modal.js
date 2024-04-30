import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const estilosModal = StyleSheet.create({
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
  modalCaixaTextoDestaque: {
    ...this.modalCaixaTexto,
    fontFamily: "Roboto-Bold"
  },
  modalCaixaHeader: {
    width: '100%', 
    justifyContent: 'space-between', 
    flexDirection: 'row',
    alignItems: 'center', 
  }
});

export {estilosModal};
