import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { estilosGeral } from './styles/Sty_Geral';
import { moderateScale } from 'react-native-size-matters';
import { BarChart } from 'react-native-charts-wrapper';
import Orientation from 'react-native-orientation-locker';
import PerfilHeader from '../components/mainHeader/PerfilHeader';
import { processColor } from 'react-native';


const TelaGrafico = (props) => {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const [data, setData] = useState([]);

  const definirAval = async () => {
    const avalData = [
      { aval: 'Muito ruim', valor: props.route.params.aula.aval_0, cor: '#d01333' },
      { aval: 'Ruim', valor: props.route.params.aula.aval_1, cor: '#f83233' },
      { aval: 'Neutro', valor: props.route.params.aula.aval_2, cor: '#faf400' },
      { aval: 'Bom', valor: props.route.params.aula.aval_3, cor: '#94d732' },
      { aval: 'Muito bom', valor: props.route.params.aula.aval_4, cor: '#99ed1e' },
    ];

    setData(avalData);
  };

  useEffect(() => {
    definirAval();
  }, []);

  return (
    <View style={estilosGeral.background}>
      <PerfilHeader titulo="RELATORIO GRAFICO" action={() => { props.navigation.pop() }} />
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
