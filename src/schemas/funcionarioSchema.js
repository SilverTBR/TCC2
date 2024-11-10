import * as Yup from 'yup';

const funcionarioSchema = Yup.object().shape({
    nome: Yup.string().min(3, 'O Nome deve ter pelo menos 3 caracteres.').max(50, "O Nome deve ter no maximo 50 caracteres").required('O campo Nome é obrigatório.'),
    email: Yup.string().email('Email está inválido.').required('O email é obrigatório.'),
    area: Yup.string().min(5, "O campo área deve conter pelo menos 5 caracteres").required('O campo Área é obrigatório.'),
    cpf: Yup.string().length(14, 'CPF está inválido.').required('O CPF é obrigatório.'),
    celular: Yup.string().min(15, 'O número de celular está inválido.').required('O número de celular é obrigatório.'),
    foto: Yup.string(),
    infoExtra: Yup.string()
});

export default funcionarioSchema;
