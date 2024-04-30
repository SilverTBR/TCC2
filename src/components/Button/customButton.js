import { Text, TouchableOpacity, View } from "react-native"
import { estilos } from "./Sty_button";

const CustomButton = props => {
    return(
        <TouchableOpacity 
            style={[estilos.buttonArea, props.cor && { backgroundColor: props.cor }]} 
            onPress={props.action}
        >
            <View>
                <Text style={estilos.buttonText}>{props.texto}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default CustomButton;
