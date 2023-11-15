require('dotenv').config({ path: './src/.env' });
const express = require('express');
const app = express();
const porta = process.env.PORT || 3001;
const cors = require('cors');
const conexao = require('./database/models/Mongodb/connectModels');
const mongoConecction = new conexao(process.env.CONNECTIONSTRING);
//const connectionSQL = require('./database/models/Sql/connectSql');

const rotas = require('./routes/SchemmaRoutes');
const { userRoutes } = require('./routes/userRoutes')
const { linkedinRoutes } = require('./routes/linkedinRoutes')

app.use(cors({
    origin: '127.0.0.1' && 'http://localhost:3030',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(rotas);
app.use('/user', userRoutes)
app.use('/linkedin', linkedinRoutes)
//Inicia o servidor:
app.listen(porta, () => { 
    mongoConecction.connect();
    //connectionSQL();
    console.log(`Servidor iniciado na porta: ${porta}`);
    console.log(`--------------------------------------------------------`);
    console.log(`Servidor iniciado no endereço: http://localhost:${porta}`);
    console.log(`--------------------------------------------------------`);
});




