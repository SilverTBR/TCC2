import { getDBInstance } from "../database/sqlite";

const validarCampos = (nome, email, area, cpf, celular) => {
    if (!nome || nome.trim().length === 0) {
        return "O campo Nome é obrigatório.";
    } else if (!email || email.trim().length === 0) {
        return "O campo Email é obrigatório.";
    } else if (!area || area.trim().length === 0) {
        return "O campo Área é obrigatório.";
    } else if (!cpf || cpf.trim().length === 0) {
        return "O campo CPF é obrigatório.";
    } else if (!celular || celular.trim().length === 0) {
        return "O campo Celular é obrigatório.";
    }
    return null;
};

const cadastrarFuncionario = async (nome, email, data, area, cpf, celular, foto, infoExtra) => {
    try {
        const db = getDBInstance();
        const erro = validarCampos(nome, email, area, cpf, celular);

        if (erro) {
            return { success: false, error: erro };
        }

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
        console.error('Erro ao cadastrar funcionário:', error);
        return { success: false, error: "Erro ao cadastrar funcionário." };
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
        const db = getDBInstance();
        const erro = validarCampos(nome, email, area, cpf, celular);

        if (erro) {
            return { success: false, error: erro };
        }

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
        console.error('Erro ao editar funcionário:', error);
        return { success: false, error: "Erro ao editar funcionário." };
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
