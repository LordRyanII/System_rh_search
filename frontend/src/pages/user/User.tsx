import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const User = () => {
  const {
    linkedinEmail: linkedinCredentials,
    updateCredentials,
    loggedUserEmail,
    updateLoggedUser,
  } = useContext(UserContext);

  const [loggedEmail, setLoggedEmail] = useState(loggedUserEmail);
  const [linkedinEmail, setEmail] = useState(linkedinCredentials);
  const [linkedinPassword, setPassword] = useState('');

  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Informações do usuário
      </Typography>
      <Divider />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Usuário do Sistema</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap="15px" alignItems="flex-end">
            <TextField
              label="Email (Linkedin)"
              variant="standard"
              size="small"
              defaultValue={loggedEmail}
              onChange={(event) => setLoggedEmail(event.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => updateLoggedUser(loggedEmail)}
            >
              Atualizar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Credenciais Linkedin</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" gap="15px" alignItems="flex-end">
            <TextField
              label="Email (Linkedin)"
              variant="standard"
              size="small"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Senha (Linkedin)"
              variant="standard"
              type="password"
              size="small"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => updateCredentials(linkedinEmail, linkedinPassword)}
            >
              Atualizar
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default User;
