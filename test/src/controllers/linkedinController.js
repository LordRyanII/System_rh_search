const LinkedInSearch = require('../database/models/Linkedin/webscraping/Webscraping');
const LinkedinWebscraping = require('../database/models/Linkedin/webscraping/WebscrapingPerfil');

//Controller para obter o token do linkedin, para uso dos serviços
exports.getCredenciais = async (req, res) => {
    try {
        const code = req.query.code; // Pega o código da query string linkedin (vem na query o token)
        console.log('token_Linkedin:', code);

        if (code) {
            return res.status(200).json({
                Status: 'OK!',
                token_Linkedin: code
            });
        } else {
            return res.status(400).json({
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

//Controller para pesquisar por webscraping, dados do linkedin (Função(cargo) e lugar de pesquisa)

exports.webScraping = async (req, res) => {
    console.log(req.body); //Ver se body vindo ok

    const {searchKeywords, local} = req.body;

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

//Controller para webScrapping de perfil de candidato
//Retorna um json com várias campos de contato

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
        const Perfilinkedin = new LinkedinWebscraping(urlPerfil);
        
        return res.status(200).json({
            "Status": "OK",
            "Dados": await Perfilinkedin.ObterDados()
        });
    } catch (erro) {
        console.log('Erro:', erro);
        return res.status(500).json({
            "Status": "ERRO",
            "Messagem": "Ocorreu um erro ao tentar obter os dados do perfil!"
        });
    }
};
