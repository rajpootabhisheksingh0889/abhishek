import React, { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        mobile: '',
    });

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        mobile: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!formData.first_name.trim()) {
            errors.first_name = 'First Name is required';
            valid = false;
        }
        if (!formData.last_name.trim()) {
            errors.last_name = 'Last Name is required';
            valid = false;
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Za-z])(?=.*\W).{6,}/.test(formData.password)) {
            errors.password = 'Password must contain at least one alphabet, one special character, and be at least 6 characters long';
            valid = false;
        }
        if (!formData.mobile.trim()) {
            errors.mobile = 'Mobile number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errors.mobile = 'Mobile number is not valid';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://134.209.145.149:9999/api/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    p: 2,
                    borderRadius: 4,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                    '& > :not(style)': { mb: 3 },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="first_name" mb="5px">
                            First Name
                        </Typography>
                        <CustomTextField
                            id="first_name"
                            variant="outlined"
                            fullWidth
                            value={formData.first_name}
                            onChange={handleChange}
                            error={!!formErrors.first_name}
                            helperText={formErrors.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="last_name" mb="5px">
                            Last Name
                        </Typography>
                        <CustomTextField
                            id="last_name"
                            variant="outlined"
                            fullWidth
                            value={formData.last_name}
                            onChange={handleChange}
                            error={!!formErrors.last_name}
                            helperText={formErrors.last_name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                            Email Address
                        </Typography>
                        <CustomTextField
                            id="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            autoComplete="email"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="mobile" mb="5px">
                            Mobile Number
                        </Typography>
                        <CustomTextField
                            id="mobile"
                            variant="outlined"
                            fullWidth
                            value={formData.mobile}
                            onChange={handleChange}
                            error={!!formErrors.mobile}
                            helperText={formErrors.mobile}
                            autoComplete="tel"
                        />
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
