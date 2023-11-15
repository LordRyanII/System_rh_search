import { Alert, Divider, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const Messages = () => {
  const { loggedUserEmail } = useContext(UserContext)
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      const data = await fetch(
        `http://localhost:4000/user/${loggedUserEmail}/messages`
      ).then((res) => res.json());

      console.log(data);
      setMessages(data.messages);
    };

    getMessages();
  }, []);
  return (
    <section>
      <Typography variant="h1" component="h2" fontSize={28}>
        Mensagens
      </Typography>
      <Divider />

      <Alert severity="info">
        Voce pode conferir as variáveis na{' '}
        <Link to="/variables">página de variáveis</Link>, assim tendo
        conhecimento de onde elas serão usadas e buscadas.
      </Alert>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tipo</TableCell>
              <TableCell>Mensagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message: any) => (
              <TableRow
                key={message.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {message.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.text}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Messages;
