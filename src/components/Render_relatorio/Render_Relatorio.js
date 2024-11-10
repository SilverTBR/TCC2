import {View, Text, TouchableOpacity} from 'react-native';
import {estilos} from './Sty_render_relatorio';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {moderateScale} from 'react-native-size-matters';

const Render_Relatorio = ({item, acessar}) => {
  return (
    <TouchableOpacity onPress={() => acessar(item)}>
      <View style={estilos.container}>
        <View style={estilos.tituloContainer}>
          <View style={{width: '80%'}}>
            <Text style={estilos.objetivo}>{item.objetivo}</Text>
            <View style={estilos.tituloContainerConteudo}>
              <Icon name="calendar" size={moderateScale(17)} color="black" />
              <Text style={estilos.tituloContainerDataHora}>{item.data}</Text>
            </View>
            <View style={estilos.tituloContainerConteudo}>
              <Icon name="clock" size={moderateScale(17)} color="black" />
              <Text style={estilos.tituloContainerDataHora}>{item.hora_inicio}</Text>
            </View>
          </View>
        </View>

        <View style={estilos.FuncAtiviContainer}>
          <View style={[estilos.FuncAtivi, {borderRightWidth: 1, borderColor: "black"}]}>
          {item.funcionarios.map((funcionario, index) => (
              <Text ellipsizeMode='tail' key={index} style={estilos.conteudoText}>
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
      </View>
    </TouchableOpacity>

    // <TouchableOpacity onPress={() => acessar(item)}>
    //   <View style={estilos.container}>
    //     <Text style={estilos.titulo}>
    //       {item.objetivo} - {item.data} - {item.hora_inicio}
    //     </Text>
    //     <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
    //       <View style={{borderRightWidth: 1, flex: 50, marginRight: 30}}>
    //         {item.funcionarios.map((funcionario, index) => (
    //           <Text key={index} style={estilos.conteudoText}>
    //             &#8901; {funcionario}
    //           </Text>
    //         ))}
    //       </View>
    //       <View style={{flex: 50}}>
    //         {item.atividades.map((atividade, index) => (
    //           <Text key={index} style={estilos.conteudoText}>
    //             &#8901; {atividade}
    //           </Text>
    //         ))}
    //       </View>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
};

export default Render_Relatorio;
