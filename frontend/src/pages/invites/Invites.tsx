import { Divider, Typography } from '@mui/material';
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

const Invites = () => {
  const { loggedUserEmail } = useContext(UserContext);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    const getInvites = async () => {
      const data = await fetch(
        `http://localhost:4000/user/${loggedUserEmail}/invites`
      ).then((res) => res.json());

      console.log(data);
      setInvites(data.invites);
    };

    getInvites();
  }, []);
  return (
    <section>
      <Typography variant="h1" component="h2" fontSize={28}>
        Invites
      </Typography>
      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Usuário</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites.map((invite: any) => (
              <TableRow
                key={invite.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{invite.invitee}</TableCell>
                <TableCell>{invite.at}</TableCell>
                <TableCell>{invite.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Invites;
