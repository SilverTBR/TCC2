import {View, Text, TouchableOpacity, Modal} from 'react-native';
import { useState } from 'react';
import {estilos} from './Sty_render_relatorio';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';
import ModalRelatorio from '../ModalRelatorio/modalRelatorio';

const Render_Relatorio = ({item, acessar}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={estilos.container}>
          <View style={estilos.tituloContainer}>
            <Text style={estilos.objetivo}>{item.objetivo}</Text>
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
          <View style={estilos.dhContainer}>
            <View style={estilos.dhContainerItems}>
              <Icon name="calendar" size={moderateScale(13)} color="black" />
              <Text style={estilos.textDH}>{item.data}</Text>
            </View>
            <View style={estilos.dhContainerItems}>
              <Icon name="clock" size={moderateScale(13)} color="black" />
              <Text style={estilos.textDH}>{item.hora_inicio} - {item.hora_fim}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <ModalRelatorio item={item} closeModal={() => {setModalVisible(false)}} acessar={acessar} />
      </Modal>
    </>
  );
};

export default Render_Relatorio;
