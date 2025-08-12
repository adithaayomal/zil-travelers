import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Paper
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `transparent`,
  color: '#3c9ca8',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: '5rem',
  },
}));

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <IconWrapper>
          <MapIcon fontSize="inherit" />
        </IconWrapper>
        <Typography variant="h2" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            component={RouterLink}
            to="/"
            size="large"
          >
            Back to Home
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default NotFound;
