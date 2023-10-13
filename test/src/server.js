require('dotenv').config();
const express = require('express');
const app = express();
const porta = 3001;
const conexao = require('./database/models/Mongodb/connectModels');
const mongoConecction = new conexao(process.env.CONNECTIONSTRING);
const rotas = require('./routes/SchemmaRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(rotas);

//Inicia o servidor:
app.listen(porta, () => { 
    mongoConecction._connect();
    console.log(`Servidor iniciado na porta: ${porta}`);
    console.log(`--------------------------------------------------------`);
    console.log(`Servidor iniciado no endereço: http://localhost:${porta}`);
    console.log(`--------------------------------------------------------`);
});
