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
  modalObjetivo: {
    flexShrink: 1, 
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalObjetivoText: {
    fontSize: moderateScale(20),
    color: "black",
    fontFamily: "Roboto-Medium",

  },
  modalFunc: {
    flexShrink: 1,
    backgroundColor: "#A0A0A0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    justifyContent: "center",
    minHeight: moderateScale(70)
  },
  modalContent: {
    flexShrink: 1,
    flexDirection: "row",
    gap: 6,
    alignItems: "center"
  },
  modalFuncText: {
    fontSize: moderateScale(15),
    color: "white"
  },
  modalAtividades: {
    flexShrink: 1,
    backgroundColor: '#505050',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    justifyContent: "center",
    minHeight: moderateScale(70)
  },
  modalDH: {
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export { estilos };
