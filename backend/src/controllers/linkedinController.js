const { HttpStatusCode } = require('axios'); //Status de código com nome
const linkedinInstance = require('./linkedinInstance');
const { linkedinServices } = require('../services/linkedin');
//const  createPerfil = require('../database/models/Sql/createTableCandidate');
const { Leads, criarLead } = require('../database/models/Mongodb/createSchemma');
const LinkedInSearch = require('../services/linkedin/webscraping/WebscrapingPerfis');


//Controller para obter o Código do linkedin, para uso dos serviços

exports.getCredenciais = async (req, res) => {
    try {
        const code = req.query.code; // Pega o código da query string linkedin (vem na query o token)
        console.log('token_Linkedin:', code);

        if (code) {
            return res.status(HttpStatusCode.Ok).json({
                Status: 'OK!',
                token_Linkedin: code
            });
        } else {
            return res.status(HttpStatusCode.BadRequest).json({
                Status: 'Nok',
                Error: [
                    'Status": "Código não encontrado',
                    'Mensage": "Tente autenticar-se no linkedin primeiro!'
                ]
            });
        }
    } catch (error) {
        console.error("erro", error);
        return res.status(500).json({
            Status: 'Nok',
            Error: 'Erro interno no servidor',
            Mensage: 'Tente novamente em instantes:)'
        });
    }
};

//Controler para login com linkedin

exports.loginLinkedin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);

    const respostaLogin = linkedinInstance.loginCredenciais(email, password);

    try {
        if (respostaLogin) {
            return res.status(200).json({
                status: 'oK',
                mensagem: 'Login efetuado, intância de login iniciada'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Nok',
            mensagem: 'Falha ao tentar logar',
            error: error
        });
    }
};

// capturarLeadsController

exports.capturarLeads = async (req, res) => {
    const urlPerfil = req.body.Url;

    if (!urlPerfil) {
        return res.status(400).json({
            "Status": "NOK",
            "Messagem": "URL não informada"
        });
    }

    console.log(urlPerfil);

    try {
        const dadosPerfil = await linkedinInstance.pesquisarContato(urlPerfil);

        if (!dadosPerfil.nome) {
            return res.status(400).json({
                "Status": "NOK",
                "Messagem": "Houve um erro, verifique se o perfil do lead é público"
            });
        }
        //createPerfil(await linkedinInstance.ObterDados()); Criar dados no models do mysql
        criarLead(dadosPerfil);

        return res.status(200).json({
            "Status": "OK",
            "Dados": dadosPerfil
        });

    } catch (erro) {
        console.log('Erro:', erro);
        return res.status(500).json({
            "Status": "ERRO",
            "Messagem": "Ocorreu um erro ao tentar obter os dados do perfil!"
        });
    }
};


//Controller para pesquisar por webscraping, dados do linkedin (Função(cargo) e lugar de pesquisa)

exports.webScraping = async (req, res) => {
    console.log(req.body); //Ver se body vindo ok

    const {
        searchKeywords,
        local
    } = req.body;

    const linkedInSearch = new LinkedInSearch();
    const searchResults = await linkedInSearch.performSearch(searchKeywords, local);

    try {
        if (searchKeywords !== undefined && local !== undefined) {
            return res.status(200).json({
                "Status": "Ok!",
                "Resultados": searchResults
            });
        } else {
            res.status(400).json({
                "Status": "NOk!",
                "Error": "Não foi possível realizar a pesquisa."
            });
        }
    } catch (erro) {
        return res.status(500).json({
            "Status": "NOK!",
            "Error": [
                'Status": "Erro interno de servidor',
                'Mensage": "Tente novamente em instantes:)'
            ]
        })
    };

};


//Controller para pesquisa por Array tags
exports.verificaDatabase = async (req, res) => {
    const {
        Tags
    } = req.body; // Receba as tags do corpo da requisição POST

    try {
        if (!Tags || !Array.isArray(Tags) || Tags.length === 0) {
            return res.status(400).json({
                'status': 'Nok',
                'mensagem': 'Forneça uma matriz de tags válidas'
            });
        }

        // Pesquise no banco de dados por documentos que tenham pelo menos uma das tags
        const usuariosComTags = await Leads.find({
            Tags: {
                $in: Tags
            }
        }).exec();

        if (usuariosComTags.length === 0) {
            return res.status(404).json({
                'status': 'Nok',
                'mensagem': 'Nenhum usuário encontrado com as tags fornecidas'
            });
        }

        console.log('Usuários encontrados:', usuariosComTags);

        res.status(200).json({
            "status": "OK",
            "mensagem": "Usuários encontrados com as tags fornecidas",
            "usuarios": usuariosComTags
        });
    } catch (err) {
        console.error('Erro ao listar usuários:', err);
        res.status(500).json({
            'status': 'Nok',
            'mensagem': 'Erro ao listar usuários'
        });
    }
};


exports.sendMessage = async (req, res) => {
    try {
        const {
            token,
            personId,
            message
        } = req.body
        const response = await linkedinServices.sendMessage(token, personId, message)
    } catch (error) {
        console.log(error);
        return res.status(HttpStatusCode.InternalServerError).json({
            errors: ['Erro ao enviar mensagem']
        })
    }
}