import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "./CustomDrawer";
import TelaAula from "../../screens/aula";
import TelaFuncionarios from "../../screens/funcionarios";
import TelaRelatorios from "../../screens/relatorios";

const Drawer = createDrawerNavigator()


const DrawerNavigation = () => {
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>} screenOptions={{ headerShown: false}}>
            <Drawer.Screen name="Aula" component={TelaAula}/>
            <Drawer.Screen name="Funcionarios" component={TelaFuncionarios}/>
            <Drawer.Screen name="Relatorios" component={TelaRelatorios} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation