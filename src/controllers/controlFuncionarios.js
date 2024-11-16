import { getDBInstance } from "../database/sqlite";
import funcionarioSchema from "../schemas/funcionarioSchema";

const cadastrarFuncionario = async (nome, email, data, area, cpf, celular, foto, infoExtra) => {    
    try {
        await funcionarioSchema.validate({nome, email, data, area, cpf, celular, foto, infoExtra})
        const db = getDBInstance();

        const [resultado] = await db.executeSql(
            'SELECT id FROM funcionarios WHERE email = ?',
            [email]
        );
        if (resultado.rows.length > 0) {
            return { success: false, error: "Este email já está cadastrado." };
        }

        await db.executeSql(
            'INSERT INTO funcionarios (nome, email, area, CPF, celular, infoExtra, foto, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nome, email, area, cpf, celular, infoExtra, foto, data]
        );        
        return { success: true };

    } catch (error) {
        if(error.code != null){
            console.error('Erro ao cadastrar funcionário:', error);
            return { success: false, error: "Erro ao cadastrar funcionário." };
        }else{
            return { success: false, error: error.errors[0]};
        }
    }
};


const ListarFuncionarios = async () => {
    try {
        const db = getDBInstance();
        const dataF = [];

        const [resultados] = await db.executeSql(
            'SELECT * FROM funcionarios'
        );
        const funcionarios = resultados.rows.raw(); 
        funcionarios.forEach(funcionario => {
            dataF.push({
                key: funcionario.id,
                value: funcionario.nome,
            });
        });
        return { success: true, funcionarios: dataF };

    } catch (error) {
        console.error('Erro ao listar atividades:', error);
        return { success: false, error: "Erro ao listar atividades." };
    }
};

const selectFuncionarios = async () => {
    try {
        const db = getDBInstance();
        const [resultados] = await db.executeSql(
            'SELECT * FROM funcionarios'
        );
        const funcionarios = resultados.rows.raw(); 
        console.log(funcionarios);
        return { success: true, funcionarios: funcionarios };
    } catch (error) {
        console.error('Erro ao selecionar usuários:', error);
        return { success: false, error: "Erro ao selecionar usuários." };
    }
};

const editarFuncionario = async (id, nome, email, data, area, cpf, celular, foto, infoExtra) => {
    try {
        await funcionarioSchema.validate({nome, email, data, area, cpf, celular, foto, infoExtra})
        const db = getDBInstance();
        const [resultadoVer] = await db.executeSql(
            'SELECT id FROM funcionarios WHERE id = ?',
            [id]
        );
        if (resultadoVer.rows.length === 0) {
            return { success: false, error: "Funcionário não encontrado." };
        }
        await db.executeSql(
            'UPDATE funcionarios SET nome = ?, email = ?, area = ?, data = ?, CPF = ?, celular = ?, infoExtra = ?, foto = ? WHERE id = ?',
            [nome, email, area, data, cpf, celular, infoExtra, foto, id]
        );
        return { success: true };
    } catch (error) {
        if(error.code != null){
            console.error('Erro ao editar funcionário:', error);
            return { success: false, error: "Erro ao editar funcionário."};
        }else{
            return { success: false, error: error.errors[0]};
        }
    }
};

const excluirFuncionario = async (id) => {
    try {
        const db = getDBInstance();
        const [resultadoVer] = await db.executeSql(
            'SELECT id FROM funcionarios WHERE id = ?',
            [id]
        );
        if (resultadoVer.rows.length === 0) {
            return { success: false, error: "Funcionário não encontrado." };
        }

        await db.executeSql(
            'DELETE FROM funcionarios WHERE id = ?',
            [id]
        );

        return { success: true };

    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        return { success: false, error: "Erro ao excluir funcionário." };
    }
};

export { cadastrarFuncionario, ListarFuncionarios, selectFuncionarios, editarFuncionario, excluirFuncionario };
