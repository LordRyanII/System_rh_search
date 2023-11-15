const mongoose = require('mongoose');

const leadsSchema = new mongoose.Schema({
    nome: String,
    detalhes: String,
    localizacao: String,
    experiencia: Array,
    Tags: Array,
    DataCaptura: Array
});

const Leads = mongoose.model('Leads', leadsSchema);

const criarLead = async (dados) => {
    console.log(dados);
    const { nome, detalhes, localizacao, experiencia } = dados;
    const Tags = ['Desenvolvedor', 'Javascript', 'FullStack', 'React.js', 'junior'];
    const data = dataCaptura();

    const novoLead = new Leads({
        nome: nome,
        detalhes: detalhes,
        localizacao: localizacao,
        experiencia: experiencia,
        Tags: Tags,
        DataCaptura: data
    });

    try {
        const leadSalvo = await novoLead.save();
        console.log('Lead salvo com sucesso:', leadSalvo);
        return leadSalvo;
    } catch (error) {
        console.error('Erro ao salvar lead:', error);
        throw error;
    }
};

const dataCaptura = () => {
    return Date().toLocaleString("pt-BR",{timeZone:'America/Sao_Paulo'}); //o usuário vai poder saber se aqueles dados podem ou não serem dados atualizados
}


console.log(dataCaptura())
module.exports = {criarLead, Leads};
