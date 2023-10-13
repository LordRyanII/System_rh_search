const axios = require('axios');
require('dotenv').config();

module.exports = class AutenticarUser {
    constructor() {
        this.linkedinAuthUrl = "https://www.linkedin.com/oauth/v2/authorization" + "?response_type=code" + `&client_id=${process.env.CLIENTID}` + `&redirect_uri=${process.env.HOSTLINKEDIN}` +
            "&state=foobar" +
            "&scope=openid%20profile%20email%20w_member_social";
    }
    
    async getAuth() {
        try {
            const response = await axios.get(this.linkedinAuthUrl);
            return this.responseLinkedin(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    responseLinkedin(res) {
        return res;
    }
};


//Primeira versão não eficiente, porém quero ver se consigo aprimorar