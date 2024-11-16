import { View, Text, Image, TouchableOpacity } from 'react-native';
import { estilos } from './Sty_render_player';

const Render_Funcionario = ({ item, acessarPerfil }) => {
  return (
    <TouchableOpacity style={estilos.touchable} onPress={() => acessarPerfil(item)}>
      <View style={estilos.container}>
        <View>
          <Image
          source={item.foto ? { uri: `data:image/jpeg;base64,${item.foto}` } : require('../../assets/images/profilePic.png')}
          style={estilos.foto} 
        />
        </View>
        <View style={estilos.containerFilho}>
          <Text style={estilos.text} numberOfLines={1} ellipsizeMode='tail'>{item.nome}</Text>
          <Text style={estilos.text} numberOfLines={1} ellipsizeMode='tail'>{item.area}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


export default Render_Funcionario;
