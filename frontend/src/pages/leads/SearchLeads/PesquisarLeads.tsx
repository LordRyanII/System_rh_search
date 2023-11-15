import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const urlBase = 'http://localhost:3001/v1/res/webscraping';

const Leads = () => {
  const [inputValue, setInputValue] = useState('');
  const [localValue, setLocalValue] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLocalInput, setShowLocalInput] = useState(false);

  const apiBusca = async () => {
    setIsLoading(true); // Mostra tela de carregamento caso true
    try {
      const response = await axios.post(urlBase, {
        searchKeywords: inputValue,
        local: localValue
      });
      setResponseData(response.data.Resultados);
    } catch (error) {
      console.error('Houve algum erro, voltamos em seguida:)', error);
      setResponseData([]);
      console.log('Deu erro: ', error);
    } finally {
      setIsLoading(false); // Esconde tela de carregamento
    }
  };

  const getNomeSobrenome = (title) => {
    const parts = title.split(' - ');
    return parts[0]; // Retorna o nome e sobrenome
  };

  const getCargo = (title) => {
    const parts = title.split(' - ');
    return parts[1]; // Retorna o cargo
  };

  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Pesquisa de leads
      </Typography>
      <br />
      <p>
        Aqui você pode pesquisar leads do LinkedIn e iniciar o primeiro passo para uma conexão!
      </p>
      <br />
      <br />
      <Divider />
      <Box display="flex" alignItems="flex-end" gap="15px">
        <TextField
          label="Cargo"
          type="text"
          variant="standard"
          size="small"
          onChange={(e) => setInputValue(e.target.value)}
        />
        {showLocalInput ? (
          <TextField
            label="Localidade"
            type="text"
            variant="standard"
            size="small"
            onChange={(e) => setLocalValue(e.target.value)}
          />
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => setShowLocalInput(true)}
          >
            +
          </Button>
        )}
        <Button
          variant="contained"
          size="small"
          onClick={apiBusca}
          disabled={isLoading}
        >
          {isLoading ? 'Carregando...' : 'Pesquisar'}
        </Button>
      </Box>
      <br />
      <br />
      <br />
      {/* Exibir a mensagem "Digite para fazer negócios!" se a tabela estiver vazia */}
      {responseData.length === 0 && !isLoading && (
        <div>
          <h4 style={{ margin: 'auto', textAlign: 'center' }}>Digite para fazer negócios! </h4>
        </div>
      )}
      {/* Exibir os resultados da API e colocar na tabelinha*/}
      {responseData.length > 0 && (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th scope="col">Nome e Sobrenome</th>
              <th scope="col">Cargo</th>
              <th scope="col">URL do Perfil</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((result, index) => (
              <tr key={index}>
                <td>{getNomeSobrenome(result.title)}</td>
                <td>{getCargo(result.title)}</td>
                <td>
                  <Button
                    variant="contained"
                    onClick={() => window.open(result.url, '_blank')}
                    title="Acesse o perfil, inicie a conexão"
                  >
                    Visualizar LinkedIn
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Leads;


// ver com a andreia sobre ver perfil