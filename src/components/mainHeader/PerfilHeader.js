import { SafeAreaView, Text, View } from "react-native";
import { estilosMainHeader } from "./Sty_mainHeader";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";



const PerfilHeader = props => {
    return(
    <SafeAreaView style = {estilosMainHeader.header}>
        <TouchableOpacity onPress={props.action} style={estilosMainHeader.ViewReturn}>
            <Icon name="angle-left" size={moderateScale(40)} color="white" /> 
        </TouchableOpacity>
        <Text style = {estilosMainHeader.Titulo}>
            {props.titulo ? props.titulo:
                (props.id ? props.nome : 'PERFIL DO FUNCIONARIO')
            } 
        </Text>
        {props.id ? <TouchableOpacity onPress={props.deleteAction} style={estilosMainHeader.ViewReturn}>
            <Icon name="trash" size={moderateScale(30)} color="red" /> 
        </TouchableOpacity> : null}


   </SafeAreaView>
    );
};

export default PerfilHeader;