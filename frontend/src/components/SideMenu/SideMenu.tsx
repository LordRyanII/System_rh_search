import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsIcon from '@mui/icons-material/Settings';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import MessageIcon from '@mui/icons-material/Message';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyTwoToneIcon from '@mui/icons-material/PsychologyTwoTone';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useNavigate } from 'react-router-dom'; //Pesquisar sobre

const drawerWidth = 240;

export default function SideMenu() {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          zIndex: 1,
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
        <List>
          <ListItem
            key={'user-info'}
            disablePadding
            onClick={() => navigate('/')}
          >
            <ListItemButton>
              <ListItemIcon>
              <HomeRoundedIcon  fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
        </List>



          <ListItem
            key={'dashboard'}
            disablePadding
            onClick={() => navigate('/data/dashbord/metrica')}
          >
            <ListItemButton>
              <ListItemIcon>
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>

          {/* Leads */}
          <ListItem
            key={'leads'}
            disablePadding
            onClick={() => navigate('/Pesquisar/leads')}
          >

            <ListItemButton>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              <ListItemText primary={'Pesquisar Leads'} />
            </ListItemButton>
          </ListItem>

          {/* Leads webscraping */}
          <ListItem
            key={'leads'}
            disablePadding
            onClick={() => navigate('/leads')}
          >

            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={'Sugestões de Leads'} />
            </ListItemButton>
          </ListItem>


          <ListItem
            key={'invites'}
            disablePadding
            onClick={() => navigate('/invites')}
          >
            <ListItemButton>
              <ListItemIcon>
                <ScheduleSendIcon />
              </ListItemIcon>
              <ListItemText primary={'Invites'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            key={'variables'}
            disablePadding
            onClick={() => navigate('/templates/mensagens')}
          >
            <ListItemButton>
              <ListItemIcon>
                <ChangeCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Templates'} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={'messages'}
            disablePadding
            onClick={() => navigate('/messages')}
          >
            <ListItemButton>
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary={'Mensagens'} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={'configs'}
            disablePadding
            onClick={() => navigate('/configurations')}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={'Configurations'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />

        {/* Ia  em breve...*/}

        <List>
          <ListItem
            key={'user-info'}
            disablePadding
            onClick={() => navigate('/ia/chatgpt')}
          >
            <ListItemButton>
              <ListItemIcon>
              <PsychologyTwoToneIcon  fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={'Chatgpt ajuda'} />
            </ListItemButton>
          </ListItem>
        </List>


        <List>
          <ListItem
            key={'user-info'}
            disablePadding
            onClick={() => navigate('/user-info')}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large"/>
              </ListItemIcon>
              <ListItemText primary={'Usuário'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
