import * as Yup from 'yup';

const atividadeSchema = Yup.object().shape({
    nomeAtividade: Yup.string().min(5, 'A atividade deve ter pelo menos 5 caracteres.').max(50, "A ativadade deve ter no maximo 50 caracteres").required('Para cadastrar uma atividade é necessario preencher o campo.')
});

export default atividadeSchema;
