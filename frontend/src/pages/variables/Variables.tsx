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

const Variables = () => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const getVariables = async () => {
      const data = await fetch('http://localhost:4000/variables').then((res) =>
        res.json()
      );

      setVariables(data.variables);
    };

    getVariables();
  }, []);

  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Variáveis
      </Typography>
      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Variável</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variables.map((variable: any) => (
              <TableRow
                key={variable.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {variable.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {variable.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Variables;
