import React from 'react';
import { Grid, Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import logo from "../../assets/images/logo.png";

const Footer = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(45deg, #3f51b5 30%, #1a237e 90%)',
                color: 'white',
                padding: '40px 20px',
                textAlign: 'center',
            }}
        >
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {/* Section 1: Logo */}
                <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src={logo}
                            alt="Company Logo"
                            style={{
                                width: "163px",
                                height: "auto",
                                backgroundColor: "transparent",
                                borderRadius: "50%"
                            }}
                        />
                    </Box>
                </Grid>

                {/* Section 2: About */}
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        About Us
                    </Typography>
                    <Typography variant="body2">
                        We are a leading company providing top-quality products and services to enhance your lifestyle.
                    </Typography>
                </Grid>

                {/* Section 3: Quick Links */}
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Quick Links
                    </Typography>
                    <Link href="#" color="inherit" sx={linkStyle}>
                        Home
                    </Link>
                    <Link href="#" color="inherit" sx={linkStyle}>
                        Services
                    </Link>
                    <Link href="#" color="inherit" sx={linkStyle}>
                        Contact
                    </Link>
                </Grid>

                {/* Section 4: Contact Us */}
                <Grid item xs={12} sm={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body2">Email: info@example.com</Typography>
                    <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                        Phone: +123 456 7890
                    </Typography>

                    {/* Social Media Icons */}
                    <Box>
                        <IconButton href="#" sx={iconButtonStyle}>
                            <Facebook />
                        </IconButton>
                        <IconButton href="#" sx={iconButtonStyle}>
                            <Twitter />
                        </IconButton>
                        <IconButton href="#" sx={iconButtonStyle}>
                            <Instagram />
                        </IconButton>
                        <IconButton href="#" sx={iconButtonStyle}>
                            <LinkedIn />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>

            {/* Footer Bottom Text */}
            <Box sx={{ marginTop: '40px' }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

// Custom styles for the links
const linkStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '16px',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
        color: '#ffeb3b',
    },
};

// Custom styles for the social media icon buttons
const iconButtonStyle = {
    color: 'white',
    margin: '0 8px',
    '&:hover': {
        color: '#ffeb3b',
    },
};

export default Footer;
