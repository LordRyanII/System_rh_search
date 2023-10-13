const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports = class WebScrapingPerfil {
    constructor(perfil) { //Recebe do controller
        this.perfilUser = perfil
    }

    async ObterDados() {
        const browser = await puppeteer.launch(); //Abre o navegador no backend

        try {
            const page = await browser.newPage();

            // Defina um navegador aleatório 
            const userAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/99.0.9999.99 Safari/537.36'
            ];
            const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]; //De modo aleatório um dos navegadores será usado
            await page.setUserAgent(randomUserAgent); // Define navegador aleatório

            // Defina um idioma preferido
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9'
            });

            const profileUrl = this.perfilUser; //Armazena url do perfil em uma nova variável

            // Adicione um atraso aleatório entre 1 e 5 segundos antes de acessar a página
            const delay = Math.floor(Math.random() * 4000) + 1000;
            await page.waitForTimeout(delay);

            await page.goto(profileUrl, {
                waitUntil: 'domcontentloaded'
            });

            // Esperar o carregamento completo da página
            await page.waitForTimeout(10000);

            //body da página
            const bodyHTML = await page.evaluate(() => document.body.innerHTML);

            const responsedadosFiltrados = this.filtraDados(bodyHTML);

            return responsedadosFiltrados
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            await browser.close();
        }
    }
    filtraDados(html) {
        const dados = {};

        const $ = cheerio.load(html); 

        // Extrair o nome
        const nomeElement = $('.top-card-layout__title');
        dados.nome = nomeElement.text().trim();

        // Extrair os detalhes
        const detalhesElement = $('.top-card-layout__headline');
        dados.detalhes = detalhesElement.text().trim();

        // Extrair a localização
        const localizacaoElement = $('.top-card__subline-item');
        const localizacaoText = localizacaoElement.text().trim();

        // Remover o número de seguidores e conexões da localização
        dados.localizacao = localizacaoText.replace(/\d+\s+followers\s+\d+\s+connections/g, '').trim();

        // Extrair a URL da imagem de perfil
        const profileImageElement = $('.top-card__profile-image');
        dados.imagemPerfil = profileImageElement.find('img').attr('src');

        // Array dados adicionais
        dados.experiencia = [];

        $('.experience-item').each((index, element) => {
            const experiencia = {};
            const tituloElement = $(element).find('.profile-section-card__title');
            experiencia.titulo = tituloElement.text().trim().replace(/\n\s+/g, ''); // Remover espaços em branco e quebras de linha

            // Extrair a empresa (ajustado para remover espaços em branco e duplicados)
            const empresaElement = $(element).find('.profile-section-card__subtitle-link');
            experiencia.empresa = empresaElement.text().trim().replace(/\s+/g, ' ');

            // Extrair o período
            const periodoElement = $(element).find('.experience-item__duration');
            const periodo = periodoElement.text().trim();
            experiencia.periodo = periodo;

            dados.experiencia.push(experiencia);
        });


        return dados; //Retorna dados formatados
    }

};