import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import AdvancedSpinner from '../../components/advancedSpinner/AdvancedSpinner';

// Utils
import { parseString } from '../../utils/utils';

// Types
import { ILoginCredentials } from '../../types/types';

// redux
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { resetUser } from '../../reducers/userReducer';

// Style
import './styles.css';

interface SignInProps {
  handleLogin: (arg0: ILoginCredentials) => Promise<void>;
  handleLogout: () => void;
}

const theme = createTheme();


const loadingSpinner = <AdvancedSpinner />

export default function SignIn({ handleLogin }: SignInProps) {
  const [checkbox, setCheckbox] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [buttonClass, setButtonClass] = React.useState<'button-clicked' | 'button'>('button-clicked');

  const {
    user: { loginError },
  } = useSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  const stringParserMessage = (id: string) => {
    return `misssing or incorrect string on loginPage ${id}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setButtonClass('button-clicked');
    const data = new FormData(event.currentTarget);

    const userToLogin = {
      email: parseString(
        stringParserMessage('email'),
        data.get('email')
      ).toLowerCase(),
      password: parseString(
        stringParserMessage('password'),
        data.get('password')
      ),
      rememberMe: checkbox,
    };

    await handleLogin(userToLogin);
    
  };

  const missingPasswordMessage = <p style={{ color: 'red' }}>Incorrect password. Please try again.</p>

  const clearErrorAndResetLoginState = () => {
    dispatch(resetUser())
    setIsLoading(false)
    setButtonClass('button')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={() => loginError === 'incorrect password' ? clearErrorAndResetLoginState() : null}
            />
            {loginError === 'incorrect password' ? missingPasswordMessage : null}
            <FormControlLabel
              control={
                <Checkbox
                  style={{ marginLeft: '.65rem' }}
                  onClick={(_e) => setCheckbox((prev) => !prev)}
                  id="check"
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            {/* Button and Spinner */}

            <Box sx={{ mt: 2 }} className={`login-button-container`}>
              <Button
                className={`button ${isLoading && !loginError ? buttonClass : ''}`}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disableRipple
              >
                { isLoading && !loginError ? loadingSpinner : 'Sign In' }
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <RouterLink to="/signUp">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
