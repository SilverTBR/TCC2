import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from '@robinbobin/react-native-google-drive-api-wrapper';


GoogleSignin.configure({
    webClientId:
      '779919195317-52t4fqf1er2n7edj96ou8vbkp9bc0bqm.apps.googleusercontent.com',
    androidClientId:
      '779919195317-4p5tubcikni4ftko5hv73khocorcuftj.apps.googleusercontent.com  ',
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
    ],
  });

  
  export const getToken = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        return (await GoogleSignin.getTokens()).accessToken;
      } else {
        const signIn = await GoogleSignin.hasPlayServices();
        if (signIn) {
          const user = await GoogleSignin.signIn();
          if (user.error === statusCodes.SIGN_IN_CANCELLED) {
            console.error('Sign-in cancelado:', user.error);
            return null;
          } else if (user.error) {
            console.error('Sign-in error:', user.error);
            return null;
          }
          console.log('Usuario acessou: ' + user);
          return (await GoogleSignin.getTokens()).accessToken;
        } else {
          console.error('Play Services not available');
          return null;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  export const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  export const exportDB = async () => {
    try {
      const permissao = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (permissao === PermissionsAndroid.RESULTS.GRANTED) {
        
        
        const gdrive = new GDrive();
        gdrive.accessToken = await getToken();
        

        //Pega id da pasta
        let pasta = await gdrive.files.createIfNotExists(
          {
            q: new ListQueryBuilder()
              .e('mimeType', 'application/vnd.google-apps.folder')
              .and()
              .e('name', 'Satisfyme-User-Database')
              .and()
              .in('root', 'parents'),
          },
          gdrive.files.newMetadataOnlyUploader().setRequestBody({
            name: 'Satisfyme-User-Database',
            mimeType: MimeTypes.FOLDER,
            parents: ['root'],
          }),
        );

        //Exluir se tiver arquivos multiplos para garantir que tenha só um salvo
        let arquivosOverwrite = await gdrive.files.list({
          q: new ListQueryBuilder()
            .e('mimeType', MimeTypes.TEXT)
            .and()
            .e('name', 'projetoTCC')
            .and()
            .in(pasta.result.id, 'parents'),
        });

        for (const arquivo of arquivosOverwrite.files) {
          await gdrive.files.delete(arquivo.id);
        }
  
        //Pega conteudo do banco de dados e salva em base64
        const caminhoDoBanco = '/data/user/0/com.satisfyme/databases/projetoTCC.db';
        const conteudoDoBanco = await RNFS.readFile(caminhoDoBanco, 'base64');

        // console.log(pasta.result.id)
        gdrive.files
          .newResumableUploader()
          .setData(conteudoDoBanco, MimeTypes.TEXT)
          // .setShouldUseMultipleRequests(true)
          .setRequestBody({
            name: 'projetoTCC',
            parents: [pasta.result.id],
          })
          .execute();
        
        // console.log("Backup realizado com sucesso");
        await signOut();
        return { success: true, message: "Backup realizado com sucesso." };
      } else {
        console.log('Permissão negada para escrita externa.');
        return { success: false, message: "Permissão negada para escrita externa." };
      }
    } catch (erro) {
      console.error('Erro ocorreu:', erro);
      return { success: false, message: "Um erro ocorreu." };
    }
  };


  export const restoreDB = async () => {
    const caminhoBancoDados = '/data/user/0/com.satisfyme/databases/projetoTCC.db';
  
    try {
      const permissao = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
  
      if (permissao === PermissionsAndroid.RESULTS.GRANTED) {
        const gdrive = new GDrive();
        gdrive.accessToken = await getToken();
  
        let pasta = await gdrive.files.list({
          q: new ListQueryBuilder()
            .e('mimeType', 'application/vnd.google-apps.folder')
            .and()
            .e('name', 'Satisfyme-User-Database')
            .and()
            .in('root', 'parents'),
        });

        if(pasta.files.length <= 0){
          return { success: false, message: "Pasta não foi encontrada." };
        }
  
        let arquivoBackup = await gdrive.files.list({
          q: new ListQueryBuilder()
            .e('mimeType', MimeTypes.TEXT)
            .and()
            .e('name', 'projetoTCC')
            .and()
            .in(pasta.files[0].id, 'parents'),
        });

        if(arquivoBackup.files.length <= 0){
          return { success: false, message: "Backup não foi encontrado." };
        }

  
        let conteudoArquivoBackup = await gdrive.files.getText(
          arquivoBackup.files[0].id,
        );
  
        console.log('Conteúdo do backup:', conteudoArquivoBackup);
  
        await RNFS.writeFile(caminhoBancoDados, conteudoArquivoBackup, 'base64');
          
        console.log('Banco de dados substituído com sucesso.');
        await signOut();
        return { success: true, message: "Banco de dados recuperado com sucesso." };

      } else {
        console.log('Permissão negada para escrita externa.');
        return { success: false, message: "Permissão negada para escrita externa." };

      }
    } catch (error) {
      console.error('Um erro ocorreu:', error);
      return { success: false, message: "Um erro ocorreu." };

    }
  };