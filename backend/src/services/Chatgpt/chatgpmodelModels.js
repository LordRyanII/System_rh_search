require('dotenv').config()
const axios = require('axios');
const apiKey = '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';
const urlChat = 'https://api.openai.com/v1/models'; //GET

const prompt = 'Batman';

const apiGet = () => {
    axios.get(urlChat, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${process.env.apiKey}`,
        },
    })
    .then(response => pegaId(response.data.data))
        .catch(error => console.log('Erro chatgpt', error))
}

const pegaId = (json) => {
    const idModel = json.map(obj => {
        return obj['id']
    })
    return idModel
}

console.log(apiGet())

module.exports = apiGet()