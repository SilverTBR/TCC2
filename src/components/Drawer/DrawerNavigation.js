import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { moderateScale } from "react-native-size-matters";

import CustomDrawer from "./CustomDrawer";
import TelaAula from "../../screens/aula";
import TelaFuncionarios from "../../screens/funcionarios";
import TelaRelatorios from "../../screens/relatorios";

const Drawer = createDrawerNavigator()


const DrawerNavigation = () => {
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>} screenOptions={{ headerShown: false, drawerLabelStyle: {color: "white", fontSize: moderateScale(14)}, drawerStyle: {backgroundColor: "black"}, drawerActiveBackgroundColor: "#333333"}}>
            <Drawer.Screen name="Aulas" component={TelaAula} options={{drawerIcon: () => <Icon name="table-tennis" size={moderateScale(30)} color="white" />}}/>
            <Drawer.Screen name="Funcionarios" component={TelaFuncionarios} options={{drawerIcon: () => <Icon name="user-alt" size={moderateScale(30)} color="white" />}}/>
            <Drawer.Screen name="Relatorios" component={TelaRelatorios}options={{drawerIcon: () => <Icon name="file-alt" size={moderateScale(30)} color="white" style={{marginRight: moderateScale(7)}}/>}}/>
        </Drawer.Navigator>
    )
}

export default DrawerNavigation