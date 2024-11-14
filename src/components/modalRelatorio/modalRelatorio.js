import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { estilos } from './Sty_modalRelatorio';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import CustomButton from '../Button/customButton';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ModalRelatorio = (props) => {  

  return (
    <TouchableOpacity
      style={estilos.modalOverlay}
      onPress={props.closeModal}
      activeOpacity={1}
    >
    
      <View style={estilos.modalContainer} pointerEvents="auto">
        <ScrollView contentContainerStyle={estilos.modalScrollView}>
          <TouchableWithoutFeedback onPress={() => {}}>
          <View style={estilos.modalObjetivo}>
            <Text style={estilos.modalObjetivoText}>
              {props.item.objetivo}
            </Text>
            <CustomButton
              texto="Relatorio"
              action={() => {props.closeModal, props.acessar(props.item)}}
            />          
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
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
             {props.item.atividades.map((atividade, index) => (
              <View style={estilos.modalContent} key={index}>
                <Icon name="check" size={moderateScale(15)} color="white" />
                <Text style={estilos.modalFuncText}>
                  {atividade}
                </Text>
              </View>
            ))}
            
          </View>

          <View style={estilos.modalDH}>
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
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default ModalRelatorio;
