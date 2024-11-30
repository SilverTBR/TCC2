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
import ImgToBase64 from 'react-native-image-base64';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const ModalSelFoto = props => {


  const convertIMG64 = imgURI => {
    ImgToBase64.getBase64String(imgURI)
      .then(base64String => {
        props.setImg64(base64String);
        props.close()
      })
      .catch(err => console.error(err));
  };

  const selectImagem = camera => {
    const opt = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1
    };

    if (camera) {
      launchCamera(opt)
        .then(async resultado => {
          const imageCorrigida = await ImageResizer.createResizedImage(
            resultado.assets[0].uri,
            resultado.assets[0].width,
            resultado.assets[0].height,
            'JPEG',
            100,
            0,
            null,
            false
          )         

          convertIMG64(imageCorrigida.uri);
        })
        .catch(error => {
          console.log('Erro ao tirar foto: ' + error);
        });
    } else {
      launchImageLibrary(opt)
        .then(async resultado => {
          console.log(resultado.assets[0]);
          
          const imageCorrigida = await ImageResizer.createResizedImage(
            resultado.assets[0].uri,
            resultado.assets[0].width,
            resultado.assets[0].height,
            'JPEG',
            100,
            0,
            null,
            false
          )      
          convertIMG64(imageCorrigida.uri);
        })
        .catch(error => {
          console.log('Erro ao selecionar foto: ' + JSON.stringify(error));
        });
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
                      SELECIONAR FOTO DO FUNCIONARIO
                    </Text>
                  </View>
                  <Icon name="camera" size={moderateScale(100)} color="black" />
                  <Text style={estilosModal.modalCaixaTexto}>
                    Selecione se irá utilizar uma foto salva, ou irá tirar uma
                    foto com a camera
                  </Text>
                  <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
                    <View style={estilosGeral.areaDois}>
                      <CustomButton
                        texto="Camera"
                        action={() => {
                          selectImagem(true);
                        }}
                      />
                    </View>

                    <View style={estilosGeral.areaDois}>
                      <CustomButton
                        texto="Galeria"
                        action={() => {
                          selectImagem(false);
                        }}
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

export default ModalSelFoto;
