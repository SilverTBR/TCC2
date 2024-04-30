import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer"
import { loginGoogle, exportDB, restoreDB } from "../../controllers/controlGoogle";
import { useState } from "react";

const CustomDrawer = (props) => { 
    const [token, setToken] = useState("");

  const realizarLogin = async () => {
    const loginResult = await loginGoogle();
  
    if (loginResult.success) {
      console.log('Login bem-sucedido!');
      console.log('UserInfo:', loginResult.userInfo);
      console.log('AccessToken:', loginResult.accessToken);
      setToken(loginResult.accessToken);
    } else {
      // Se o login falhar, mantenha a cor vermelha do driver e imprima uma mensagem de erro
      console.error('Falha ao fazer login.');
    }
  };



    return(
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            {/* <DrawerItem label={"Salvar Backup"} onPress={() => exportDB()}/> */}
            {/* <DrawerItem label={"Login Google"} onPress={() => realizarLogin()}/>
            <DrawerItem label={"Salvar Backup"} onPress={() => exportDB()}/>
            <DrawerItem label={"Restaurar Backup"} onPress={() => restoreDB()}/>  */}
            {/* <DrawerItem label={"Backup"} onPress={openModal} /> */}
        </DrawerContentScrollView>
    )

}

export default CustomDrawer