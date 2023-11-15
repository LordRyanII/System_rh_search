import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ButtonsExample from './LedsBanco';
import FormLead from './FormLead';

const Leads = () => {

  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Sugestões de leads
      </Typography>
      <br />
      <p>
        Aqui você pode pesquisar leads do linkedin, e iniciar o primeiro passo para uma conexão!
      </p>
      <br />
      <br />
      <Divider />
      <ButtonsExample />
    </div>
  );
};

export default Leads;
