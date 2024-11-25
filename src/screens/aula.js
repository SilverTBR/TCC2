import {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback,Modal, ScrollView} from 'react-native';
import MainHeader from '../components/MainHeader/MainHeader';
import Dropdownlist from '../components/DropdownList/Dropdownlist';
import {estilosGeral} from './styles/Sty_Geral';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from '../components/Button/customButton';
import {listarAtividades} from '../controllers/controlAtividades';
import {ListarFuncionarios} from '../controllers/controlFuncionarios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {cadastrarAula} from '../controllers/controlAulas';
import {initDB} from '../database/sqlite';
import ModalBackup from '../components/ModalBackup/modalBackup';
import ModalCrudAtividades from '../components/ModalCrudAtividades/modalCrudAtividades';

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
  const [objetivo, setObjetivo] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [horaInicio, setHoraInicio] = useState('');
  const [showInicio, setShowInicio] = useState(false);
  const [horaFim, setHoraFim] = useState('');
  const [showFim, setShowFim] = useState(false);
  const [error, setError] = useState('');
  const [backupModalVisible, setBackupModalVisible] = useState(false);


  const clear = () => {
    setHoraInicio('');
    setHoraFim('');
    setDate(new Date());
    setObjetivo("")
    setSelectedFuncionarios([]);
    setSelectedAtividades([])

  }

  useEffect(() => {
    const reFocus = props.navigation.addListener('focus', async () => {
      try {
        clear();
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

    return () => {
      reFocus();
    };
  }, []);

  const selectAtividades = id => {
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

  const selectFuncionarios = id => {
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

  const editDeleteModal = (id, value, isDelete, isCadastro) => {
    setItemSelecionadoId(id);
    setItemSelecionadoValue(value);
    setIsDelete(isDelete);
    setIsCadastro(isCadastro);
    setAbrirModal(true);
  };

  const mudouData = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate && event.type === 'set') {
      setDate(selectedDate);
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
                  handleSelect={selectAtividades}
                  closeDropdown={closeDropdowns}
                  handleEditDeleteModal={editDeleteModal}
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
                  handleSelect={selectFuncionarios}
                  closeDropdown={closeDropdowns}
                  handleEditDeleteModal={editDeleteModal}
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
                onPress={() => {setShowDate(true)}}
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
                onPress={() => {setShowInicio(true)}}
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
                onPress={() => {setShowFim(true)}}
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
          <ModalCrudAtividades 
            close={() => setAbrirModal(false)} 
            isDelete={isDelete} 
            isCadastro={isCadastro} 
            idItemSelecionado={itemSelecionadoId} 
            itemSelecionadoValue={itemSelecionadoValue} 
            setAtividades={setAtividades}/>
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
