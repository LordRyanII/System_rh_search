const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const userAgents = require('./shared/userAgents'); //Retorna um array de users
const fs = require('fs');
const path = require('path');

puppeteerExtra.use(StealthPlugin());


module.exports = class LinkedinWebscraping {
    constructor() {
        this.browser = null; // Variável global para o navegador
        this.page = null; // Variável global para a página
        this.isLoggedIn = false; // Status do login
    }

    async loginCredenciais(username, password) {
        console.log('Passou pelo webscraping' + username, password);
        if (this.isLoggedIn) {
            console.log('Já está logado');
            return true;
        }

        if (!this.browser) {
            this.browser = await puppeteerExtra.launch({
                headless: false
            });
        }

        if (!this.page) {
            this.page = await this.browser.newPage();
        }

        await this.page.goto('https://www.linkedin.com/login/pt'); // URL de login

        await this.page.type('#username', username); // Email
        await this.page.type('#password', password); // Senha

        await this.page.click('button[aria-label="Entrar"]');

        // Aguarde um tempo aleatório para simular o comportamento humano
        await this.page.waitForTimeout(Math.random() * 3000 + 2000);

        // Verifique se o login foi bem-sucedido
        const title = await this.page.title();

        if (title === 'Login | LinkedIn' || title === 'Entrar ou cadastrar-se no Linkedin' || title === 'Cadastre-se | Linkedin') {
            console.log('Erro no login');
            return false;
        } else {
            console.log('Login bem-sucedido');
            this.isLoggedIn = true; // Defina o sinalizador de login como verdadeiro
            
            return true;
        }
    }

    async checkLoggedIn() {
        if (!this.page) {
            return false;
        }

        const cookies = await this.page.cookies();
        const linkedinCookie = cookies.find(cookie => cookie.name === 'li_at');
        return !!linkedinCookie;
    }

    async pesquisarContato(url) {
        if (!this.browser || !this.page) {
            console.log('Você precisa fazer login antes de pesquisar contatos.');
            return null;
        }

        // Navegue até a URL fornecida
        await this.page.goto(url);

        // Aguarde o carregamento da página
        await this.page.waitForSelector('body');

        // Obtenha o HTML da página
        const pageContent = await this.page.content();
        const directory = './log/success'; // Correção: diretório correto
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {
                recursive: true
            });
        }
        fs.writeFileSync('./log/success/paginaCandidato.html', pageContent); // Correção: caminho correto

        // Use Cheerio para extrair os dados
        const dados = this.filtrarDados(pageContent);

        return dados;
    }

    filtrarDados(html) {
        const dados = {};
        const $ = cheerio.load(html);

        // Extrair o nome
        const nomeElement = $('h1.text-heading-xlarge');
        dados.nome = nomeElement.text().trim();

        // Extrair os detalhes
        const detalhesElement = $('div.text-body-medium[data-generated-suggestion-target]');
        dados.detalhes = detalhesElement.text().trim();

        // Extrair a localização
        const localizacaoElement = $('span.text-body-small.inline.t-black--light');
        dados.localizacao = localizacaoElement.text().trim();

        // Extrair a URL da imagem de perfil
        // const profileImageElement = $('.top-card__profile-image');
        // dados.imagemPerfil = profileImageElement.find('img').attr('src');

        // // Dados adicionais
        dados.experiencia = [];

        // Extrair experiência
        // $('.experience-item').each((index, element) => {
        //     const experiencia = {};
        //     const tituloElement = $(element).find('.profile-section-card__title');
        //     experiencia.titulo = tituloElement.text().trim().replace(/\n\s+/g, '');

        //     // Extrair a empresa (ajustado para remover espaços em branco e duplicados)
        //     const empresaElement = $(element).find('.profile-section-card__subtitle-link');
        //     experiencia.empresa = empresaElement.text().trim().replace(/\s+/g, ' ');

        //     // Extrair o período
        //     const periodoElement = $(element).find('.experience-item__duration');
        //     const periodo = periodoElement.text().trim();
        //     experiencia.periodo = periodo;

        //     dados.experiencia.push(experiencia);
        // });

        const directory = './log/success';
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {
                recursive: true
            });
        }
        fs.writeFileSync('./log/sucess/paginaCandidato.html', pageContent);
        return dados;
    }

    async encerrarConexaoLogin() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
            this.page = null;
            this.isLoggedIn = false; // Reinicie o sinalizador de login
        }
    }
}

// <a class="app-aware-link " target="_self" href="https://www.linkedin.com/search/results/people/?keywords=mateus%20solano&amp;origin=CLUSTER_EXPANSION" data-test-app-aware-link=""><!---->Ver todos os resultados de pessoas<!----></a>