import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const estilosDropdownlist = StyleSheet.create({
  dropdown: {
    //position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    //maxHeight: '12%',
    zIndex: 2,
    //top: "43%",
    width: '100%',
    height: "100%"
  },
  dropdownItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: moderateScale(38),
  },
  dropdownItemText: {
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: moderateScale(15)
  },
  dropdownItemTextArea: {
    flex: 7,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownItemIcons: {
    flex: 3,
    flexDirection: 'row',
    gap: 5,
  },
  dropdownItemIconsItems: {
    flex: 1,
    //height: '100%',
    alignItems: 'center',
    alignContent: "center",
    justifyContent: "center",
    //paddingTop: 10,

  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
  dropdownItemSelectedText: {
    fontFamily: 'Roboto-Bold',
  },
});

export { estilosDropdownlist };
