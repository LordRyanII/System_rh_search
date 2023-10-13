require('dotenv').config();
const axios = require('axios');
const idChatGpt = require('./chatgpmodelModels'); //Chama lista de models do chatGpt
const urlChat = 'https://api.openai.com/v1/completions'; // GET

const apiRest = () => {
    setTimeout(() => {
      axios.post(urlChat, {
          model: "text-davinci-003",
          prompt: "Say this is a test",
          max_tokens: 7,
          temperature: 0,
        }, {
          headers: {
            "Content-type": 'application/json',
            Authorization: `Bearer ${process.env.apiKey}`,
          },
        })
        .then(response => console.log(response.data.text))
        .catch(error => console.log('Erro chatgpt', error));
    }, 2000); // Adiciona um atraso de 2 segundos antes de cada solicitação
  }
  
  apiRest();
  
