const puppeteer = require('puppeteer');
const cheerio = require('cheerio');



module.exports = class WebScrapingPerfil {
    constructor(perfil) { //passar perfil por aqui (url)
        this.perfilUser = perfil
    }

    async ObterDados() {
        const browser = await puppeteer.launch();

        try {
            const page = await browser.newPage();

            // Defina um User-Agent aleatório
            const userAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Opera/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 OPR/99.0.9999.99',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Vivaldi/99.0.9999.99',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Brave/99.0.9999.99',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Yandex/99.0.9999.99'
            ];
            const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            await page.setUserAgent(randomUserAgent);

            // Defina um idioma preferido
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9'
            });

            const profileUrl = this.perfilUser;

            // Adicione um atraso aleatório entre 1 e 5 segundos antes de acessar a página
            const delay = Math.floor(Math.random() * 4000) + 1000;
            await page.waitForTimeout(delay);

            await page.goto(profileUrl, {
                waitUntil: 'domcontentloaded'
            });

            // Esperar o carregamento completo da página (você pode ajustar isso conforme necessário)
            await page.waitForTimeout(10000);

            // Capturar apenas o conteúdo do <body> da página
            const bodyHTML = await page.evaluate(() => document.body.innerHTML);

            const responsedadosFiltrados = this.filtraDados(bodyHTML);

            console.log(responsedadosFiltrados);
            return responsedadosFiltrados;
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

        // Dados adicionais
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


        return dados;
    }

};