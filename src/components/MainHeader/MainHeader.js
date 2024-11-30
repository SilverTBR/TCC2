import { SafeAreaView, Text, View } from "react-native";
import { estilosMainHeader } from "./Sty_mainHeader";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";



const MainHeader = props => {
    return(
    <SafeAreaView style = {estilosMainHeader.header}>
        <TouchableOpacity onPress={props.action}>
            <Icon name="bars" size={moderateScale(30)} color="white" />     
        </TouchableOpacity>
        <Text style = {estilosMainHeader.Titulo}>Fit<Text style= {{color: "red"}}>Pong</Text></Text>
        {props.filtrar &&         
        <TouchableOpacity onPress={props.filtrar}>
            <Icon name="filter" size={moderateScale(30)} color="white" />     
        </TouchableOpacity>
        }

        {props.backup &&         
        <TouchableOpacity onPress={props.backup}>
            <Icon name="google-drive" size={moderateScale(30)} color={"white"} />     
        </TouchableOpacity>
        }
   </SafeAreaView>
    );
};

export default MainHeader;
