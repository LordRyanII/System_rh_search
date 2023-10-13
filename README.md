# System_rh_search
 <h2>Sistema de pesquisa de candidatos e leads</h2> <br>
 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
 <p> O sistema usa da biblioteca puppeter para pegar dados do linkedin, ou seja fazer webscraping de uma determinada página. Assim você acessa de forma anônima o perfil de um candidato, como se tivesse usando o primium do linkedin. Sendo possível pegar esses dados e criando uma base de candidatos. Nele é possível pesquisar os candidatos por localidade e palavra chave (função e local) e assim pegar a url do perfil e adicionar para fazer a raspagem de dados.</p><br>
- Frameworks, bibliotecas usadas e banco de dados<br>
<ul>
      <li>  Node.js  </li>
      <li>    Express </li>
      <li>    Axios   </li>
      <li>  Puppeter  </li>
      <li>  Cheerio  </li>
      <li>  Mongoose  </li>
      <li>  MongoDB  </li>
      <li>  Bootstrap5  </li>
      <li>    React.js </li>
</ul>
<br>     
<h2>Principais mecânicas</h2>
- Sistema de Adm <br>
- Login <br>
- Sistema para cadastro, atualização e delete de leads <br>
- Futuramente sistema do ChatGpt integrado
<br>
<h2>Intalação Backend</h2>
<p>Para iniciar o backend digite no terminal:</p>
- cd backend > npm install > npm start.<br>
- No postman, copie as uri: http://localhost:3001/v1/ | Url base<br>

- Após use as seguinte uri: 
	-  POST: http://localhost:3001/v1/dadosPerfil  => Lista os candidatos por função e localidade | 
	- POST: http://localhost:3001/v1/dadosPerfil => Lista o nome, detalhes  e experiências profissionais.
		- Body para listar os candidatos por função e localidade:

				{
	
						"searchKeywords":  string

						"local":  string

				}
				 
		- Body para listar os atributos dos candidatos

				{

					"Url": string

				}
				 


<br>
<h2>Documentações </h2>
<p>Referência de documentação:</p>
<ul>
	<li>OpenIa: <li>https://platform.openai.com/docs/introduction/overview <br>
<li>Linkedin Developer: https://developer.linkedin.com <br>
<li>Linkedin Oath for node.js: https://github.com/linkedin-<li>developers/linkedin-api-js-client#simple-api-request-example <br>
<li>Linkin Perfil de testes: https://www.linkedin.com/company/krust-developers/
</ul>
