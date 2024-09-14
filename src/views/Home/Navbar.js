import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import { Home, Info, Help, AccountBox, Phone, Login, Dashboard } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const accessToken = localStorage.getItem('accessToken'); // Check if accessToken exists

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Product', icon: <Info />, path: '/productpage' },
    { text: 'Agent', icon: <AccountBox />, path: '/agent' },
    { text: 'About', icon: <Info />, path: '/about' },
    { text: 'Subscription', icon: <Help />, path: '/subscription' },
    { text: 'Contact Us', icon: <Phone />, path: '/contactus' },
  ];

  return (
    <AppBar position="static" sx={{
      background: 'linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)',
      color: 'white'
    }} elevation={3}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="Company Logo"
            style={{
              width: "63px",
              height: "auto",
              backgroundColor: "transparent",
              borderRadius: "50%"
            }}
          />
        </Box>

        {/* Desktop Menu Items */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              startIcon={item.icon}
              component={Link}
              to={item.path}
              sx={{ margin: '0 10px', fontWeight: 'bold', textTransform: 'none' }}
            >
              {item.text}
            </Button>
          ))}
          {accessToken ? (
            <Button
              color="inherit"
              startIcon={<Dashboard />}
              component={Link}
              to="/dashboard"
              sx={{ margin: '0 10px', fontWeight: 'bold', textTransform: 'none' }}
            >
              Dashboard
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Login />}
              component={Link}
              to="/auth/login"
              sx={{
                margin: '0 10px',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '20px',
                padding: '10px 20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                  transform: 'scale(1.05)',
                },
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider />
          {accessToken ? (
            <ListItem button component={Link} to="/dashboard" onClick={handleDrawerToggle}>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          ) : (
            <ListItem button component={Link} to="/auth/login" onClick={handleDrawerToggle}>
              <ListItemIcon><Login /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
