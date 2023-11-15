import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Configurations = () => {
  const { loggedUserEmail } = useContext(UserContext)

  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    const getConfigurations = async () => {
      const data = await fetch(
        `http://localhost:4000/user/${loggedUserEmail}/configs`
      ).then((res) => res.json());

      console.log(data);
      setConfigurations(data.configs);
    };

    getConfigurations();
  }, []);
  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Configurações
      </Typography>
      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Configuração</TableCell>
              <TableCell>Limite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configurations.map((configuration: any) => (
              <TableRow
                key={configuration.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {configuration.key}
                </TableCell>
                <TableCell component="th" scope="row">
                  {configuration.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Configurations;
