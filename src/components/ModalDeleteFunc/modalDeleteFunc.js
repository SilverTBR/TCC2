import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {estilosGeral} from '../../screens/styles/Sty_Geral';
import CustomButton from '../Button/customButton';
import {moderateScale} from 'react-native-size-matters';
import {estilosModal} from '../../screens/styles/Sty_Modal';
import { excluirFuncionario } from '../../controllers/controlFuncionarios';

const ModalDeleteFunc = props => {


  const deletar = async (id) => {
    const response = await excluirFuncionario(id);
    props.close();
    if (response.success) {
      props.return()
    } else {
      props.setErro(response.error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => props.close()}>
          <View style={estilosModal.modalOverlay}>
            <TouchableWithoutFeedback
              onPress={() => {}}
              touchSoundDisabled={true}>
              <View style={estilosModal.modalContainer}>
                <View style={estilosModal.modalContainerItems}>
                  <View style={estilosModal.modalContainerHeader}>
                    <Text style={estilosGeral.areaTitulo}>
                      DELETAR O FUNCIONARIO {props.nome}
                    </Text>
                  </View>
                  <Icon
                    name="exclamation"
                    size={moderateScale(100)}
                    color="red"
                  />
                  <Text style={estilosModal.modalCaixaTexto}>
                    Tem certeza que irá deletar este funcionario?
                  </Text>
                  <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
                    <View style={estilosGeral.areaDois}>
                      <CustomButton
                        texto="Confirmar"
                        action={() => {
                          deletar(props.id);
                        }}
                      />
                    </View>

                    <View style={estilosGeral.areaDois}>
                      <CustomButton
                        texto="Cancelar"
                        action={() => {
                          props.close()
                        }}
                        cor="#414141"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
  );
};

export default ModalDeleteFunc;
