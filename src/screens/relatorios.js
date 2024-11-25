import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import MainHeader from '../components/MainHeader/MainHeader';
import Dropdownlist from '../components/DropdownList/Dropdownlist';
import { estilosGeral } from './styles/Sty_Geral';
import { moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { listarAtividades } from '../controllers/controlAtividades';
import { ListarFuncionarios } from '../controllers/controlFuncionarios';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../components/Button/customButton';
import Render_Relatorio from '../components/Render_relatorio/Render_Relatorio';
import { realizarPesquisa } from '../controllers/controlRelatorios';
import { useWindowDimensions } from 'react-native';


const TelaRelatorios = props => {
  const [dropdownVisibleA, setDropdownVisibleA] = useState(false);
  const [dropdownVisibleF, setDropdownVisibleF] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedAtividades, setSelectedAtividades] = useState([]);
  const [selectedFuncionarios, setSelectedFuncionarios] = useState([]);
  const [date, setDate] = useState(null);
  const [hora, setHora] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [aulasEncontradas, setAulasEncontradas] = useState([]); 
  const [isFilter, setIsFilter] = useState(false)  
  const [numColumns, setNumColumns] = useState(3);


  const realizarPesquisaAulas = async () => {
    const resultadoPesquisa = await realizarPesquisa(selectedFuncionarios, selectedAtividades, hora, date || '');
    if (resultadoPesquisa.success) {
        setAulasEncontradas(resultadoPesquisa.aulas);
    } else {
        console.error('Erro ao realizar pesquisa:', resultadoPesquisa.error);
    }
  };


  const carregarDados = async () => {
    try {
      const resultadoA = await listarAtividades();
      const resultadoF = await ListarFuncionarios();
      if (resultadoA.success && resultadoF.success) {
        setAtividades(resultadoA.atividades);
        setFuncionarios(resultadoF.funcionarios);
      }
    } catch (error) {
      console.error('Erro ao carregar listas:', error);
    }
  };

  
  useEffect(() => {

    const reFocus = props.navigation.addListener('focus', () => {
      carregarDados();
      realizarPesquisaAulas();
    });

    return reFocus;
  }, []);

  useEffect(() => {
    realizarPesquisaAulas();
  }, [selectedFuncionarios, selectedAtividades, hora, date]);


  const {width} = useWindowDimensions();

  const calculaColunas = () => {
    const itemWidth = moderateScale(270);
    const screenWidth = (80 * width)/100;
    const numColunas = Math.floor(screenWidth / itemWidth);
    return Math.max(numColunas, 1); 
  };

  useEffect(() => {
    setNumColumns(calculaColunas());
  }, [width]);


  const closeDropdown = () => {
    setDropdownVisibleA(false);
    setDropdownVisibleF(false);
  };
  
  const somarAulas = () => {
    let avalSom = {
        aval_0: 0,
        aval_1: 0,
        aval_2: 0,
        aval_3: 0,
        aval_4: 0,
    };

    aulasEncontradas.forEach(aula => {
        avalSom.aval_0 += aula.aval_0;
        avalSom.aval_1 += aula.aval_1;
        avalSom.aval_2 += aula.aval_2;
        avalSom.aval_3 += aula.aval_3;
        avalSom.aval_4 += aula.aval_4;
    });

    return avalSom;
};
  const selectFuncionarios = id => {
    setSelectedFuncionarios(prevSelected => {
      const index = prevSelected.indexOf(id);
      if (index === -1) {
        return [...prevSelected, id];
      } else {
        const newSelected = [...prevSelected];
        newSelected.splice(index, 1);
        return newSelected;
      }
    });
  };

  const selectAtividade = id => {
    setSelectedAtividades(prevSelected => {
      const index = prevSelected.indexOf(id);
      if (index === -1) {
        return [...prevSelected, id];
      } else {
        const selecionados = [...prevSelected];
        selecionados.splice(index, 1);
        return selecionados;
      }
    });
  };

  const mudouData = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate && event.type === 'set') {
      setDate(selectedDate);
    }
  };

  const mudouHora = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime && event.type === 'set') {
      const hora = selectedTime.getHours();
      const minuto = selectedTime.getMinutes();
      const tempoAtual = `${hora < 10 ? '0' : ''}${hora}:${
        minuto < 10 ? '0' : ''
      }${minuto}`;
      setHora(tempoAtual);
    }
  };

  const reset = () => {
    setHora('');
    setDate(null);
    setSelectedAtividades([]);
    setSelectedFuncionarios([]);
  };
  
  const acessarRelatorio = item => {
    props.navigation.push('Grafico', { aula: item });
  };

  const renderItem = ({item}) => {
    return <Render_Relatorio item={item} acessar={acessarRelatorio}/>;
};

  return (
    <View style={estilosGeral.background}> 
      <MainHeader
        action={() => {
          props.navigation.openDrawer();
        }}
        filtrar={() => {
          setIsFilter(!isFilter)
        }}
      />
      <View style={[estilosGeral.main, {gap: 10}]}>
        <View style={estilosGeral.areaInfo}>
          <Text style={estilosGeral.areaInfoTitulo}>RELATORIO DE AULAS</Text>
          <Text style={estilosGeral.areaInfoTexto}>
            Aperte em uma aula para gerar um relatório gráfico ou filtre e crie
            um relatório gráfico das aulas filtradas.
          </Text>
        </View>

        {isFilter &&
        <View>
          <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
            <View style={estilosGeral.areaDois}>
              <Text style={estilosGeral.areaInputLabel}>Funcionarios</Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() => {setDropdownVisibleA(!dropdownVisibleA)}}>
                <Text
                  style={[
                    estilosGeral.inputGFontPlaceholder,
                    selectedFuncionarios.length > 0 && estilosGeral.inputGFont,
                  ]}>
                  {selectedFuncionarios.length > 0
                    ? `Funcionários selecionados: ${selectedFuncionarios.length}`
                    : 'Selecione funcionários'}
                </Text>
                <Icon
                  name="angle-down"
                  size={moderateScale(25)}
                  color="black"
                />
              </TouchableOpacity>
              {dropdownVisibleA && (
                <Dropdownlist
                  items={funcionarios}
                  selectedItems={selectedFuncionarios}
                  closeDropdown={closeDropdown}
                  handleSelect={selectFuncionarios}
                  isEditavel={false}
                />
              )}
            </View>

            <View style={estilosGeral.areaDois}>
              <Text style={estilosGeral.areaInputLabel}>Atividades</Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() =>{setDropdownVisibleF(!dropdownVisibleF)}}>
                <Text
                  style={[
                    estilosGeral.inputGFontPlaceholder,
                    selectedAtividades.length > 0 && estilosGeral.inputGFont,
                  ]}>
                  {selectedAtividades.length > 0
                    ? `Atividades selecionadas: ${selectedAtividades.length}`
                    : 'Selecione atividades'}
                </Text>
                <Icon
                  name="angle-down"
                  size={moderateScale(25)}
                  color="black"
                />
              </TouchableOpacity>
              {dropdownVisibleF && (
                <Dropdownlist
                  items={atividades}
                  selectedItems={selectedAtividades}
                  closeDropdown={closeDropdown}
                  handleSelect={selectAtividade}
                  isEditavel={false}
                />
              )}
            </View>
          </View>

          <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
            <View style={estilosGeral.areaDois}>
              <Text style={estilosGeral.areaInputLabel}>Data</Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() => {setShowDate(!showDate);}}>
                <Text
                  style={
                    date === null 
                      ? estilosGeral.inputGFontPlaceholder
                      : estilosGeral.inputGFont
                  }>
                  {date ? date.toLocaleDateString() : 'dd/mm/yyyy'}     
                </Text>
                <Icon name="calendar" size={moderateScale(25)} color="black" />
              </TouchableOpacity>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date ? date : new Date()} 
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={mudouData}
                  negativeButton={{label: "Cancelar"}}
                />
              )}
            </View>

            <View style={estilosGeral.areaDois}>
              <Text style={estilosGeral.areaInputLabel}>Hora</Text>
              <TouchableOpacity
                style={estilosGeral.inputG}
                activeOpacity={0.5}
                onPress={() => {setShowTimePicker(!showTimePicker)}}>
                <Text
                  style={
                    hora === ''
                      ? estilosGeral.inputGFontPlaceholder
                      : estilosGeral.inputGFont
                  }>
                  {hora === '' ? 'HH:MM' : hora}
                </Text>
                <Icon name="clock" size={moderateScale(25)} color="black" />
                
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={mudouHora}
                />
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              gap: 10,
              marginTop: 10,
            }}>
            <View style={estilosGeral.areaDois}>
              <CustomButton
                texto="Resetar"
                action={() => {
                  reset();
                }}
                cor={'#414141'}
              />
            </View>
            <View style={estilosGeral.areaDois}>
              <CustomButton
                texto="Gerar"
                action={() => {acessarRelatorio(somarAulas())}}
          
              />
            </View>
          
          </View>
        </View>
        }
        
        <View style={estilosGeral.areaFlat}>
          <FlatList
            data={aulasEncontradas}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            contentContainerStyle={{gap: 20}}
            showsVerticalScrollIndicator={false}
            {...(numColumns > 1 ? {columnWrapperStyle: {gap: 20}} : {})}
            key={numColumns} 

          />
        </View>
      </View>
    </View>
  );
};

export default TelaRelatorios;
