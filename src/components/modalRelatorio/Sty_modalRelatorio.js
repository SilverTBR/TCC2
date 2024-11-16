import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const estilos = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: moderateScale(320),
    maxHeight: moderateScale(600),
    backgroundColor: '#FFFFFF',
  },
  modalObjetivoText: {
    fontSize: moderateScale(20),
    color: "black",
    fontFamily: "Roboto-Medium",
  },
  modal: {
    flexShrink: 1, 
  },
  modalObjetivo: {
    ...this.modal,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalFunc: {
    ...this.modal,
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    justifyContent: "center",
    minHeight: moderateScale(70)
  },
  modalAtividades: {
    ...this.modal,
    backgroundColor: '#505050',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    justifyContent: "center",
    minHeight: moderateScale(70)
  },
  modalHeaderFooter: {
    ...this.modal,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalContent: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center"
  },
  modalFuncText: {
    fontSize: moderateScale(15),
    color: "white"
  },

});

export { estilos };
