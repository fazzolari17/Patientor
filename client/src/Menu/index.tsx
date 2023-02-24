import * as React from 'react';
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Types
import { FC } from 'react';
import { ILoginCredentials, User } from '../types';

// Components
import MenuItem from '../components/MenuItem';

import { RouterProps, useNavigate } from 'react-router-dom';
import { capitalized, uppercase } from '../utils/helperFunctions';
import Copyright from '../components/Copyright';

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
  handleLogin: (arg0: ILoginCredentials) => Promise<void>;
  handleLogout: () => void;
}

export default function Menu({
  children,
  isLoggedIn,
  handleLogin,
  handleLogout,
}: IDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const loginLogoutName: string = isLoggedIn ? 'logout' : 'login';

  const bottomDrawerMenu = ['Account', loginLogoutName];

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
    <IconButton
      color="default"
      aria-label="logut"
      onClick={() => handleLogout()}
      style={{ marginLeft: 'auto' }}
      sx={{ mr: 2, ...(open && { display: 'none' }) }}
    >
      {uppercase('logout')}
    </IconButton>
  ) : (
    <IconButton
      color="default"
      aria-label="login"
      onClick={() => navigate('login')}
      style={{ marginLeft: 'auto' }}
      sx={{ mr: 2, ...(open && { display: 'none' }) }}
    >
      {uppercase('login')}
    </IconButton>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>

          {/* wire up funcitonality when the menu button is working correctly, should add a name and user menu */}
          {renderTopMenuLoginOrLogoutButton}

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
          <MenuItem
            handleClick={() => navigate('sign%20up')}
            label={'sign up'}
          />
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

      <Main open={open}>
        <DrawerHeader />
        {children}
        <Copyright
          sx={{ mt: 5, mb: 4 }}
          style={{
            position: 'fixed',
            bottom: 15,
            left: 'calc(50% - 170px)',
            width: '340px',
          }}
        />
      </Main>
    </Box>
  );
}
