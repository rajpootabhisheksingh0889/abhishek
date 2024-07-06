import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
    });

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
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

        // Validate each field
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
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:9999/api/register', formData);
            console.log('Registration successful:', response.data);
            navigate('/auth/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error (e.g., show a notification or error message)
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
                    maxWidth: '400px', // Limit the width of the form
                    mx: 'auto', // Center align horizontally
                    p: 3, // Add padding around the form
                    borderRadius: 4, // Rounded corners
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Drop shadow for depth
                    backgroundColor: '#ffffff', // White background
                    maxHeight: '400px', // Maximum height for the form container
                    overflowY: 'auto', // Enable vertical scrolling if content exceeds maxHeight
                    '& > :not(style)': { mb: 3 }, // Apply margin bottom to all children except styles
                }}
            >
                <Stack>
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

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="last_name" mb="5px" mt="25px">
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

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
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
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
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
                    />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="phone" mb="5px" mt="25px">
                        Phone
                    </Typography>
                    <CustomTextField
                        id="phone"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!formErrors.phone}
                        helperText={formErrors.phone}
                    />
                </Stack>
                <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
