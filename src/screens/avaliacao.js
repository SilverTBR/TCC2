import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { estilosGeral } from './styles/Sty_Geral';
import { estiloAvaliacao } from './styles/Sty_Avaliacao';
import { alterarAvaliacao } from '../controllers/controlAulas';
import Orientation from 'react-native-orientation-locker';
import CustomButton from '../components/Button/customButton';

const TelaAvaliacao = props => {
    console.log(props);
    
    useEffect(() => {
        Orientation.lockToLandscape();
        return () => {
            Orientation.unlockAllOrientations(); 
        }
    }, [])

    let idAula = props.route.params.idAula;
    const [aval_0, setAval_0] = useState(0);
    const [aval_1, setAval_1] = useState(0);
    const [aval_2, setAval_2] = useState(0);
    const [aval_3, setAval_3] = useState(0);
    const [aval_4, setAval_4] = useState(0);
    const [tempVoto, setTempVoto] = useState([0,0,0,0,0]);
    const [confirmou, setConfirmou] = useState(true);

    const incrementAval = (index) => {
        const newTempVoto = tempVoto.map((value, i) => (i === index ? 1 : 0));
        setTempVoto(newTempVoto);
    };

    const concluirAvaliacao = async () => {
        const resultado = await alterarAvaliacao(idAula, aval_0, aval_1, aval_2, aval_3, aval_4); 
        if (resultado.success) {
            props.navigation.pop();
        } else {
            console.log('Erro ao concluir as avaliações:', resultado.error);
        }
    };

    const confirmarVoto = () => {
        setAval_0(aval_0 + tempVoto[0]);
        setAval_1(aval_1 + tempVoto[1]);
        setAval_2(aval_2 + tempVoto[2]);
        setAval_3(aval_3 + tempVoto[3]);
        setAval_4(aval_4 + tempVoto[4]);
        setTempVoto([0,0,0,0,0]);
        console.log(aval_0 +" "+ tempVoto);
        setConfirmou(false);
        setTimeout(() => {
            setConfirmou(true);
        }, 2000);
    }

    const votou = tempVoto.some(value => value !== 0);

    return(
        <View style={[estilosGeral.background, {justifyContent: "center"}]}>
            <ImageBackground source={require("../assets/images/background.jpg")} style={estiloAvaliacao.backgroundImage}>
                <TouchableOpacity style={estiloAvaliacao.return} onLongPress={() => {concluirAvaliacao()}} delayLongPress={1000}/>

                <View style={{width:"100%", alignItems: "center"}}>
                    <View>
                        <Text style={estiloAvaliacao.textTitulo}>{!confirmou ? "Obrigado por avaliar esta aula" : "VOCÊ GOSTOU DA AULA?"}</Text>
                        <Text style={estiloAvaliacao.textSubtitulo}>{!confirmou ? "Usaremos sua avaliação para melhorar as aulas o melhor possível!" : "Nós de um feedback do quanto gostou desta aula!"}</Text>
                    </View>
                    {confirmou && (
                        <View style={estiloAvaliacao.avalRow}>
                            <TouchableOpacity style={estiloAvaliacao.avalItem} onPress={() => incrementAval(0)}>
                                <Image source={tempVoto[0] === 1 ? require("../assets/images/1_Putasso.png") : require("../assets/images/1_PutassoN.png")} style={estiloAvaliacao.avalImg} />
                                <Text style={[estiloAvaliacao.avalText, tempVoto[0] === 1 ? {color: "#d01333"} : null]}>MUITO RUIM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={estiloAvaliacao.avalItem} onPress={() => incrementAval(1)}>
                                <Image source={tempVoto[1] === 1 ? require("../assets/images/2_Putinho.png") : require("../assets/images/2_PutinhoN.png")} style={estiloAvaliacao.avalImg} />
                                <Text style={[estiloAvaliacao.avalText, tempVoto[1] === 1 ? {color: "#f83233"} : {}]}>RUIM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={estiloAvaliacao.avalItem} onPress={() => incrementAval(2)}>
                                <Image source={tempVoto[2] === 1 ? require("../assets/images/3_Eh.png") : require("../assets/images/3_EhN.png")} style={estiloAvaliacao.avalImg} />
                                <Text style={[estiloAvaliacao.avalText, tempVoto[2] === 1 ? {color: "#faf400"} : {}]}>NEUTRO</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={estiloAvaliacao.avalItem} onPress={() => incrementAval(3)}>
                                <Image source={tempVoto[3] === 1 ? require("../assets/images/4_Felizinho.png") : require("../assets/images/4_FelizinhoN.png")} style={estiloAvaliacao.avalImg} />
                                <Text style={[estiloAvaliacao.avalText, tempVoto[3] === 1 ? {color: "#94d732"} : {}]}>BOM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={estiloAvaliacao.avalItem} onPress={() => incrementAval(4)}>
                                <Image source={tempVoto[4] === 1 ? require("../assets/images/5_Felizaum.png") : require("../assets/images/5_FelizaumN.png")} style={estiloAvaliacao.avalImg} />
                                <Text style={[estiloAvaliacao.avalText, tempVoto[4] === 1 ? {color: "#99ed1e"} : {}]}>MUITO BOM</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {votou && (
                        <View style={{width: "60%"}}>
                            <CustomButton
                                texto="Confirmar avaliação"
                                action={confirmarVoto}                        
                            />
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    )
};

export default TelaAvaliacao;
