//Dura entorno de dois meses!
require('dotenv').config
const { RestliClient} = require('linkedin-api-client');
const axios = new RestliClient();

//restilintClient é axios

module.exports = class Apilinkedin {
    constructor() {
        this.data = axios.get({
            resourcePath: '/me',
            accessToken: process.env.CONNECTIONTOKENFORLINKEDIN
        }).then(response => {
            const profile = response.data;
        });
    };
    encontrarContasAnúncio(){
        axios.finder({
            resourcePath: '/adAccounts',
            finderName: 'search',
            queryParams: {
              search: {
                status: {
                  values: ['ACTIVE', 'DRAFT']
                },
                reference: {
                  values: ['urn:li:organization:123']
                },
                test: true
              }
            },
            versionString: '202212',
            accessToken: process.env.CONNECTIONTOKENFORLINKEDIN
          }).then(response => {
            const adAccounts = response.data.elements;
            const total = response.data.paging.total;
          })
    }

};

//Api do npm linkedin, ainda tenho que estudar sobre