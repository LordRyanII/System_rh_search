const puppeteer = require('puppeteer');

class LinkedInSearch {
    async performSearch(searchKeywords, local) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        const formattedKeywords = `"${searchKeywords}" "${local}" -"patrocinado" AND "consultor" -intitle:"profiles" -inurl:"dir/" site:br.linkedin.com/in/ OR site:br.linkedin.com/pub/`;
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedKeywords)}`;
      
        console.log('Google URL:', googleUrl); // Debug: Ver se dados ok
      
        await page.goto(googleUrl);
      
        const searchResults = await page.evaluate(() => {
          const results = [];
      
          //Filtrar html pag google
          document.querySelectorAll('.tF2Cxc').forEach((result) => {
            const title = result.querySelector('.DKV0Md')?.textContent;
            const url = result.querySelector('.yuRUbf a')?.href;
      
            if (title && url) {
              results.push({ title, url });
            }
          });
      
          return results; //Adiciona resultados em ARRAY results
        });
      
        console.log('Search Results:', searchResults); // Debug: Ver se dados ok
      
        await browser.close(); //Fecha browser de pesquisa
      
        return searchResults;
      }
}

module.exports = LinkedInSearch;
