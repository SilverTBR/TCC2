import { getDBInstance } from "../database/sqlite";

const realizarPesquisa = async (funcionarioSel, atividadeSel, hora, data) => {
    try {
        const db = getDBInstance(); 
        let filtroAdicionado = false;

        let consultaSQL = `
            SELECT 
                aulas.id,
                aulas.data,
                aulas.hora_inicio,
                aulas.hora_fim,
                aulas.objetivo,
                aulas.aval_0,
                aulas.aval_1,
                aulas.aval_2,
                aulas.aval_3,
                aulas.aval_4,
                GROUP_CONCAT(DISTINCT funcionarios.nome) AS funcionarios,
                GROUP_CONCAT(DISTINCT atividades.nome) AS atividades
            FROM 
                aulas
            INNER JOIN 
                aulas_funcionarios ON aulas.id = aulas_funcionarios.aula_id
            INNER JOIN 
                funcionarios ON aulas_funcionarios.funcionario_id = funcionarios.id
            INNER JOIN 
                aulas_atividades ON aulas.id = aulas_atividades.aula_id
            INNER JOIN 
                atividades ON aulas_atividades.atividade_id = atividades.id
        `;

        if (funcionarioSel.length > 0) {
            let funcionariosIds = '';
            funcionarioSel.forEach(funcionario => {
                if (funcionariosIds !== '') {
                    funcionariosIds += ',';
                }
                funcionariosIds += funcionario;
            });
            consultaSQL += ` WHERE aulas.id IN (
                SELECT DISTINCT aula_id FROM aulas_funcionarios WHERE funcionario_id IN (${funcionariosIds})
            )`;
            filtroAdicionado = true;
        }

        if (atividadeSel.length > 0) {
            let atividadesIds = '';
            atividadeSel.forEach(atividade => {
                if (atividadesIds !== '') {
                    atividadesIds += ',';
                }
                atividadesIds += atividade;
            });
            consultaSQL += `${filtroAdicionado ? ' AND' : ' WHERE'} aulas.id IN (
                SELECT DISTINCT aula_id FROM aulas_atividades WHERE atividade_id IN (${atividadesIds})
            )`;
            filtroAdicionado = true;
        }


        if (hora) {
            consultaSQL += `${filtroAdicionado ? ' AND' : ' WHERE'}`;
            consultaSQL += ` (hora_inicio <= hora_fim AND '${hora}' >= hora_inicio AND '${hora}' <= hora_fim) OR 
                            (hora_inicio > hora_fim AND ('${hora}' >= hora_inicio OR '${hora}' <= hora_fim))`;
            filtroAdicionado = true;
        }


        if (data) {
            consultaSQL += `${filtroAdicionado ? ' AND' : ' WHERE'}`;
            consultaSQL += ` aulas.data = '${data.toLocaleDateString()}'`;
        }

        consultaSQL += ` GROUP BY aulas.id`;


        const [resultados] = await db.executeSql(consultaSQL);
        const aulas = resultados.rows.raw().map(aula => ({
            ...aula,
            funcionarios: aula.funcionarios.split(','),
            atividades: aula.atividades.split(',')
        }));

        console.log(aulas);

        return { success: true, aulas };

    } catch (error) {
        console.error('Erro ao realizar pesquisa:', error);
        return { success: false, error: "Erro ao realizar pesquisa." };
    }
};




export { realizarPesquisa };
