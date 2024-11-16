import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

enablePromise(true);

let dbInstance = null;


export const initDB = async () => {
  if (!dbInstance) {
    dbInstance = await conectaBD();
    await criarTabela(dbInstance);
  }
};

export const getDBInstance = () => {
  if (!dbInstance) {
    throw new Error('Banco de dados não inicializado.');
  }
  return dbInstance;
};

export const conectaBD = async () => {
  return openDatabase(
    {name: 'projetoTCC.db', location: 'default'},
    () => {
      console.log('Conectou no banco de dados');
    },
    error => {
      console.error(error);
    },
  );
};

export const criarTabela = async db => {
  const deleteUsuario = `    
    DROP TABLE IF EXISTS usuarios;
  `;

  const deleteFuncionarios = `    
    DROP TABLE IF EXISTS funcionarios;
  `;

  const deleteAulas = `    
  DROP TABLE IF EXISTS aulas;
  `;

  const deleteAtividades = `    
  DROP TABLE IF EXISTS atividades;
  `;

  const deleteAulasAtividades = `    
  DROP TABLE IF EXISTS aulas_atividades;
  `;

  const deleteAulasFuncionarios = `    
  DROP TABLE IF EXISTS aulas_funcionarios;
  `;

  const selectFuncionarios = `    
  select * from funcionarios;
  `;

  const selectAllAtividade = `
      select * from atividades;
`;

  const tabelaAtividade = `
  CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL
  )
  `;

  const tabelaFuncionarios = `
    CREATE TABLE IF NOT EXISTS funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      email TEXT NOT NULL,
      area TEXT NOT NULL,
      CPF TEXT NOT NULL,
      celular TEXT NOT NULL,
      infoExtra TEXT,
      foto TEXT
    )
  `;

  const tabelaAulas = `
  CREATE TABLE IF NOT EXISTS aulas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    hora_inicio TEXT NOT NULL,
    hora_fim TEXT NOT NULL,
    objetivo TEXT NOT NULL,
    aval_0 NUMBER NOT NULL,
    aval_1 NUMBER NOT NULL,
    aval_2 NUMBER NOT NULL,
    aval_3 NUMBER NOT NULL,
    aval_4 NUMBER NOT NULL
  )
`;

  const tabelaAulasAtividades = `
    CREATE TABLE IF NOT EXISTS aulas_atividades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      aula_id INTEGER,
      atividade_id INTEGER,
      FOREIGN KEY (aula_id) REFERENCES aulas(id),
      FOREIGN KEY (atividade_id) REFERENCES atividades(id)
    )
`;

  const tabelaAulasFuncionarios = `
    CREATE TABLE IF NOT EXISTS aulas_funcionarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      aula_id INTEGER,
      funcionario_id INTEGER,
      FOREIGN KEY (aula_id) REFERENCES aulas(id),
      FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
    )
`;

  const viewAllAulas =`
  select * from aulas;
  `

  try {
    // Para testes
    // await db.executeSql(deleteUsuario);
    // await db.executeSql(deleteAulas);
    // await db.executeSql(deleteAulasAtividades);
    // await db.executeSql(deleteAulasFuncionarios);
    // await db.executeSql(deleteFuncionarios);
    // await db.executeSql(deleteAtividades);
    // const [result] = await db.executeSql(selectAllAtividade);
    // const atividades = result.rows.raw();
    // console.log(await db.executeSql(viewAllAulas.));
    // console.log("Atividades:", atividades);
    
    await db.executeSql(tabelaAtividade);
    await db.executeSql(tabelaFuncionarios);
    await db.executeSql(tabelaAulas);
    await db.executeSql(tabelaAulasAtividades);
    await db.executeSql(tabelaAulasFuncionarios);
  } catch (error) {
    console.error('Erro ao criar tabela:', error.message);
  }
};
