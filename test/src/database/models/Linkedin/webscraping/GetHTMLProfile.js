const puppeteer = require('puppeteer');
const fs = require('fs');

class WebScrapingPerfil {
    constructor(perfil) {
        this.perfilUser = perfil;
    }

    async ObterDados() {
        const browser = await puppeteer.launch();

        try {
            const page = await browser.newPage();

            // Configurações de User-Agent e idioma
            const userAgents = [
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36',
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/99.0.9999.99 Safari/537.36'
            ];
            const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
            await page.setUserAgent(randomUserAgent);

            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9'
            });

            const profileUrl = this.perfilUser;
            const delay = Math.floor(Math.random() * 4000) + 1000;
            await page.waitForTimeout(delay);

            await page.goto(profileUrl, {
                waitUntil: 'domcontentloaded'
            });

            await page.waitForTimeout(10000);

            const bodyHTML = await page.evaluate(() => document.body.innerHTML);

            console.log(bodyHTML);

            return bodyHTML;
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            await browser.close();
        }
    }
}

const perfilLinkedin = 'https://www.linkedin.com/in/alexandrechiacchio/';
const webscraping = new WebScrapingPerfil(perfilLinkedin);

webscraping.ObterDados()
    .then(response => {
        fs.writeFile('log.html', response, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Arquivo gravado com sucesso.');
            }
        });
    })
    .catch((err) => console.error(err));