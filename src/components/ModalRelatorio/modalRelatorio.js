import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import CustomButton from '../Button/customButton';
import { estilos } from './Sty_modalRelatorio';


const ModalRelatorio = (props) => {  

  return (
    <View style={estilos.modalOverlay}>
      <View style={estilos.modalContainer}>
        <ScrollView contentContainerStyle={estilos.modalScrollView}>
        <View style={estilos.modalHeaderFooter}>
            <TouchableOpacity style={estilos.modalContent} onPress={props.closeModal}>
              <Icon name="times" size={moderateScale(20)} color="black" />
            </TouchableOpacity>
              <CustomButton
                texto="Relatorio"
                action={() => {props.closeModal, props.acessar(props.item)}}
              />     
          </View>
          <View style={estilos.modalObjetivo}>
            <Text style={estilos.modalObjetivoText}>
              {props.item.objetivo}
            </Text>     
            </View>

          <View style={estilos.modalFunc}>
            {props.item.funcionarios.map((funcionario, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="user-alt" size={moderateScale(15)} color="white" />
                <Text
                  ellipsizeMode="tail"
                  style={estilos.modalFuncText}
                >
                  {funcionario}
                </Text>
              </View>
            ))}
          </View>

          <View style={estilos.modalAtividades}>
            {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
          </View>

          <View style={estilos.modalHeaderFooter}>
            <View style={estilos.modalContent}>
              <Icon name="calendar" size={moderateScale(15)} color="black" />
              <Text style={[estilos.modalFuncText, { color: "black" }]}>
                {props.item.data}
              </Text>
            </View>
            <View style={estilos.modalContent}>
              <Icon name="clock" size={moderateScale(15)} color="black" />
              <Text style={[estilos.modalFuncText, { color: "black" }]}>
                {props.item.hora_inicio} - {props.item.hora_fim}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ModalRelatorio;
