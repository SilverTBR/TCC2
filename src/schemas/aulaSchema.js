import * as Yup from 'yup';

const convertMin = (horaMin) => {
    const [hora, min] = horaMin.split(':').map(Number);
    return hora * 60 + min;
};


const aulaSchema = Yup.object().shape({
    data: Yup.string().length(10, "O formato da data está invalida").required("A data da aula é necessaria para prosseguir"),
    horaInicio: Yup.string().length(5, "O formato do horario do inicio da aula está invalida").required(),
    horaFim: Yup.string().length(5, "O formato do horario do fim da aula está invalida").test("horarioFimValido", "O horario para o fim da aula deve ser após o horario de inicio", function (value) {
        const horaInicio = this.parent.horaInicio;
        return convertMin(value) > convertMin(horaInicio)
    }).required(),
    objetivo: Yup.string().min(5, 'O objetivo da aula deve ter pelo menos 5 caracteres.').max(50, "O objetivo da aula deve ter no maximo 50 caracteres").required('O campo objetivo é obrigatório.'),
    atividadesSelecionadas: Yup.array().of(Yup.number().required()).max(20, "Passou do limite de atividades. O limite de atividades por aula é 20.").min(1, "É necessario selecionar ao menos uma atividade."),
    funcionariosSelecionados:  Yup.array().of(Yup.number().required()).max(3, "Passou do limite de funcionários. O limite de funcionarios por aula é 3.").min(1, "É necessario selecionar ao menos um funcionario."),
});

export default aulaSchema;
