    import { getDBInstance } from "../database/sqlite";
    import aulaSchema from "../schemas/aulaSchema";

    const cadastrarAula = async (data, horaInicio, horaFim, objetivo, atividadesSelecionadas, funcionariosSelecionados) => {
        try {
            await aulaSchema.validate({data, horaInicio, horaFim, objetivo, atividadesSelecionadas, funcionariosSelecionados})
            const db = getDBInstance();            

            const [result] = await db.executeSql(
                'INSERT INTO aulas (data, hora_inicio, hora_fim, objetivo, aval_0, aval_1, aval_2, aval_3, aval_4) VALUES (?, ?, ?, ?, 0, 0, 0, 0, 0)',
                [data, horaInicio, horaFim, objetivo]
            );

            const aulaId = result.insertId;
            atividadesSelecionadas.forEach(async (atividadeId) => {
                await db.executeSql(
                    'INSERT INTO aulas_atividades (aula_id, atividade_id) VALUES (?, ?)',
                    [aulaId, atividadeId]
                );
            });

            funcionariosSelecionados.forEach(async (funcionarioId) => {
                await db.executeSql(
                    'INSERT INTO aulas_funcionarios (aula_id, funcionario_id) VALUES (?, ?)',
                    [aulaId, funcionarioId]
                );
            });
            

            console.log('Aula cadastrada com sucesso.');
            return { success: true, aulaId };
        } catch (error) {
            if(error.code != null){
                console.error('Erro ao cadastrar aula:', error);
                return { success: false, error: "Erro ao cadastrar aula." };
            }else{
                return { success: false, error: error.errors[0]};
            }
        }
    };

    const alterarAvaliacao = async (aulaId, aval_0, aval_1, aval_2, aval_3, aval_4) => {
        try {
            const db = getDBInstance();
            await db.executeSql(
                'UPDATE aulas SET aval_0 = ?, aval_1 = ?, aval_2 = ?, aval_3 = ?, aval_4 = ? WHERE id = ?',
                [aval_0, aval_1, aval_2, aval_3, aval_4, aulaId]
            );
            console.log('Avaliações atualizadas com sucesso.');
            return { success: true };
        } catch (error) {
            console.error('Erro ao atualizar as avaliações:', error);
            return { success: false, error: "Erro ao atualizar as avaliações." };
        }
    };

    const deletarAula = async (aulaId) => {
        try {
            const db = getDBInstance();

            await db.executeSql(
                'DELETE FROM aulas_atividades WHERE aula_id = ?',
                [aulaId]
            );

            await db.executeSql(
                'DELETE FROM aulas_funcionarios WHERE aula_id = ?',
                [aulaId]
            );

            await db.executeSql(
                'DELETE FROM aulas WHERE id = ?',
                [aulaId]
            );

            console.log('Aula deletada com sucesso.');
            return { success: true };
        } catch (error) {
            console.error('Erro ao deletar aula:', error);
            return { success: false, error: "Erro ao deletar aula." };
        }
    };


    export { cadastrarAula, alterarAvaliacao, deletarAula };
