import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';
import {estilosDropdownlist} from './Style_Dropdownlist';

const Dropdownlist = ({
  items,
  selectedItems,
  handleSelect,
  closeDropdown,
  handleEditDeleteModal,
  isEditavel,
}) => {
  // Determinar a altura do ScrollView com base no número de itens
  const dropdownHeight =
  Math.max(Math.min(items.length + 1, 3), 1) * moderateScale(38);

  const handleItemEditDelete = (id, value, isDelete, isCadastro) => {
    closeDropdown(); // Feche o dropdown antes de abrir o modal
    handleEditDeleteModal(id, value, isDelete, isCadastro);
  };

  return (
    <ScrollView
      style={[estilosDropdownlist.dropdown, {height: dropdownHeight}]}>
      {items.map(item => (
        <View
          style={[
            estilosDropdownlist.dropdownItem,
            selectedItems.includes(item.key) &&
              estilosDropdownlist.dropdownItemSelected, // Aplica estilo se estiver selecionado
          ]}
          key={item.key}>
          <TouchableOpacity
            style={estilosDropdownlist.dropdownItemTextArea}
            onPress={() => handleSelect(item.key)}>
            <Text
              style={[
                estilosDropdownlist.dropdownItemText,
                selectedItems.includes(item.key) &&
                  estilosDropdownlist.dropdownItemSelectedText, // Aplica estilo se estiver selecionado
              ]}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item.value}
            </Text>
          </TouchableOpacity>
          <View style={estilosDropdownlist.dropdownItemIcons}>
            {selectedItems.includes(item.key) ? (
              <TouchableOpacity
                style={estilosDropdownlist.dropdownItemIconsItems}
                onPress={() => handleSelect(item.key)}>
                <Icon name="times" size={moderateScale(20)} color="red" />
              </TouchableOpacity>
            ) : (
              isEditavel && (
                <>
                  <TouchableOpacity
                    style={estilosDropdownlist.dropdownItemIconsItems}
                    onPress={() =>
                      handleItemEditDelete(item.key, item.value, false, false)
                    }>
                    <Icon name="pen" size={moderateScale(20)} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={estilosDropdownlist.dropdownItemIconsItems}
                    onPress={() =>
                      handleItemEditDelete(item.key, item.value, true, false)
                    }>
                    <Icon name="trash" size={moderateScale(20)} color="black" />
                  </TouchableOpacity>
                </>
              )
            )}
          </View>
        </View>
      ))}
      {isEditavel && (
        <TouchableOpacity
          style={[
            estilosDropdownlist.dropdownItem,
            estilosDropdownlist.dropdownItemTextArea,
          ]}
          onPress={() => handleItemEditDelete(null, null, false, true)}>
          <Text style={estilosDropdownlist.dropdownItemText}>Adicionar</Text>
          <Icon name="plus" size={moderateScale(20)} color="black" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Dropdownlist;
