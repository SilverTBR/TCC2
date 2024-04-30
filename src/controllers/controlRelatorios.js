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
            LEFT JOIN 
                aulas_funcionarios ON aulas.id = aulas_funcionarios.aula_id
            LEFT JOIN 
                funcionarios ON aulas_funcionarios.funcionario_id = funcionarios.id
            LEFT JOIN 
                aulas_atividades ON aulas.id = aulas_atividades.aula_id
            LEFT JOIN 
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

        console.log('Consulta SQL:', consultaSQL);

        const [resultados] = await db.executeSql(consultaSQL);
        const aulas = resultados.rows.raw().map(aula => ({
            ...aula,
            funcionarios: aula.funcionarios.split(','),
            atividades: aula.atividades.split(',')
        }));

        return { success: true, aulas };

    } catch (error) {
        console.error('Erro ao realizar pesquisa:', error);
        return { success: false, error: "Erro ao realizar pesquisa." };
    }
};




const selectAll = async () => {
    try {
        const db = getDBInstance();

        // Consulta SQL para obter todas as aulas de atividades
        const consultaSQL1 = `SELECT * FROM aulas_atividades`;
        console.log('Consulta SQL aulas_atividades:', consultaSQL1);
        const [resultados1] = await db.executeSql(consultaSQL1);
        const atividadesAulas = resultados1.rows.raw();
        console.log('Aulas_atividades:', atividadesAulas);

        // Consulta SQL para obter todos os funcionários das aulas
        const consultaSQL2 = `SELECT * FROM aulas_funcionarios`;
        console.log('Consulta SQL aulas_funcionarios:', consultaSQL2);
        const [resultados2] = await db.executeSql(consultaSQL2);
        const funcionariosAulas = resultados2.rows.raw();
        console.log('Aulas_funcionarios:', funcionariosAulas);

        // Consulta SQL para obter todas as aulas
        const consultaSQL3 = `SELECT * FROM aulas`;
        console.log('Consulta SQL aula:', consultaSQL3);
        const [resultados3] = await db.executeSql(consultaSQL3);
        const aulas = resultados3.rows.raw();
        console.log('aulas:', aulas);

        // Consulta SQL para obter todos os funcionários
        const consultaSQL4 = `SELECT * FROM funcionarios`;
        console.log('Consulta SQL funcionarios:', consultaSQL4);
        const [resultados4] = await db.executeSql(consultaSQL4);
        const funcionarios = resultados4.rows.raw();
        console.log('funcionarios:', funcionarios);

        // Consulta SQL para obter todas as atividades
        const consultaSQL5 = `SELECT * FROM atividades`;
        console.log('Consulta SQL atividades:', consultaSQL5);
        const [resultados5] = await db.executeSql(consultaSQL5);
        const atividades = resultados5.rows.raw();
        console.log('atividades:', atividades);

        return { success: true, atividades: atividadesAulas, funcionarios: funcionarios, aulas: aulas };

    } catch (error) {
        console.error('Erro ao realizar pesquisa:', error);
        return { success: false, error: "Erro ao realizar pesquisa." };
    }
};


export { realizarPesquisa, selectAll };
