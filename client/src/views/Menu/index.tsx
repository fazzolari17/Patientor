import * as React from 'react';

// Material ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Components
import MenuItem from '../../components/MenuItem';

// Router
import { useNavigate } from 'react-router-dom';

// Utils
import { uppercase } from '../../utils/helperFunctions';

// Component / Views
import Copyright from '../../components/Copyright';

// Redux
import { useSelector } from 'react-redux';
import MenuListComposition from '../../components/MenuList';

// Types
import { RootState } from '../../store';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface IDrawerProps {
  children: React.ReactElement;
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Menu = ({ children, isLoggedIn, handleLogout }: IDrawerProps) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { weather } = useSelector((state: RootState) => state);
  // Degree fahrenheight or celcius
  const tempatureScale = 'F';

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderLoginOrLogoutMenuItem = isLoggedIn ? (
    <MenuItem handleClick={() => handleLogout()} label={'logout'} />
  ) : (
    <MenuItem handleClick={() => navigate('login')} label={'login'} />
  );

  const renderTopMenuLoginOrLogoutButton = isLoggedIn ? (
    <MenuListComposition
      title={uppercase('account')}
      // style={{ marginLeft: 'auto' }}
    />
  ) : (
    <Button
      style={{
        fontSize: '1rem',
        // color: 'white'
      }}
      color={'inherit'}
      id="demo-positioned-button"
      aria-controls={open ? 'demo-positioned-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={() => navigate('login')}
    >
      {'login'}
    </Button>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        // style={{ backgroundColor: '#1976d2' }}
      >
        <Toolbar>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              // sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          {/* Right Side of top App Bar */}
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {/* wire up funcitonality when the menu button is working correctly, should add a name and user menu */}
            {isLoggedIn ? (
              <IconButton
                color="inherit"
                aria-label="weather"
                onClick={() => navigate('/weather')}
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* will rener a icon even if there is an error from the api and prevent the page from crashing */}
                    {weather.weatherData?.weather ? (
                      <img
                        style={{ width: '40px' }}
                        src={`http://openweathermap.org/img/wn/${weather.weatherData?.weather[0].icon}@2x.png`}
                        alt="weather icon"
                      />
                    ) : (
                      <img
                        style={{ width: '40px' }}
                        src={`http://openweathermap.org/img/wn/10d@2x.png`}
                        alt="weather icon"
                      />
                    )}
                    {/* fix this to a more elegant solution it fixes the page not loading if there is an error retrieving weather data from the api */}
                    {`${
                      weather.weatherData?.main
                        ? weather.weatherData?.main.temp.toFixed()
                        : '0'
                    }°${tempatureScale}`}
                  </div>
                  <div style={{ fontSize: '.75rem' }}>
                    {weather.weatherData?.name}
                  </div>
                </div>
              </IconButton>
            ) : (
              ''
            )}
            {renderTopMenuLoginOrLogoutButton}
          </div>

          <Typography variant="h6" noWrap component="div" />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Top Menu List */}
        <List>
          <MenuItem handleClick={() => navigate('home')} label={'home'} />
          {/* Enable weather when the funcitonality has been wired up */}
          <MenuItem
            disabled={isLoggedIn ? false : true}
            handleClick={() => navigate('weather')}
            label={'weather'}
          />
          <MenuItem
            disabled={isLoggedIn ? false : true}
            handleClick={() => navigate('patients')}
            label={'patients'}
          />
        </List>
        <Divider />
        {/* Bottom Menu List */}
        <List>
          <MenuItem handleClick={() => navigate('signUp')} label={'sign up'} />
          {renderLoginOrLogoutMenuItem}
          {/* {
            isLoggedIn 
            ? <MenuItem>Home</MenuItem> //navigateTo={'home'} />
            : <MenuItem navigateTo={'login'} />
          
          } */}
          {/* <ListItem disablePadding>
            <ListItemButton onClick={isLoggedIn ? handleLogout : () => navigate("login")}>
              <ListItemIcon> */}
          {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
          {/* </ListItemIcon>
              <ListItemText primary={capitalized(loginLogoutName)} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>

      <Main
        open={open}
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <DrawerHeader />
        {/* {console.log(children)} */}
        {children}
        <div style={{ marginTop: 'auto' }}>
          <Copyright />
        </div>
      </Main>
    </Box>
  );
};

export default Menu;
