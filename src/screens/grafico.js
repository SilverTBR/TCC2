import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { estilosGeral } from './styles/Sty_Geral';
import { moderateScale } from 'react-native-size-matters';
import { BarChart } from 'react-native-charts-wrapper';
import Orientation from 'react-native-orientation-locker';
import PerfilHeader from '../components/MainHeader/PerfilHeader';
import { processColor } from 'react-native';
import { deletarAula } from '../controllers/controlAulas';


const TelaGrafico = (props) => {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const [data, setData] = useState([]);

  const definirAval = () => {
    const avalData = [
      { aval: 'Muito ruim', valor: props.route.params.aula.aval_0, cor: '#d01333' },
      { aval: 'Ruim', valor: props.route.params.aula.aval_1, cor: '#f83233' },
      { aval: 'Neutro', valor: props.route.params.aula.aval_2, cor: '#faf400' },
      { aval: 'Bom', valor: props.route.params.aula.aval_3, cor: '#94d732' },
      { aval: 'Muito bom', valor: props.route.params.aula.aval_4, cor: '#99ed1e' },
    ];

    setData(avalData);
  };

  const definirPercentual = () => {
    return (props.route.params.aula.aval_3+props.route.params.aula.aval_4)/(props.route.params.aula.aval_0+props.route.params.aula.aval_1+props.route.params.aula.aval_2+props.route.params.aula.aval_3+props.route.params.aula.aval_4)*100
  }

  const deletarAulaID = async () => {
    try {
      const resultado = await deletarAula(props.route.params.aula.id);
      if (resultado.success) {
        props.navigation.pop()
      }else{
        console.error(resultado.error);
      }
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
    }
  };

  useEffect(() => {
    definirAval();
  }, []);

  return (
    <View style={estilosGeral.background}>
      <PerfilHeader titulo={"PERCENTUAL DE APROVAÇÃO: "+ definirPercentual().toFixed(2)+"%"} action={() => { props.navigation.pop() }} id={props.route.params.aula.id} deleteAction = {() => {deletarAulaID()}}/>
      <View style={[estilosGeral.main, { width: '100%', justifyContent: 'center' }]}>
      <BarChart
  style={{ width: '100%', height: '90%' }}
  data={{
    dataSets: [
      {
        values: data.map(item => ({
          y: item.valor,
          label: item.aval,
        })),
        config: {
          valueTextSize: moderateScale(15),
          colors: data.map(item => processColor(item.cor)),
        },
        label: 'Avaliações',
      },
    ],
  }}
  xAxis={{
    valueFormatter: data.map(item => item.aval),
    granularityEnabled: true,
    textSize: moderateScale(15),
  }}
  yAxis={{
    left: {
      granularity: 1, 
      granularityEnabled: true,
      drawGridLines: false,
      textSize: moderateScale(20), 
    },
    right: {
      granularity: 1, 
      granularityEnabled: true,
      drawGridLines: false,
      textSize: moderateScale(20), 
    },
  }}
  chartDescription={{ text: '' }}
  legend={{
    textSize: moderateScale(15)
  }}
  touchEnabled={false} 
  dragEnabled={false}
/>

      </View>
    </View>
  );
};

export default TelaGrafico;
