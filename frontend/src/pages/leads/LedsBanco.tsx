import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../../assets/css/CardBanco.css';

const urlBase = 'http://localhost:3001/v1/pesquisaportags'; //Api para busca por tags

function ConsultaBanco({ responseData }) {
  if (!responseData || responseData.length === 0) {
    return (
      <div className="headerResults">
        Nenhum usuário encontrado
      </div>
    );
  }

  return (
    <div className="cardBanco">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Detalhes</th>
            <th>Localização</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((user, index) => (
            <tr key={index}>
              <td>{user.nome}</td>
              <td>{user.detalhes}</td>
              <td>{user.localizacao}</td>
              <td>{user.Tags.join(', ')}</td>
              <td>
                <Button variant="success">Minha oportunidade!</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function ButtonsExample() {
  const [inputValue, setInputValue] = useState('');
  const [responseData, setResponseData] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(urlBase, { Tags: [inputValue] });
      setResponseData(response.data.usuarios);
    } catch (error) {
      console.error('Houve algum erro, voltamos em seguida:)', error);
      setResponseData([]);
    }
  }

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Digite uma tag para pesquisar leads"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={handleSubmit}>
          Pesquisar
        </Button>
      </InputGroup>

      {responseData.length === 0 && <p>Pesquise para encontrar oportunidades ;)</p>}
      <ConsultaBanco responseData={responseData} />
    </>
  );
}

export default ButtonsExample;
