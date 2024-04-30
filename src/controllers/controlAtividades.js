
import { getDBInstance } from "../database/sqlite";

const cadastrarAtividade = async (nomeAtividade) => {
    try {
        const db = getDBInstance();
        let erro = null;

        if (!nomeAtividade || nomeAtividade.trim().length === 0) {
            erro = "Nome da atividade não pode estar vazio.";
            return { success: false, error: erro };
        }
        const atividadeLower = nomeAtividade.toLowerCase(); 
        const [validaAtividade] = await db.executeSql(
            'SELECT id FROM atividades WHERE LOWER(nome) = ?',
            [atividadeLower]
        );
        if (validaAtividade.rows.length > 0) {
            erro = "Esta atividade já está cadastrada.";
        }
        if (erro) {
            return { success: false, error: erro };
        }
        await db.executeSql(
            'INSERT INTO atividades (nome) VALUES (?)',
            [nomeAtividade]
        );
        console.log('Atividade cadastrada com sucesso.');
        return { success: true };
    } catch (error) {
        console.error('Erro ao cadastrar atividade:', error);
        return { success: false, error: "Erro ao cadastrar atividade." };
    }
};

const listarAtividades = async () => {
    try {
        const db = getDBInstance();
        const dataA = []

        const [resultado] = await db.executeSql(
            'SELECT * FROM atividades'
        );
        const atividades = resultado.rows.raw(); 
        atividades.forEach(atividade => {
            dataA.push({
                key: atividade.id,
                value: atividade.nome,
            });
        });
        //console.log(dataA);
        return { success: true, atividades: dataA };
    } catch (error) {
        console.error('Erro ao listar atividades:', error);
        return { success: false, error: "Erro ao listar atividades." };
    }
};


const deletarAtividade = async (idAtividade) => {
    try {
        const db = getDBInstance();
        await db.executeSql(
            'DELETE FROM atividades WHERE id = ?',
            [idAtividade]
        );
        console.log('Atividade deletada com sucesso.');
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar atividade:', error);
        return { success: false, error: "Erro ao deletar atividade." };
    }
};

const editarAtividade = async (idAtividade, novoNomeAtividade) => {
    try {
        const db = getDBInstance();
        let erro = null;

        if (!novoNomeAtividade || novoNomeAtividade.trim().length === 0) {
            erro = "Nome da atividade não pode estar vazio.";
        }
        
        const atividadeLower = novoNomeAtividade.toLowerCase(); 
        const [validaAtividade] = await db.executeSql(
            'SELECT id FROM atividades WHERE LOWER(nome) = ? AND id != ?',
            [atividadeLower, idAtividade]
        );
        
        if (validaAtividade.rows.length > 0) {
            erro = "Já existe uma atividade com este nome.";
        }
        
        if (erro) {
            return { success: false, error: erro };
        }
        
        await db.executeSql(
            'UPDATE atividades SET nome = ? WHERE id = ?',
            [novoNomeAtividade, idAtividade]
        );
        
        console.log('Atividade editada com sucesso.');
        return { success: true };
    } catch (error) {
        console.error('Erro ao editar atividade:', error);
        return { success: false, error: "Erro ao editar atividade." };
    }
};


export { cadastrarAtividade, listarAtividades, deletarAtividade, editarAtividade };
