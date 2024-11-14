import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { estilosGeral } from './styles/Sty_Geral';
import MainHeader from '../components/mainHeader/MainHeader';
import CustomButton from '../components/Button/customButton';
import Render_Funcionario from '../components/Render_funcionario/Render_Funcionario';
import { selectFuncionarios } from '../controllers/controlFuncionarios';
import Orientation from 'react-native-orientation-locker';
import { moderateScale } from 'react-native-size-matters';
import { useWindowDimensions } from 'react-native';

const TelaFuncionarios = props => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [orientation, setOrientation] = useState(Orientation.getInitialOrientation());

  const carregarDados = async () => {
    const { success, funcionarios } = await selectFuncionarios();
    if (success) {
      setFuncionarios(funcionarios);
    } else {
      console.error('Erro ao carregar funcionários.');
    }
  };

  const acessarPerfil = item => {
    props.navigation.push('PerfilFuncionario', { funcionario: item });
  };

  const renderItem = ({ item }) => {
    return <Render_Funcionario item={item} acessarPerfil={acessarPerfil} />;
  };

  const {width} = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(3);


  const calculaColunas = () => {
    const itemWidth = moderateScale(90); 
    const screenWidth = (80 * width)/100;
    const numColunas = Math.floor(screenWidth / itemWidth);
    return Math.max(numColunas, 3); 
  };

  useEffect(() => {
    setNumColumns(calculaColunas());
  }, [width]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      carregarDados();
    });

    const updateOrientation = orientation => {
      setOrientation(orientation);
    };

    Orientation.addOrientationListener(updateOrientation);

    return () => {
      Orientation.removeOrientationListener(updateOrientation);
      unsubscribe();
    };
  }, []);

  return (
    <View style={estilosGeral.background}>
      <MainHeader
        action={() => {
          props.navigation.openDrawer();
        }}
      />
      <View style={[estilosGeral.main, { gap: 10 }]}>
        <View style={estilosGeral.areaInfo}>
          <Text style={estilosGeral.areaInfoTitulo}>FUNCIONARIOS</Text>
        </View>
        <View style={{ width: '100%' }}>
          <CustomButton
            texto="Cadastrar funcionario"
            action={() => {
              props.navigation.push('PerfilFuncionario');
            }}
          />
        </View>
        <View style={estilosGeral.areaFlat}>
          <FlatList
            data={funcionarios}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
            {...(numColumns > 1 ? { columnWrapperStyle: { gap: 20 } } : {})}
            key={numColumns} 
          />
        </View>
      </View>
    </View>
  );
};

export default TelaFuncionarios;
