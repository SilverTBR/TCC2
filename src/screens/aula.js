import {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
} from 'react-native';
import MainHeader from '../components/mainHeader/MainHeader';
import Dropdownlist from '../components/DropdownList/Dropdownlist';
import {estilosGeral} from './styles/Sty_Geral';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../components/Button/customButton';
import {listarAtividades} from '../controllers/controlAtividades';
import {ListarFuncionarios} from '../controllers/controlFuncionarios';
import {
  cadastrarAtividade,
  deletarAtividade,
  editarAtividade,
} from '../controllers/controlAtividades';
import DateTimePicker from '@react-native-community/datetimepicker';
import {cadastrarAula} from '../controllers/controlAulas';
import {initDB} from '../database/sqlite';
import {estilosModal} from './styles/Sty_Modal';
import ModalBackup from '../components/modalBackup/modalBackup';

const TelaAula = props => {
  const [atividades, setAtividades] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [dropdownVisibleA, setDropdownVisibleA] = useState(false);
  const [dropdownVisibleF, setDropdownVisibleF] = useState(false);
  const [selectedAtividades, setSelectedAtividades] = useState([]);
  const [selectedFuncionarios, setSelectedFuncionarios] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [itemSelecionadoId, setItemSelecionadoId] = useState(null);
  const [itemSelecionadoValue, setItemSelecionadoValue] = useState('');
  const [isCadastro, setIsCadastro] = useState(false);
  const [modalError, setModalError] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeI, setTimeI] = useState(new Date());
  const [timeF, setTimeF] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [horaInicio, setHoraInicio] = useState('');
  const [showInicio, setShowInicio] = useState(false);
  const [horaFim, setHoraFim] = useState('');
  const [showFim, setShowFim] = useState(false);
  const [error, setError] = useState('');
  const [backupModalVisible, setBackupModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        await initDB();
        const resultadoA = await listarAtividades();
        const resultadoF = await ListarFuncionarios();
        if (resultadoA.success && resultadoF.success) {
          setAtividades(resultadoA.atividades);
          setFuncionarios(resultadoF.funcionarios);
        }
      } catch (error) {
        console.error('Erro ao carregar listas:', error);
      }
    });

    return unsubscribe;
  }, []);

  const tSelectAtividades = id => {
    setSelectedAtividades(prevSelected => {
      const index = prevSelected.indexOf(id);
      if (index === -1) {
        return [...prevSelected, id];
      } else {
        let selecionados = [...prevSelected];
        selecionados.splice(index, 1);
        return selecionados;
      }
    });
  };

  const tSelectFuncionarios = id => {
    setSelectedFuncionarios(prevSelected => {
      const index = prevSelected.indexOf(id);
      if (index === -1) {
        return [...prevSelected, id];
      } else {
        const selecionados = [...prevSelected];
        selecionados.splice(index, 1);
        return selecionados;
      }
    });
  };

  const closeDropdowns = () => {
    setDropdownVisibleA(false);
    setDropdownVisibleF(false);
  };

  const EditDeleteModal = (id, value, isDelete, isCadastro) => {
    setItemSelecionadoId(id);
    setItemSelecionadoValue(value);
    setIsDelete(isDelete);
    setIsCadastro(isCadastro);
    setAbrirModal(true);
  };

  const adicionarAtividade = async () => {
    try {
      const resultado = await cadastrarAtividade(itemSelecionadoValue);
      if (resultado.success) {
        const resultadoL = await listarAtividades();
        if (resultadoL.success) {
          setAtividades(resultadoL.atividades);
          setAbrirModal(false);
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

  const editarAtividadeID = async () => {
    try {
      const resultadoC = await editarAtividade(
        itemSelecionadoId,
        itemSelecionadoValue,
      );
      if (resultadoC.success) {
        const resultadoA = await listarAtividades();
        if (resultadoA.success) {
          setAtividades(resultadoA.atividades);
          setAbrirModal(false);
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

  const deletarAtividadeID = async () => {
    try {
      const resultadoD = await deletarAtividade(itemSelecionadoId);
      if (resultadoD.success) {
        const resultadoL = await listarAtividades();
        if (resultadoL.success) {
          setAtividades(resultadoL.atividades);
          setAbrirModal(false);
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

  const mudouData = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate && event.type === 'set') {
      setDate(selectedDate);
    }
  };

  const pressDate = () => {
    if (!showDate) {
      setShowDate(true);
    }
  };

  const mTempoInicio = (event, selectedTime) => {
    setShowInicio(false)
    if (selectedTime && event.type === 'set') {
      const hora = selectedTime.getHours();
      const minuto = selectedTime.getMinutes();
      const tempoAtual = `${hora < 10 ? '0' : ''}${hora}:${
        minuto < 10 ? '0' : ''
      }${minuto}`;
      setHoraInicio(tempoAtual);
    }

  };

  const mTempoFim = (event, selectedTime) => {
    setShowFim(false)
    if (selectedTime && event.type === 'set') {
      const hora = selectedTime.getHours();
      const minuto = selectedTime.getMinutes();
      const tempoAtual = `${hora < 10 ? '0' : ''}${hora}:${
        minuto < 10 ? '0' : ''
      }${minuto}`;
      setHoraFim(tempoAtual);
    }
  };

  const pressInicio = () => {
    if (!showInicio) {
      setShowInicio(true);
    }
  };

  const pressFim = () => {
    if (!showFim) {
      setShowFim(true);
    }
  };

  const iniciarAula = async () => {
    try {
      const {success, error, aulaId} = await cadastrarAula(
        date.toLocaleDateString(),
        horaInicio,
        horaFim,
        objetivo,
        selectedAtividades,
        selectedFuncionarios,
      );

      if (success) {
        props.navigation.push('Avaliacao', {idAula: aulaId});
      } else {
        setError(error);
      }
    } catch (error) {
      setError('Erro ao cadastrar aula: ' + error);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={closeDropdowns}
      disabled={!dropdownVisibleA && !dropdownVisibleF}>
      <View style={estilosGeral.background}>
        <MainHeader
          action={() => {
            props.navigation.openDrawer();
          }}
          backup={() => {
            setBackupModalVisible(!backupModalVisible);
          }}
        />

        <ScrollView
          style={estilosGeral.main}
          scrollEnabled={!dropdownVisibleA && !dropdownVisibleF}
          showsVerticalScrollIndicator={false}
          >
          <View style={estilosGeral.areaInfo}>
            <Text style={estilosGeral.areaInfoTitulo}>CADASTRO DE AULA</Text>
            <Text style={estilosGeral.areaInfoTexto}>
              Defina as informações da aula para iniciar a avaliação.
            </Text>
          </View>
          <Text style={[estilosGeral.areaTitulo, {textAlign: 'center'}]}>
            DADOS DA AULA
          </Text>

          <View style={[estilosGeral.areaInput]}>
            <View style={estilosGeral.areaInputItem}>
              <Text
                style={estilosGeral.areaInputLabel}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Atividades<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() => [
                  setDropdownVisibleA(!dropdownVisibleA),
                  setDropdownVisibleF(false),
                ]}>
                <Text
                  style={[
                    estilosGeral.inputGFontPlaceholder,
                    selectedAtividades.length > 0 && estilosGeral.inputGFont,
                  ]}>
                  {selectedAtividades.length > 0
                    ? `${selectedAtividades.length} atividades selecionadas`
                    : 'Selecione uma atividade'}
                </Text>
                <Icon
                  name="angle-down"
                  size={moderateScale(25)}
                  color="black"
                />
              </TouchableOpacity>

              {dropdownVisibleA && (
                <Dropdownlist
                  items={atividades}
                  selectedItems={selectedAtividades}
                  handleSelect={tSelectAtividades}
                  closeDropdown={closeDropdowns}
                  handleEditDeleteModal={EditDeleteModal}
                  isEditavel={true}
                />
              )}
            </View>

            <View style={estilosGeral.areaInputItem}>
              <Text
                style={estilosGeral.areaInputLabel}
                ellipsizeMode="tail"
                numberOfLines={1}>
                Funcionários<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() => [
                  setDropdownVisibleF(!dropdownVisibleF),
                  setDropdownVisibleA(false),
                ]}>
                <Text
                  style={[
                    estilosGeral.inputGFontPlaceholder,
                    selectedFuncionarios.length > 0 && estilosGeral.inputGFont,
                  ]}>
                  {selectedFuncionarios.length > 0
                    ? `${selectedFuncionarios.length} funcionarios selecionados`
                    : 'Selecione um funcionario'}
                </Text>
                <Icon
                  name="angle-down"
                  size={moderateScale(25)}
                  color="black"
                />
              </TouchableOpacity>
              {dropdownVisibleF && (
                <Dropdownlist
                  items={funcionarios}
                  selectedItems={selectedFuncionarios}
                  handleSelect={tSelectFuncionarios}
                  closeDropdown={closeDropdowns}
                  handleEditDeleteModal={EditDeleteModal}
                  isEditavel={false}
                />
              )}
            </View>

            <View style={estilosGeral.areaInputItem}>
              <Text style={estilosGeral.areaInputLabel}>Objetivo<Text style={{color: 'red'}}>*</Text></Text>
              <TextInput
                style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                value={objetivo}
                placeholder="Digite o objetivo da aula"
                onChangeText={setObjetivo}
              />
            </View>

            <View style={estilosGeral.areaInputItem}>
              <Text style={estilosGeral.areaInputLabel}>
                Data da aula<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={pressDate}
                disabled={showDate}>
                <Text style={[estilosGeral.inputGFont]}>
                  {date.toLocaleDateString()}
                </Text>
                <Icon name="calendar" size={moderateScale(25)} color="black" />
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={mudouData}
                  negativeButton={{label: "Cancelar"}}
                />
              )}
            </View>
            <View style={estilosGeral.areaInputItem}>
              <Text style={estilosGeral.areaInputLabel}>
                Hora de início<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={pressInicio}
                disabled={showDate}>
                <Text style={[estilosGeral.inputGFont, horaInicio === '' ? estilosGeral.inputGFontPlaceholder: '' ]} >
                  {horaInicio === '' ? 'HH:MM' : horaInicio}
                </Text>
                <Icon name="clock" size={moderateScale(25)} color="black" />
              </TouchableOpacity>
              {showInicio && (
                <DateTimePicker
                  testID='timeInicio'
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={mTempoInicio}
                  negativeButton={{label: "Cancelar"}}
                />
                
              )}
            </View>
            <View style={estilosGeral.areaInputItem}>
              <Text style={estilosGeral.areaInputLabel}>
                Hora do fim<Text style={{color: 'red'}}>*</Text>
              </Text>

              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={pressFim}
                disabled={showDate}>
                <Text style={[estilosGeral.inputGFont, horaFim === '' ? estilosGeral.inputGFontPlaceholder: '' ]} >
                {horaFim === '' ? 'HH:MM' : horaFim}
                </Text>
                <Icon name="clock" size={moderateScale(25)} color="black" />
              </TouchableOpacity>

              {showFim && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={mTempoFim}
                  negativeButton={{label: "Cancelar"}}
                />
              )}

            </View>
            {error && (
              <View style={{marginVertical: 10}}>
                <Text style={estilosGeral.textoError}>{error}</Text>
              </View>
            )}
          </View>
          <View style={{marginVertical: 20}}>
            <CustomButton
              texto="Iniciar avaliação"
              action={() => {
                iniciarAula();
              }}
            />
          </View>
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={abrirModal}>
          <TouchableWithoutFeedback
            onPress={() => [setAbrirModal(false), setModalError('')]}>
            <View style={estilosModal.modalContainer}>
              <TouchableWithoutFeedback
                onPress={() => {}}
                touchSoundDisabled={true}>
                <View style={estilosModal.modalCaixa}>
                  <View style={estilosModal.modalCaixaItems}>
                    <View style={estilosModal.modalCaixaHeader}>
                      <Text style={estilosModal.areaTitulo}>
                        {isDelete
                          ? 'DELETAR'
                          : isCadastro
                          ? 'CADASTRAR'
                          : 'EDITAR'}{' '}
                        ATIVIDADE
                      </Text>
                    </View>
                    {isDelete ? (
                      <>
                        <Icon
                          name="exclamation"
                          size={moderateScale(100)}
                          color="red"
                        />
                        <Text style={estilosModal.modalCaixaTexto}>
                          Tem certeza que deseja excluir a atividade:{' '}
                          <Text style={estilosModal.modalCaixaTextoDestaque}>
                            {itemSelecionadoValue}
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
                                setAbrirModal(false);
                              }}
                              cor="#414141"
                            />
                          </View>

                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto="Confirmar"
                              action={() => {
                                deletarAtividadeID();
                              }}
                            />
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text style={estilosGeral.areaInfoTexto}>
                          {isCadastro
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
                                setAbrirModal(false);
                              }}
                              cor="#414141"
                            />
                          </View>

                          <View style={estilosGeral.areaDois}>
                            <CustomButton
                              texto={isCadastro ? 'Cadastrar' : 'Confirmar'}
                              action={() => {
                                isCadastro
                                  ? adicionarAtividade()
                                  : editarAtividadeID();
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
        </Modal>
        <Modal
          visible={backupModalVisible}
          transparent={true}
          animationType="slide">
          <ModalBackup close={() => setBackupModalVisible(false)} RecarregarListas={ async () => {    
            try {
              const resultadoA = await listarAtividades();
              const resultadoF = await ListarFuncionarios();
              if (resultadoA.success && resultadoF.success) {
                setAtividades(resultadoA.atividades);
                setFuncionarios(resultadoF.funcionarios);
              }
            } catch (error) {
              console.error('Erro ao recarregar listas:', error);
            }
          }}/>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TelaAula;
