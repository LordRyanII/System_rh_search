const express = require('express');
const router = express.Router();
const Apilinkedin = require('../controllers/linkedinController');
const middleware = require('../middleware/validarEmailSenha');

router.use(express.json()); // Para JSON
router.use(express.urlencoded({ extended: true })); // Para URL-encoded

//Rota schemma linkedin
router.post('/v1/loginUser', Apilinkedin.loginLinkedin); //Falta terminar || Apilinkedin.loginLinkedin
router.get('/credenciais/linkedin', Apilinkedin.getCredenciais);
router.post('/v1/res/webscraping', Apilinkedin.webScraping);
router.post('/v1/dadosPerfil', Apilinkedin.capturarLeads); //verificaDatabase
router.post('/v1/pesquisaportags', Apilinkedin.verificaDatabase);

module.exports = router;
