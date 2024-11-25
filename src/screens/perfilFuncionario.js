import {Text, View, TextInput, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Image} from 'react-native';
import {useEffect, useState} from 'react';
import PerfilHeader from '../components/MainHeader/PerfilHeader';
import {estilosGeral} from './styles/Sty_Geral';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';
import TextInputMask from 'react-native-text-input-mask';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/Button/customButton';
import {cadastrarFuncionario, editarFuncionario, excluirFuncionario} from '../controllers/controlFuncionarios';
import ModalDeleteFunc from '../components/ModalDeleteFunc/modalDeleteFunc';
import ModalSelFoto from '../components/ModalSelFoto/modalSelFoto';

const TelaPerfilFuncionario = props => {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [area, setArea] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cel, setCel] = useState('');
  const [infos, setInfos] = useState('');
  const [img64, setImg64] = useState('');
  const [date, setDate] = useState(new Date());
  const [erro, setErro] = useState(null);
  const [abrirModalDelete, setAbrirModalDelete] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [avancar, setAvancar] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);

  useEffect(() => {
    if (props.route.params && props.route.params.funcionario) {
      const funcionario = props.route.params.funcionario;
      setId(funcionario.id);
      setNome(funcionario.nome);
      setArea(funcionario.area);
      setEmail(funcionario.email);
      setCpf(funcionario.CPF);
      setCel(funcionario.celular);
      setInfos(funcionario.infoExtra);
      setImg64(funcionario.foto);
      setDate(converteStringParaData(funcionario.data));
    }
  }, [props.route.params]);

  const converteStringParaData = data => {
    let [day, month, year] = data.split('/');
    return new Date(year, month - 1, day);
  };

  const Cadastrar = async () => {
    if (id) {
      const resposta = await editarFuncionario(id, nome, email, date.toLocaleDateString(), area, cpf, cel, img64, infos);
      if (resposta.success) {
        props.navigation.pop();
      } else {
        setErro(resposta.error);
      }
    } else {
      const resposta = await cadastrarFuncionario(nome, email, date.toLocaleDateString(), area, cpf, cel, img64, infos);
      console.log(resposta); 
      if (resposta.success) {
        props.navigation.pop();
      } else {
        setErro(resposta.error);
      }
    }
  };

  const Deletar = async () => {
    const response = await excluirFuncionario(id);
    setAbrirModalDelete(false);
    if (response.success) {
      props.navigation.pop();
    } else {
      setErro(response.error);
    }
  };

  const mudouData = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate && event.type === 'set') {
      setDate(selectedDate);
    }
    
  };
  
  return (
    <View style={estilosGeral.background}>
      <PerfilHeader
        action={
          avancar
            ? () => setAvancar(false)
            : () => {
                props.navigation.pop();
              }
        }
        nome={nome}
        deleteAction={() => {
          setAbrirModalDelete(true);
        }}
        id={id}
      />

      <ScrollView style={[estilosGeral.main, {gap: 10}]} showsVerticalScrollIndicator={false}>
        <View style={[estilosGeral.areaInfo, {alignItems: 'center'}]}>
          <Text style={estilosGeral.areaInfoTitulo}>DADOS PESSOAIS</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            {avancar ? (
              <>
                <Icon name="circle" size={moderateScale(11)} color="black" />
                <Icon name="minus" size={moderateScale(40)} color="#969696" />
              </>
            ) : (
              <>
                <Icon name="minus" size={moderateScale(40)} color="#969696" />
                <Icon name="circle" size={moderateScale(11)} color="black" />
              </>
            )}
          </View>
        </View>
        <View style={[estilosGeral.areaInfo, {gap: 20}]}>
          {avancar ? (
            <View style={estilosGeral.areaInputItem}>
              <Text
                style={[
                  estilosGeral.areaInputLabel,
                  {fontSize: moderateScale(20)},
                ]}>
                Foto do funcionario
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  estilosGeral.areaSelectImage,
                  img64 && {justifyContent: 'center', alignItems: 'center'},
                ]}
                onPress={() => {
                  setAbrirModal(true);
                }}>
                {img64 ? (
                  <Image
                    source={{uri: `data:image/jpeg;base64,${img64}`}}
                    style={{width: '100%', height: '100%'}}
                  />
                ) : (
                  <>
                    <Icon name="upload" size={moderateScale(71)} color="grey" />
                    <Text style={estilosGeral.areaInputLabel}>
                      Aperte aqui e salve uma foto do funcionário
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  Nome<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={nome}
                  placeholder="Digite o nome do funcionário"
                  onChangeText={setNome}
                />
              </View>

              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  Área<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={area}
                  placeholder="Digite a área do funcionário"
                  onChangeText={setArea}
                />
              </View>

              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  Email<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInput
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={email}
                  placeholder="Digite o email do funcionário"
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  CPF<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInputMask
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={cpf}
                  mask={'[000].[000].[000]-[__]'}
                  onChangeText={setCpf}
                  placeholder="___.___.___-__"
                />
              </View>

              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  Data de nascimento<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity
                  style={estilosGeral.inputG}
                  activeOpacity={0.5}
                  onPress={() => {setShowDate(!showDate)}}
                  disabled={showDate}>
                  <Text style={[estilosGeral.inputGFont]}>
                    {date.toLocaleDateString()}
                  </Text>
                  <Icon
                    name="calendar"
                    size={moderateScale(25)}
                    color="black"
                  />
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
                  Número de celular<Text style={{color: 'red'}}>*</Text>
                </Text>
                <TextInputMask
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={cel}
                  mask={'([00]) 9[0000]-[0000]'}
                  onChangeText={setCel}
                  placeholder="(__) _____-____"
                  keyboardType="numeric"
                />
              </View>

              <View style={estilosGeral.areaInputItem}>
                <Text style={estilosGeral.areaInputLabel}>
                  Informações extra
                </Text>
                <TextInput
                  style={[estilosGeral.inputG, estilosGeral.inputGFont]}
                  value={infos}
                  placeholder="Digite a informação extra do funcionário"
                  onChangeText={setInfos}
                />
              </View>
            </>
          )}
        </View>
        {erro && (
          <View style={{marginVertical: 10}}>
            <Text style={estilosGeral.textoError}>{erro}</Text>
          </View>
        )}

        <CustomButton
          texto={avancar ? 'Salvar' : 'Avançar'}
          action={
            avancar
              ? () => {
                  Cadastrar();
                }
              : () => {
                  setAvancar(true);
                }
          }
        />
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={abrirModal}>
        <ModalSelFoto close={() => setAbrirModal(false)} setImg64={setImg64}/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={abrirModalDelete}>
          <ModalDeleteFunc close = {() => setAbrirModalDelete(false)} nome = {nome} id={id} setErro ={setErro} return={() => props.navigation.pop()}/>
      </Modal>
    </View>
  );
};

export default TelaPerfilFuncionario;
