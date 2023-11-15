import { Box } from '@mui/material';

const Container = ({ children }) => {
  return (
    <Box
      sx={{
        marginTop: '80px',
        marginLeft: '260px',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
