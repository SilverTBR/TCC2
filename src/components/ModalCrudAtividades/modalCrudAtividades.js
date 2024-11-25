import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {estilosGeral} from '../../screens/styles/Sty_Geral';
import CustomButton from '../Button/customButton';
import {moderateScale} from 'react-native-size-matters';
import {estilosModal} from '../../screens/styles/Sty_Modal';
import {useState} from 'react';
import { editarAtividade, deletarAtividade, listarAtividades, cadastrarAtividade } from '../../controllers/controlAtividades';

const ModalCrudAtividades = props => {
  const [modalError, setModalError] = useState('');
  const [itemSelecionadoValue, setItemSelecionadoValue] = useState(props.itemSelecionadoValue);

  const editarAtividadeID = async (id, value) => {    
    try {
      const resultadoC = await editarAtividade(
        id,
        value
      );
      if (resultadoC.success) {
        const resultadoA = await listarAtividades();
        if (resultadoA.success) {
          props.setAtividades(resultadoA.atividades);
          props.close();
          setModalError('');
        } else {
          console.error('Erro ao carregar listas:', resultadoA.error);
        }
      } else {
        setModalError(resultadoC.error);
      }
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
    }
  };

  const deletarAtividadeID = async (id) => {
    try {
      const resultadoD = await deletarAtividade(id);
      if (resultadoD.success) {
        const resultadoL = await listarAtividades();
        if (resultadoL.success) {
          props.setAtividades(resultadoL.atividades);
          props.close();
          setModalError('');
        } else {
          console.error('Erro ao carregar listas:', resultadoL.error);
        }
      }else{
        setModalError(resultadoD.error);
      }
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
    }
  };

  const adicionarAtividade = async (value) => {
    try {
      const resultado = await cadastrarAtividade(value);
      if (resultado.success) {
        const resultadoL = await listarAtividades();
        if (resultadoL.success) {
          props.setAtividades(resultadoL.atividades);
          props.close();
          setModalError('');
        } else {
          console.error('Erro ao carregar listas:', resultadoL.error);
        }
      } else {
        setModalError(resultado.error);
      }
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
    }
  };
  return (
    <TouchableWithoutFeedback
    onPress={() => [props.close(), setModalError('')]}>
      <View style={estilosModal.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => {}} touchSoundDisabled={true}>
          <View style={estilosModal.modalContainer}>
            <View style={estilosModal.modalContainerItems}>
              <View style={estilosModal.modalContainerHeader}>
              <Text style={estilosGeral.areaTitulo}>
                {props.isDelete ? 'DELETAR'
                  : props.isCadastro ? 'CADASTRAR'
                    : 'EDITAR'}{' '}ATIVIDADE
                </Text>
              </View>
              {props.isDelete ? (
                <>
                  <Icon
                    name="exclamation"
                    size={moderateScale(100)}
                    color="red"
                  />
                  <Text style={estilosModal.modalCaixaTexto}>
                    Tem certeza que deseja excluir a atividade:{' '}
                    <Text style={estilosModal.modalCaixaTextoDestaque}>
                      {props.itemSelecionadoValue}
                    </Text>
                  </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 10,
                          }}>
                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto="Cancelar"
                              action={() => {
                                props.close()
                              }}
                              cor="#414141"
                            />
                          </View>
                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto="Confirmar"
                              action={() => {
                                deletarAtividadeID(props.idItemSelecionado);
                              }}
                            />
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text style={estilosGeral.areaInfoTexto}>
                          {props.isCadastro
                            ? 'Cadastre uma nova atividade'
                            : 'Altere a informação do campo selecionado'}
                        </Text>

                        <View style={estilosGeral.areaInputItem}>
                          <Text style={estilosGeral.areaInputLabel}>
                            Atividade<Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <TextInput
                            style={[
                              estilosGeral.inputG,
                              estilosGeral.inputGFont,
                            ]}
                            value={itemSelecionadoValue}
                            onChangeText={setItemSelecionadoValue}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 10,
                          }}>
                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto="Cancelar"
                              action={() => {
                                setModalError('');
                                props.close();
                              }}
                              cor="#414141"
                            />
                          </View>

                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto={props.isCadastro ? 'Cadastrar' : 'Confirmar'}
                              action={() => {
                                props.isCadastro
                                  ? adicionarAtividade(itemSelecionadoValue)
                                  : editarAtividadeID(props.idItemSelecionado, itemSelecionadoValue);
                              }}
                            />
                          </View>
                        </View>
                      </>
                    )}
                    <Text style={estilosGeral.textoError}>{modalError}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>

  );
};

export default modalCrudAtividades;
