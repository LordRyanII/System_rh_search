const express = require('express');
const router = express.Router();
const Apilinkedin = require('../controllers/linkedinController');

router.use(express.json()); // Para JSON
router.use(express.urlencoded({ extended: true })); // Para URL-encoded

//Rota schemma linkedin
router.get('/credenciais/linkedin', Apilinkedin.getCredenciais);
router.post('/v1/res/webscraping', Apilinkedin.webScraping);
router.post('/v1/dadosPerfil', Apilinkedin.capturarLeads);

module.exports = router;
