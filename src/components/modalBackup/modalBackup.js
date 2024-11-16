import {
  View,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {estilosGeral} from '../../screens/styles/Sty_Geral';
import CustomButton from '../Button/customButton';
import {moderateScale} from 'react-native-size-matters';
import {estilosModal} from '../../screens/styles/Sty_Modal';
import {exportDB, restoreDB} from '../../controllers/controlGoogle';
import {useState} from 'react';
import {estilos} from '../Button/Sty_button';

const ModalBackup = props => {
  const [msgCor, setMsgCor] = useState('black');
  const [msg, setMessage] = useState('');
  const [carregando, setCarregando] = useState(false);

  const realizarExport = async () => {
    setCarregando(true)
    let resultado = await exportDB();
    if (resultado.success) {
      setMsgCor('green');
    } else {
      setMsgCor('red');
    }
    setMessage(resultado.message);
    setCarregando(false)
  };

  const realizarImport = async () => {
    setCarregando(true)
    let resultado = await restoreDB();
    if (resultado.success) {
      await props.RecarregarListas();
      setMsgCor('green');
    } else {
      setMsgCor('red');
    }
    setMessage(resultado.message);
    setCarregando(false)
  };

  return (
    <TouchableWithoutFeedback onPress={props.close}>
      <View style={estilosModal.modalOverlay}>
        <TouchableWithoutFeedback onPress={() => {}} touchSoundDisabled={true}>
          <View style={[estilosModal.modalContainer, {height: moderateScale(255)}]}>
            <View style={estilosModal.modalContainerItems}>
              <View style={estilosModal.modalContainerHeader}>
                <TouchableOpacity onPress={props.close}>
                  <Icon name="times" size={moderateScale(20)} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={[estilosModal.modalCaixaTexto, {color: msgCor}]}>
                {!msg
                  ? 'Deseja exportar ou importar o banco de dados do Google Drive?'
                  : msg}
              </Text>
            </View>
            {carregando ? (
              <View style={[estilos.buttonArea, {flexDirection: "row", gap: 10}]}>
                <ActivityIndicator size={moderateScale(20)} color={'white'} />
                <Text style={estilos.buttonText}>Carregando...</Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
                <View style={estilosGeral.areaDois}>
                  <CustomButton
                    texto="Importar"
                    action={() => {
                      realizarImport();
                    }}
                  />
                </View>

                <View style={estilosGeral.areaDois}>
                  <CustomButton
                    texto="Exportar"
                    action={() => {
                      realizarExport();
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ModalBackup;
