import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigation from '../../src/components/Drawer/DrawerNavigation';
import TelaPerfilFuncionario from './perfilFuncionario';
import TelaAvaliacao from './avaliacao';
import TelaGrafico from './grafico';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            <Stack.Screen name="PerfilFuncionario" component={TelaPerfilFuncionario} />
            <Stack.Screen name="Avaliacao" component={TelaAvaliacao} />
            <Stack.Screen name="Grafico" component={TelaGrafico} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
