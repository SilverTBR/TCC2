import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { useState } from 'react';
import {estilos} from './Sty_render_relatorio';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';
import ModalRelatorio from '../modalRelatorio/modalRelatorio';

const Render_Relatorio = ({item, acessar}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={estilos.container}>
          <View style={estilos.tituloContainer}>
            <View style={{width: '80%'}}>
              <Text style={estilos.objetivo}>{item.objetivo}</Text>
              <View style={estilos.tituloContainerConteudo}>
                <Icon name="calendar" size={moderateScale(17)} color="black" />
                <Text style={estilos.tituloContainerDataHora}>{item.data}</Text>
              </View>
              <View style={estilos.tituloContainerConteudo}>
                <Icon name="clock" size={moderateScale(17)} color="black" />
                <Text style={estilos.tituloContainerDataHora}>
                  {item.hora_inicio}
                </Text>
              </View>
            </View>
          </View>
          <View style={estilos.FuncAtiviContainer}>
            <View
              style={[
                estilos.FuncAtivi,
                {borderRightWidth: 1, borderColor: 'black'},
              ]}>
              {item.funcionarios.map((funcionario, index) => (
                <Text
                  ellipsizeMode="tail"
                  key={index}
                  style={estilos.conteudoText}>
                  {funcionario}
                </Text>
              ))}
            </View>
            <View style={estilos.FuncAtivi}>
              {item.atividades.map((atividade, index) => (
                <Text key={index} style={estilos.conteudoText}>
                  {atividade}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {this.setModalVisible(false)}}
      >
        <ModalRelatorio item={item} closeModal={() => {setModalVisible(false)}} acessar={acessar} />
      </Modal>
    </>
  );
};

export default Render_Relatorio;
