
import { getDBInstance } from "../database/sqlite";
import atividadeSchema from "../schemas/atividadeSchema";


const cadastrarAtividade = async (nomeAtividade) => {
    try {
        await atividadeSchema.validate({nomeAtividade})
        const db = getDBInstance();
        const atividadeLower = nomeAtividade.toLowerCase(); 
        const [validaAtividade] = await db.executeSql(
            'SELECT id FROM atividades WHERE LOWER(nome) = ?',
            [atividadeLower]
        );
        if (validaAtividade.rows.length > 0) {
            return {sucess: false, error: "Esta atividade já está cadastrada."}
        }
        await db.executeSql(
            'INSERT INTO atividades (nome) VALUES (?)',
            [nomeAtividade]
        );
        console.log('Atividade cadastrada com sucesso.');
        return { success: true };
    } catch (error) {
        if(error.code != null){
            console.error('Erro ao cadastrar atividade:', error);
            return { success: false, error: "Erro ao cadastrar atividade." };
        }else{
            return { success: false, error: error.errors[0]};
        }
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
        return { success: true, atividades: dataA };
    } catch (error) {
        console.error('Erro ao listar atividades:', error);
        return { success: false, error: "Erro ao listar atividades." };
    }
};

const deletarAtividade = async (idAtividade) => {
    try {
        const db = getDBInstance();
        const [validaAtividade] = await db.executeSql(
            'SELECT id FROM aulas_atividades WHERE atividade_id = ?',
            [idAtividade]
        );
        if (validaAtividade.rows.length > 0) {
            return {sucess: false, error: "Não é possivel excluir uma atividade que foi utilizada em uma aula."}
        }
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

const editarAtividade = async (idAtividade, nomeAtividade) => {
    try {
        let erro = null
        await atividadeSchema.validate({nomeAtividade})
        const db = getDBInstance();

        
        const atividadeLower = nomeAtividade.toLowerCase(); 
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

        console.log("idAtividade");

        
        await db.executeSql(
            'UPDATE atividades SET nome = ? WHERE id = ?',
            [nomeAtividade, idAtividade]
        );
        
        console.log('Atividade editada com sucesso.');
        return { success: true };
    } catch (error) {
        if(error.code != null){
            console.error('Erro ao editar atividade:', error);
            return { success: false, error: "Erro ao editar atividade." };
        }else{
            console.error('Erro ao editar atividade:', error);
            return { success: false, error: error.errors[0]};
        }
    }
};


export { cadastrarAtividade, listarAtividades, deletarAtividade, editarAtividade };
